const fs = require('fs');

class Contenedor {
    constructor(rutaTexto){
        this.rutaTexto = rutaTexto
    }

    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(element){
        try {
            const  data = await fs.promises.readFile(`./${this.rutaTexto}.json`, 'utf-8')
            const productosLista = JSON.parse(data)

            const nuevoProducto = {
                title: element.title,
                price: element.price,
                thumbnail: element.thumbnail,
                id: productosLista[productosLista.length - 1].id + 1, 
            }

            productosLista.push(nuevoProducto)

            try {
                await fs.promises.writeFile(`${this.rutaTexto}.json`, JSON.stringify(productosLista, null, 4));

                console.log(`Nuevo producto guardado, N° ID: ${nuevoProducto.id}`)
            } catch {
                console.log('error cargar nuevo producto')
            }

            return nuevoProducto.id

        } catch (err) {
            const producto = {
                title: element.title,
                price: element.price,
                thumbnail: element.thumbnail,
                id: 1, 
            }

            try {
                await fs.promises.writeFile(`${this.rutaTexto}.json`, JSON.stringify([producto], null, 4));
                console.log(`Nuevo producto guardado, N° ID: ${producto.id}`)

            } catch (err) {
                console.log('error crear y cargar nuevo producto', err)
            }
        }
    }
    
    //getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll(){
        try {
            const dataProductos = await fs.promises.readFile(`./${this.rutaTexto}.json`, 'utf-8')
            const datos = JSON.parse(dataProductos)

            return datos
        } catch {
            console.log ('Error al obtener todos los datos')
        }
    }

    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id){
        try {
            const dataProductos = await fs.promises.readFile(`./${this.rutaTexto}.json`, 'utf-8');
            const datos = JSON.parse(dataProductos);
            const idProductos = datos.find(producto => producto.id === id);

            if (!idProductos) throw new Error('No existe ese producto');

            return idProductos;

        } catch (err){
            console.log (err); 
        }
    }

    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(id){
        try {
            if(!id){
                throw new Error ('No se pasó ningún ID');
            }
            const listaProd = await fs.promises.readFile(`./${this.rutaTexto}.json`, 'utf-8');
            const datos = JSON.parse(listaProd);
            const producto = datos.find(producto => producto.id === id);

            if(!producto){
                throw new Error ('No existe ese producto')

            } else {
                datos.splice(datos.indexOf(producto),1);

                const nuevaLista = await fs.promises.writeFile(`./${this.rutaTexto}.json`, JSON.stringify(datos, null, 4))

                console.log(`Producto eliminado, ID: ${producto.id}`)
    
                return nuevaLista
            }
            
        } catch (err){
            console.log(err)
        }

    }

    /*deleteAll(): void - Elimina todos los objetos presentes en el archivo. */
    async deleteAll(){
        try {
            await fs.promises.unlink(`${this.rutaTexto}.json`)
            console.log(`Archivo eliminado!`)

        } catch(err) {
            console.log(`No se pudo eliminar el archivo`, err)
        }
    }
}

//creacion rutaTexto
const datoJson = new Contenedor ('productos2'); //JSON YA CREADO CON 3 PRODUCTOS
/* const datoJson = new Contenedor ('productos3'); */ //JSON A CREAR DESDE 0

//creacion nuevo producto //save
/* datoJson.save({ title: 'Cuchara', price: 100, thumbnail:'x'}) */
/* datoJson.save({ title: 'Pava', price: 500, thumbnail:'x'}) */
/* datoJson.save({ title: 'pepino', price: 200, thumbnail:'x'}) */

//getAll
/* datoJson.getAll().then(val => console.log(val)); */

// obtener el producto de acuerdo a su id // getID
/* datoJson.getById(15) */ // id que no existe
/* datoJson.getById(2).then(val => console.log(val)) */

//borrar segun ID //deleteId
/* datoJson.deleteById(3) */

//eliminar archivo json producto //deleteAll
/* datoJson.deleteAll() */