const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("views", __dirname+"/views")
app.set('view engine', 'ejs')

const Contenedor = require('./controllers/script')
const productos = new Contenedor('productos2')


app.get('/', (req, res) => {
    res.render('pages/index')
})


app.get('/productos', (req,res,next) => {
    productos.getAll()

    .then(data => { 
        const productos = data
        res.render('./pages/productos', { productos }) }) 
    .catch(error => {
        if(error.code === "ENOENT") { 
            const productos = []
            res.render("./pages/productos", { productos })
        } else {
            return next(error)
        }
    }) 
})


app.post('/productos', (req,res) => {
    const { title, price, thumbnail } = req.body;
    if (title && price && thumbnail) {
        productos.save({ title, price, thumbnail } )
        res.redirect('./productos');

    } else {
      res.send('Faltan datos');
    }
})


const PORT = 8080
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}, EJS`)
})