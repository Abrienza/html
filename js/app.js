
// Obtengo los elementos del DOM
const showroom = document.getElementById('showroom');
const filtroDeporte = document.getElementById('filtro-deporte');
const buscarProducto = document.getElementById('buscar-producto');
const cierraCompra = document.querySelector("#boton-finalizar-compra");

// Creo variable donde se guardarán los productos
let dbProductos;

// Fetch, obtiene los productos, luego los muestra como el listado inicial
fetch("./js/data.json")
    .then(
        response => response.json()
    ).then(
        jsondata => {
            dbProductos = jsondata;
            listarProductos(dbProductos);
        }
    );

// Definicion de carrito
class Carrito {

    constructor() {
        
        let listaCompra = JSON.parse(sessionStorage.getItem('listaCompra'));
        
        if (!listaCompra) { 
            sessionStorage.setItem('listaCompra', JSON.stringify([]));
        }
    }

    agregarProducto(idProducto) {

        let producto = dbProductos.find(
            (prod) => prod.id == idProducto
        );

        console.log(producto);

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
    
    comprar() {

        let listaCompra = JSON.parse(sessionStorage.getItem('listaCompra'));

        console.table(listaCompra);

        muestraCompra("El total por la compra es: $" + this.sumaTotal())

        // Borro la propiedad para empezar de nuevo.
        sessionStorage.setItem('listaCompra', JSON.stringify([]))
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
                        <button type="submit" class="btn-js" onClick="carrito.agregarProducto(${producto.id})">Agregar al carrito</button>
                    </div>
                </article>
            </div>
        </section>
        `;

        showroom.appendChild(div);
    }
}

// Event listener para click del boton comprar
cierraCompra.addEventListener(
    "click",
    () => {

        // Borro la propiedad para empezar de nuevo.
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
          
          swalWithBootstrapButtons.fire({
            title: 'Gracias por elegirnos!',
            text: `Desea confirmar la compra? Monto total: ${carrito.sumaTotal()}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Si, confirmo!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          })
          .then((result) => {
            // Apreto OK
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Confirmado!',
                'Su compra fue realizada con éxito. Por favor revise su email.',
                'success'
              )
              // Solo borro el storage si la compra se confirma.
              sessionStorage.setItem('listaCompra', JSON.stringify([]))

            // Apreto No
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelada!',
                'Su compra fue cancelada.',
                'error'
              )
            }
          })
});

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

// Event listener para imput de busqueda de producto
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
