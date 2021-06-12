


const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const selectFiltro = document.getElementById('talles')
const selectPrecios = document.getElementById('precios')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

const carrito = []

mostrarProductos(stockProductos)

function mostrarProductos(array) {

    contenedorProductos.innerHTML = ''

    array.forEach( (producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
                    <img src=${producto.img} alt="">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.desc}</p>
                    <p>Talle: ${producto.talle}</p>
                    <p class="precioProducto">Precio: $${producto.precio}</p>
                    <button onclick=agregarAlCarrito(${producto.id}) class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
        
        contenedorProductos.appendChild(div)
    } )
}

function agregarAlCarrito(id) {

    let productoElegido = stockProductos.find( el => el.id == id )
    carrito.push(productoElegido)

    localStorage.setItem('carrito', JSON.stringify(carrito))

    console.log(carrito)

    actualizarCarrito()
}

function eliminarProducto(id) {
    let productoAEliminar = carrito.find( el => el.id == id )
    let indice = carrito.indexOf(productoAEliminar)

    carrito.splice(indice, 1)
    console.log(carrito)
    actualizarCarrito()
}


function actualizarCarrito() {
    contenedorCarrito.innerHTML=''

    carrito.forEach( (producto) => {

        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
                        <p>${producto.nombre}</p>
                        <p>Precio: $${producto.precio}</p>
                        <button onclick=eliminarProducto(${producto.id}) class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    `

        contenedorCarrito.appendChild(div)
    })

    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce( (acc, el) => acc += el.precio, 0 )
}




function filtrar() {
    let valorFiltroTalles = selectFiltro.value
    let valorFiltroPrecios = selectPrecios.value
    
    let arrayFiltrado = []

    if (valorFiltroTalles == 'all') {
        arrayFiltrado = stockProductos
    } else {
        arrayFiltrado = stockProductos.filter( el => el.talle == selectFiltro.value) 
    }

    if (valorFiltroPrecios == 1) {
        arrayFiltrado = arrayFiltrado.filter( el => el.precio <= 5000)
    } else if (valorFiltroPrecios == 2) {
        arrayFiltrado = arrayFiltrado.filter( el => el.precio >= 5000)
    }

    mostrarProductos(arrayFiltrado)

}

selectFiltro.addEventListener('change', ()=>{
    filtrar()
})
selectPrecios.addEventListener('change', ()=>{
    filtrar()
})

