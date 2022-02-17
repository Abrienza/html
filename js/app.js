
// obtengo los elementos del DOM
// creo la constante showroom y filtroDeporte.
// Le asigno el ID como parámetro al método getElementById para obtener el elemento que machea
// en el DOM.
const showroom = document.getElementById('showroom');
const filtroDeporte = document.getElementById('filtro-deporte');

// creo la base de datos de productos.
// creo la constante dbProductos.
// creo un array donde indico id, nombre y demás propiedades de cada producto. Se lo asigno a
// la variable dbProductos.
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
// creo la clase carrito. plantilla.
class Carrito {

    // indico método constructor para generar un objeto dentro de la clase
    // al métrodo this le aplico la propiedad listaCompra y le asigno un array vacío
    constructor() {
        this.listaCompra = []
    }

    // creo el objeto agregarProducto y le paso el parámetro producto
    agregaProducto(producto) {
        // Agrega un producto a la lista de compras.
        // al método this le paso la propiedad listaCompra y el método push con el parámetro
        // producto, lo que hará que pushee, agregue un producto.
        this.listaCompra.push(producto);
        // le pido que envíe un mensaje a la consola y le acoplo la propiedad length a listaCompra
        // y al método this para que me indique el largo de los elementos del array listaCompra.
        console.log("producto agregado, total productos: " + this.listaCompra.length);
    }

    // creo el metodo sumaTotal y no le paso parámetros
    sumaTotal() {
        // Suma el precio de todos los productos en la lista de compras mas IVA.
        //creo la variable total y le asigno valor cero.
        let total = 0;
        
        //creo un bucle con la declaración for y le paso 3 parámetros.
        // creo la variable i y le asigno valor cero. Si la variable i es menor al valor que da
        // el metodo length en la propiedad listaCompra en el objeto this que refiere a carrito.
        for (let i = 0; i < this.listaCompra.length; i++) {
            // genero la variable producto Actual y le asigno un vagón i del array listaCompra. 
            let productoActual = this.listaCompra[i];
            // llamo a la variable total y le asigno que sume total más la propiedad precio de
            // la variable producto actual.
            total = total + productoActual.precio;
          }
          // la declaración return finaliza la ejecución y solicita de el valor de la variable total.
        return total
    }

    // creo el metodo agregarProducto y le paso de parámetro idProducto
    agregarProducto(idProducto) {
        // Obtiene el producto de la base de datos y lo agrega al carrito
        // creo la variable producto y le asigno la constante dbProductos a la que le aplico el
        // metodo find y de parámetro le paso una función flecha que traiga la propiedad prod que
        // tenga el mismo id que idProducto
        let producto = dbProductos.find(
            (prod) => prod.id == idProducto
        );
        // le envío el mensaje a la consola con la variable producto
        console.log(producto);
        // llamo al métrodo agregarProducto y le paso la propiedad producto.
        this.agregaProducto(producto);
    }
    
    // creo el objeto comprar sin pasarle parámetros
    comprar() {
        // Lista los productos en el carrito e informa el valor total
        // crea en consola una tabla con el metodo .table y de parametro le paso la propiedad
        // listaCompra.
        console.table(this.listaCompra);
        // declaro la función muestraCompra que mostrará el texto y concatena el método sumaTotal.
        muestraCompra("El total por la compra es: $" + this.sumaTotal())
    }    
}

// Creo el carrito
// declaro la constante carrito a la cual se le asigna el constructor carrito de la clase.
const carrito = new Carrito();

// Muestro el total de compra
// declaro la función muestraCompra con el parámetro texto
function muestraCompra(texto) {
    // aplico la propiedad innerHTML a la constante showroom que es un elemento del DOM
    // de esta forma inserto HTML desde el JS. En este caso inserto texto.
    showroom.innerHTML = `
        <div class="texto-compra">
            <p>${texto}</p>
        </div>
    `;
};

// Muetra una lista ordenada de productos
// Declaro la función listarProductos a la cual le paso de parámetro los productos.
function listarProductos(productos) {
    // Ordenar los productos por nombre
    // creo la constante listaOrdenada a la cual le será asignado lo que resulte de aplicarle el
    // método sort al parámetro productos que aplica sobre la función listarProductos.
    const listaOrdenada = productos.sort(
        // creo función flecha, le paso de parámetro dos valores, a y b.
        // a los cuales le asigno condicionales que permitan ordenar los valores comparandolos
        // de a dos. Si el valor a es menor a b, entonces lo pone primero, retorna -1 y así.
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
    // Le aplico la propiedad innerHTML a la constante showroom y le asigno un texto vacío.
    showroom.innerHTML = "";

    // creo un bucle for y le paso tres parámetros a recorrer. creo la variable i y le asigno el
    // valor cero, luego pido que compare si i es menor al largo de los productos, finalmente
    // i++ es para que le agregue uno a la variable i.
    for (let indice = 0; indice < productos.length; indice++) {
        // Producto actual
        // declaro la variable producto y le asigno el parámetro productos con el array indice o i.
        let producto = productos[indice];

        // Creo el card contenedor
        // declaro la variable div y le asigno el método createElement con div de parámetro.
        let div = document.createElement('div');
        // accedo al div mediante la propiedad className y se la asigno a producto.
        div.className = 'producto';
        // accedo al div mediante la propiedad innerHTML para insertar los productos y el boton x id.
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
        // llamo a la constante showroom, la accedo mediante el método appendChild que tiene el div
        // de parámetro. appendChild agrega un elemento al final.
        showroom.appendChild(div);
    }
}

// Muestro el listado total de productos
// llamo a la función listarProdutos y le paso de parámetro dbProductos que es la base de datos.
listarProductos(dbProductos);

// Event listener para change del filtro
// llamo a la constante filtroDeporte que contiene el filter del DOM y la accedo desde el método
// addEventListener, le pido que se quede esperando un evento, el cual será change.
filtroDeporte.addEventListener(
    'change',
    // declaro la función flecha sin parámetros
    () => {
        // mando mensaje a la consola con el parámetro de la constante filtroDeporte accedida
        // desde la propiedad valor. Es decir la consola mostrará el valor del elemento filtrado.
        console.log(filtroDeporte.value);

        // Le paso un condicional if else. Si el valor que trae de la constante es igual a All,
        // entonces que llame a la función listarProductos con la base de datos como parámetro.
        if(filtroDeporte.value == 'all') {
            listarProductos(dbProductos);
        // Si esto es false, declaro una variable productosFiltrados que asignará el resultado de
        // aplicar el método filter a la base de datos de productos. Como parámetro le paso una
        // función flecha que tiene de parámetro producto y un return que es true si la propiedad
        // deporte que aplica a producto es igual al resultado de ejecutar el metodo value a
        // filtroDeporte.
        } else {
            let productosFiltrados = dbProductos.filter(
                (producto) => { return producto.deporte == filtroDeporte.value }
            );
            // declaro en la consola la variable productosFiltrados
            console.log(productosFiltrados);
            // llamo la función listarProductos y la ejecuto con el parámetro productosFiltrados que
            // será el nuevo array.
            listarProductos(productosFiltrados);
        }
    }
)
