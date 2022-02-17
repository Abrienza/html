
// obtengo los elementos del DOM
const showroom = document.getElementById('showroom');
const filtroDeporte = document.getElementById('filtro-deporte');
const buscarProducto = document.getElementById('buscar-producto');

// creo la base de datos de productos.
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
        
        let listaCompra = JSON.parse(sessionStorage.getItem('listaCompra'));
        
        if (!listaCompra) { 
            listaCompra = [];
            sessionStorage.setItem('listaCompra', JSON.stringify(listaCompra))
        }
    }

    agregaProducto(producto) {
        // Agrega un producto a la lista de compras.

        let listaCompra = JSON.parse(sessionStorage.getItem('listaCompra'));
        
        listaCompra.push(producto);
        
        sessionStorage.setItem('listaCompra', JSON.stringify(listaCompra));

        console.log("producto agregado, total productos: " + listaCompra.length);
    }

    sumaTotal() {
        // Suma el precio de todos los productos en la lista de compras.
        let total = 0;
        let listaCompra = JSON.parse(sessionStorage.getItem('listaCompra'));

        for (let i = 0; i < listaCompra.length; i++) {

            let productoActual = listaCompra[i];

            total = total + productoActual.precio;
          }
        return total
    }

    agregarProducto(idProducto) {

        let producto = dbProductos.find(
            (prod) => prod.id == idProducto
        );

        console.log(producto);

        this.agregaProducto(producto);
    }
    
    comprar() {

        let listaCompra = JSON.parse(sessionStorage.getItem('listaCompra'));

        console.table(listaCompra);

        muestraCompra("El total por la compra es: $" + this.sumaTotal())

        // Borro la propiedad para empezar de nuevo.
        sessionStorage.removeItem('listaCompra');
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
        <section id="section-disciplinas">
            <div class="card-group col-md-4">
                <article class="card">
                    <img src="./assets/img/disciplinas_ciclismo.jpg" class="card-img-top foto-disciplinas"
                        alt="Hombres haciendo ciclismo">
                    <div class="card-body">
                        <h3 class="card-title">${producto.nombre}</h3>
                        <p class="card-text">${producto.desc}</p>
                        <p class="card-text">Deporte: ${producto.deporte}</p>
                        <p class="card-text">$${producto.precio}</p>
                        <button type="submit" class="btn btn-primary" id="boton-comprar" onClick="carrito.agregarProducto(${producto.id})">Agregar al carrito</button>
                    </div>
                </article>
            </div>
        </section>
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

buscarProducto.addEventListener(
    'input',
    () => {
        let productosFiltrados = dbProductos.filter(
            producto => 
                -1 != producto.nombre.toLocaleLowerCase().indexOf(buscarProducto.value.toLocaleLowerCase())
        );
        listarProductos(productosFiltrados);        
    }
)
