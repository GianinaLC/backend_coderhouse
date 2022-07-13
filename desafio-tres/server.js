// instalado:
    // npm init -y
    // npm i -S express

//agregado en json => "type": "module"


import Contenedor from "./script.js";
import express from "express";


const app = express();
app.get("/", (req, res) => {
    res.send('<h1 style="color: blue">Bienvenidos<h1>');
});


const contenedor = new Contenedor("productos2");

app.get("/productos", async (req, res) => {
    let response;
    try {
      response = await contenedor.getAll();
    } catch (e) {
      console.error(e);
    }
  
   /*  res.send(response); */
    res.send('Los productos de la lista son:' + JSON.stringify(response));
});

  

app.get('/productoRandom', async (req, res) => {
    let response;
    
    try {
        let min = 1;
        let max = await contenedor.getArrayProd();

        let id = Math.floor(Math.random() * (max - min) + min)
        response = await contenedor.getById(id)
    } catch (e) {
        console.error(e)
    }

    res.send(response)
})


const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Se escucha el contenido del puerto ${PORT}`)
});

server.on('error', error => console.log(`Error: ${error}`))

