class Usuario {
    constructor(nombre, apellido, libros, mascota){
        this.name = nombre;
        this.apellido = apellido;        
        this.libros = libros;
        this.mascota = mascota;
    }

    getFullName(){
        console.log(`Hola ${this.name} ${this.apellido}`)
    }
    
    addMascota(mascota){
        this.mascota.push(mascota)
        console.log((`Agregada la mascota ${mascota} a la lista de ${this.name} ${this.apellido}`))
        
    } 
    
    countMascotas(){
        let cantidadMascotas = this.mascota.length;
        console.log( `La cantidad de mascotas que tiene ${this.name} es: ` + cantidadMascotas)
    }

    addBook(titulo, autor){
        return this.libros.push({titulo, autor})        
    }

    getBookNames(){
        let librosUsuario = this.libros.map(libro => libro.titulo)
        console.log(librosUsuario)
    }
}

let usuario1 = new Usuario('Carlos', 'Lopez', [{ titulo:'El senior de los anillos', autor: 'Tolkien' }], ['roco']);

console.log('-----------------')

usuario1.getFullName()
usuario1.addMascota('Pepe')
usuario1.countMascotas()
console.log('-----------------')
usuario1.addBook('El Despertar de Los Dragones', 'Morgan Rice')
usuario1.addMascota('Mora')
usuario1.countMascotas()
console.log('-----------------')
usuario1.getBookNames()
console.log('-----------------')