const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const router = require('./routes/index')

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials/"
});

app.use(express.static("public"));

app.engine("hbs", hbs.engine);
app.set("views", "./views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//trae el formulario
app.get("/", (req, res) => {
    res.render("form")
});

//ruta
app.use("/productos", router);


const PORT = 8080;
app.listen(PORT, ()=> {
    console.log(`Running on PORT: ${PORT}`);
})