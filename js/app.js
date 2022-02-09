
// obtengo los elementos del DOM
const showroom = document.getElementById('showroom');
const filtroDeporte = document.getElementById('filtro-deporte');

// creo la base de datos de productos
const dbProductos = [
    {id: 1, nombre: "Toallon", desc: "Toallon microfibra", deporte: "otros", precio: 1500},
    {id: 2, nombre: "Mancuernas", desc: "Mancuernas regulables", deporte: "fitness", precio: 5000},
    {id: 3, nombre: "Mat", desc: "Mat calestenia", deporte: "fitness", precio: 2500},
    {id: 4, nombre: "Tobillera", desc: "Tobillera fitness", deporte: "fitness", precio: 4000},
    {id: 5, nombre: "Cinturon", desc: "Cinturon yoga", deporte: "fitness", precio: 2000},
    {id: 6, nombre: "Remera", desc: "Remera dry fit", deporte: "otros", precio: 5500},
    {id: 7, nombre: "Calza", desc: "Calza ergonomica", deporte: "otros", precio: 7500},
    {id: 8, nombre: "Short", desc: "Short elastizado", deporte: "otros", precio: 6000},
    {id: 9, nombre: "Savavidas", desc: "Salvavida apto remo", deporte: "sup", precio: 10000},
    {id: 10, nombre: "Remo", desc: "Remo extensible", deporte: "sup", precio: 20000},
    {id: 11, nombre: "Pita", desc: "Pita tabla SUP", deporte: "sup", precio: 12000},
    {id: 12, nombre: "Asiento", desc: "Asiento ergonomico", deporte: "otros", precio: 5000},
    {id: 13, nombre: "Inflador", desc: "Inflador de mano", deporte: "otros", precio: 7600},
    {id: 14, nombre: "Casco", desc: "Casco bicicleta", deporte: "otros", precio: 5400},
];


// Definicion de carrito
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
            total = total + productoActual.precio;
          }
        return total
    }

    agregarProducto(idProducto) {
        // Obtiene el producto de la base de datos y lo agrega al carrito
        let producto = dbProductos.find(
            (prod) => prod.id == idProducto
        );
        console.log(producto);
        this.agregaProducto(producto);
    }
    
    comprar() {
        // Lista los productos en el carrito e informa el valor total
        console.table(this.listaCompra);
        muestraCompra("El total por la compra es: $" + this.sumaTotal())
    }    
}

// Creo el carrito
const carrito = new Carrito();

// Muestro el total de compra
function muestraCompra(texto) {
    showroom.innerHTML = `
        <div class="texto-compra">
            <p>${texto}</p>
        </div>
    `;
};

// Muetra una lista ordenada de productos
function listarProductos(productos) {
    // Ordenar los productos por nombre
    const listaOrdenada = productos.sort(
        (a,b) => {
            if(a.nombre < b.nombre) {
                return -1;
            }
            if(a.nombre > b.nombre) {
                return 1;
            }
            return 0;
        }
    )
    // Limpia el contenido de showroom
    showroom.innerHTML = "";

    for (let indice = 0; indice < productos.length; indice++) {
        // Producto actual
        let producto = productos[indice];

        // Creo el card contenedor
        let div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <div class="card">
                <span class="card-title">${producto.nombre}</span>
                <div class="card-content">
                    <p>${producto.desc}</p>
                    <p>Deporte: ${producto.deporte}</p>
                    <p>$${producto.precio}</p>
                </div>
                <button onClick="carrito.agregarProducto(${producto.id})">Agregar</button>
            </div>
        `;
        showroom.appendChild(div);
    }
}

// Muestro el listado total de productos
listarProductos(dbProductos);

// Event listener para change del filtro
filtroDeporte.addEventListener(
    'change',
    () => {
        console.log(filtroDeporte.value);

        if(filtroDeporte.value == 'all') {
            listarProductos(dbProductos);
        } else {
            let productosFiltrados = dbProductos.filter(
                (producto) => { return producto.deporte == filtroDeporte.value }
            );
            console.log(productosFiltrados);
            listarProductos(productosFiltrados);
        }
    }
)
