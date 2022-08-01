const express = require('express')
const app = express()
const Contenedor = require('./controllers/script')

const contenedor = new Contenedor('productos2')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())


app.set('views','./views');//directorio donde se almacena la plantilla
app.set('view engine', 'pug');//se indica el motor de las plantillas a utilizar

//index form
app.get('/', (req,res) => {
    //1-nombre de la plantilla a mostrar
    //2 el objeto a cambiar
    res.render('index')
})

//traer productos
app.get('/productos', async(req,res) => {
    const obj = await contenedor.getAll()
    res.render('productos', { productos: obj ,
    message: 'Productos cargados'})
})

//agregar producto
app.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (title && price && thumbnail) {
        contenedor.save({ title, price, thumbnail } )
        res.redirect('/productos');

    } else {
        res.send('Faltan datos');
    }
})


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`escuchando puerto ${PORT}, pug`)
})