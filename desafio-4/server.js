const express = require("express");
const routerProductos = require('./routes/productos')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ruta para usar el form
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

//ruta
app.use("/api/productos", routerProductos);

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`)
});

server.on("error", error => console.log(`Error: ${error}`))





