const express = require("express");
const Contenedor = require('./controllers/script')
const { Router } = require('express')
const routerProductos = Router()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contenedor = new Contenedor('productos2')

//ruta para usar el form
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

//devuelve todos los productos
routerProductos.get("/", async (req, res, next) => {
    let response;
    try {
      response = await contenedor.getAll();
      res.send(response);
    } catch (error) {
        if(error.code === "ENOENT") { res.send([]) } 
        else {
            return next(error) 
        }
    }
});


//devuelve el producto segun su id
routerProductos.get('/:id', async (req, res, next) => {
    let response;
    try {
        let id = parseInt(req.params.id);
        response = await contenedor.getById(id);
        res.send(response)
    } catch (error) {
        if(error.code === "ENOENT") { res.send({ error: "objeto no encontrado" }) } 
        else {
            return next(error)
        }
    }
});

//agrega nuevo producto
routerProductos.post("/", async(req, res, next) => {
    const obj = req.body
    contenedor.save(obj)
    .then(id => {
        res.send({ id, ...obj })
    })
    .catch(error => next(error))
})

//modifica un producto --- buscando la solucion ---
routerProductos.put("/:id", async(req, res) => {
    let response;
    
    try {
        let id = parseInt(req.params.id)
        response = await contenedor.getById(id)
        let updateProducto = {id: req.params.id, ... req.body}
        contenedor.save(updateProducto)

        res.send(updateProducto)

    } catch (err){
        res.send({'error': err})
    }

})

//eliminar producto byId
routerProductos.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    contenedor.deleteById(id)
    res.send( { 'message' : 'Producto eliminado' })
})

//ruta
app.use("/api/productos", routerProductos);

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`)
});

server.on("error", error => console.log(`Error: ${error}`))





