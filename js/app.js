function login(){
    let name = prompt("Ingrese su nombre: ");
    let edad = parseInt(prompt(name + " ingrese su edad: "));
    if(edad >= 18){
        let nombre = "ayelen";
        let usuario = "";
        while(nombre !== usuario) {
            usuario = prompt("Ingrese nombre de usuario: ").toLowerCase();
            console.log("Usuario renonocido: " + usuario);
        }
        alert("Bienvenido/a: " + usuario);
    }else {
        alert("Solo permitido para mayores de 18 años");
    }
}

function elegiPlan(){
    let productos = parseInt(prompt(" elegir tu plan \n" + "1 - plan running\n" + "2 - plan aguas abiertas\n" + "3 - plan fitness: "));
    console.log(productos);
    switch(productos) {
        case 1:
            alert("Bienvenido a tu plan 01");
            break;
        case 2:
            alert("Bienvenidon a tu plan 02");
            break;
        case 3:
            alert("Bienvenido a tu plan 03");
            break;
        default:
            alert("No contamos con ese plan");
            break;
    }
}

class Producto {

    constructor(id, nombre, modelo, precio) {
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.modelo = modelo;
        this.precio  = parseFloat(precio);
        this.vendido = false;
    }

    sumaIva() {
        // Retorna el precio del producto con IVA.
        return this.precio * 1.21;
    }
}

class Carrito {

    constructor() {
        this.listaCompra = []
    }

    agregaProducto(producto) {
        // Agrega un producto a la lista de compras.
        this.listaCompra.push(producto);
        console.log("producto agregado, total productos: " + this.listaCompra.length);
    }

    sumaTotal() {
        // Suma el precio de todos los productos en la lista de compras mas IVA.
        let total = 0;
        
        for (let i = 0; i < this.listaCompra.length; i++) {
            let productoActual = this.listaCompra[i];
            total = total + productoActual.sumaIva();
          }
        return total
    }
}

// Creo el carrito
const carrito = new Carrito();

// Creo los productos del catalogo
const producto0 = new Producto(0, "Toallon", "fibra", 4000);
const producto1 = new Producto(1, "Mancuernas", "plastico", 2000);
const producto2 = new Producto(2, "Mancuernas", "hierro", 5000);
const producto3 = new Producto(3, "Mat", "goma", 3000);
const producto4 = new Producto(4, "Tobillera", "chica", 3000);
const producto5 = new Producto(5, "Tobillera", "grande", 4000);
const producto6 = new Producto(6, "Cinturon", "largo", 3500);
const producto7 = new Producto(7, "Cinturon", "corto", 2500);
const producto8 = new Producto(8, "Remera", "mujer", 4000);
const producto9 = new Producto(9, "Remera", "hombre", 4000);
const producto10 = new Producto(10, "Calza corta", "mujer", 5000);
const producto11 = new Producto(11, "Short", "hombre", 5000);
const producto12 = new Producto(12, "Baston", "algodon", 2500);
const producto13 = new Producto(13, "Banda elastica", "chica", 30000);
const producto14 = new Producto(14, "Banda elastica", "grande", 3000);

// El id de producto coincide con el indice en la base de datos.
const DB = [
    producto0,
    producto1, 
    producto2, 
    producto3, 
    producto4,
    producto5,
    producto6,
    producto7,
    producto8,
    producto9,
    producto10,
    producto11,
    producto12,
    producto13,
    producto14,
];


function sortArrays(a,b){
    /* Function para ordenar los productos por nombre  */
    if(a.nombre < b.nombre) {
        return -1;
    }
    if(a.nombre > b.nombre) {
        return 1;
    }
    return 0;
}

function listarProductos() {
    /* Ordena el listado de productos alfabeticamente usando la propiedad nombre
    y muestra la lista en un alert */
    const listaOrdenada = DB.sort(sortArrays)
    console.table(listaOrdenada);
}

function agregarProducto() {
    /* Pide el ID del producto a agregar al carrito y valida que el id exista. 
    */
    let idProducto = prompt("Ingrese el ID de producto:");

    // Valida que el producto exista en la base de datos.
    idProducto = parseInt(idProducto);
    if (idProducto < 0 || idProducto > DB.length-1) {
        alert("Producto no encontrado");
        
    } else {

        // Obtiene el producto de la base de datos y lo agrega al carrito
        let producto = DB[idProducto];
        carrito.agregaProducto(producto);       
    }
}

function comprar() {
    /* Lista los productos en el carrito e informa el valor total incluyendo IVA
    */ 

    console.table(carrito.listaCompra);
    alert("El total por la compra es: $" + carrito.sumaTotal());
}
