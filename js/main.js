// jQuery(()=>{
//   console.log("Bienvenido :) ")
//    setTimeout(()=>{
//       alert('Gracias por visitar mi pagina :)')
//    }, 5000)
// })

// Funcion Constructora //
class Producto{
    constructor(id, nombre, precio, foto, stock, tipo){

      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.foto = foto;
      this.stock = stock;
      this.tipo = tipo;
  }
}


//Array de objetos//
const stockProductos = []

// ORDENA ARRAYS DE OBJETOS //
stockProductos.push(new Producto(1, "Test Bill", 20,"1.jpg", 5, "Organico"));
stockProductos.push(new Producto(2, "Leche Malk", 5,"2.jpg", 4, "Vegano"));
stockProductos.push(new Producto(3, "Bebida Maiz", 100,"3.jpg", 7, "Vegano"));
stockProductos.push(new Producto(4, "Conserva de Anguila", 15,"4.jpg", 3, "Organico"))
stockProductos.push(new Producto(5, "Pasta de dientes", 120,"5.jpg", 3, "Organico"))
stockProductos.push(new Producto(6, "Cerveza Duff", 50,"6.jpg", 3, "Vegano"))
stockProductos.push(new Producto(7, "Camiseta", 70,"7.jpg", 1, "Organico"))
stockProductos.push(new Producto(8, "Barrita Energetica de Manzana", 15,"8.jpg", 10, "Vegano"))
stockProductos.push(new Producto(9, "Poster", 10,"9.jpg", 1, "Organico"))
stockProductos.push(new Producto(10, "Pez Globo para sushi", 55,"10.jpg", 1, "Organico"))
stockProductos.push(new Producto(11, "Llamarada Moe", 25,"11.jpg", 7, "Vegano"))
stockProductos.push(new Producto(12, "Jugo de Cangrejo", 7,"12.jpg", 15, "Organico"))
stockProductos.push(new Producto(13, "Cerveza Fudd", 45,"13.jpg", 15, "Vegano"))
stockProductos.push(new Producto(14, "KrustiBurger", 50,"14.jpg", 10, "Organico"))
stockProductos.push(new Producto(15, "Cereales Krusty O", 35,"15.jpg",50, "Vegano"))
stockProductos.push(new Producto(16, "Malteada sorpresa", 25,"16.jpg", 100, "Vegano"))
stockProductos.push(new Producto(17, "Tomaco", 37,"17.jpg", 5, "Vegano"))
stockProductos.push(new Producto(18, "Caja Rosquillas x 10", 150,"18.jpg", 80, "Vegano"))
stockProductos.push(new Producto(19, "Buzz Cola", 7,"19.jpg", 20, "Vegano"))
stockProductos.push(new Producto(20, "Klavh Kalash", 14,"20.jpg", 9, "Vegano"))




  //CARDS
  const contenedorProductos = document.getElementById('contenedor-productos')
  mostrarProductos(stockProductos)


  function mostrarProductos(array) {

    contenedorProductos.innerHTML = '';
    array.forEach( (producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <img class="card-img-top" src="./imagenes/${producto.foto}">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.tipo}</p>
                    <p class="precioProducto">Precio: $${producto.precio}</p>
                    <button onclick=agregarAlCarrito(${producto.id}) class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        </div>
</div>
</div>          
        `
        
        contenedorProductos.appendChild(div)
    } )
}

//FILTRO//

const selectFiltro = document.getElementById('filtro')


function filtrar() {
  let valorFiltro = selectFiltro.value
  if (valorFiltro == 'all') {
      mostrarProductos(stockProductos)
  } else {
      mostrarProductos( stockProductos.filter( el => el.tipo == selectFiltro.value) )
  }
}

//CARRITO COMPRAS//
const carrito = [] 

function agregarAlCarrito(itemID) {

  let itemEnCarrito = carrito.find( el => el.id == itemID)

  if (itemEnCarrito){
    itemEnCarrito.cantidad += 1
  } else {

    let {id, nombre, precio} = stockProductos.find( el => el.id == itemID)
    carrito.push({id: id, nombre: nombre, precio: precio, cantidad: 1})
  }



  localStorage.setItem('carrito', JSON.stringify(carrito))

  console.log(carrito)

  actualizarCarrito()
}


function eliminarProducto(id) {
  let productoAEliminar = carrito.find( el => el.id == id )

  productoAEliminar.cantidad--

  if (productoAEliminar.cantidad == 0) {
  let indice = carrito.indexOf(productoAEliminar)
  carrito.splice(indice, 1)
  }
  

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
                      <p>Precio: $${producto.precio * producto.cantidad}</p>
                      <p>Cantidad: ${producto.cantidad}</p>
                      <button onclick=eliminarProducto(${producto.id}) class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                  `

      contenedorCarrito.appendChild(div)
  })

  contadorCarrito.innerText = carrito.length
  precioTotal.innerText = carrito.reduce( (acc, el) => acc +(el.precio * el.cantidad), 0 )
}



selectFiltro.addEventListener('change', ()=>{
  filtrar()
})


const contenedorCarrito = document.getElementById('carrito-contenedor')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')


//Estilo en el formulario con JQuery //

$(window).ready(function(){
	$("#campoNombre").css("background", "#CEF6F5");
  $("#campoApellido").css("background", "#CEF6F5");
  $("#campoTelefono").css("background", "#CEF6F5");
  $("#campoEmail").css("background", "#CEF6F5");
  $("#campoEdad").css("background", "#CEF6F5");
  $("#campoMensaje").css("background", "#CEF6F5");
});


//Formulario con DOM, eventos, leyenda y color//

document.getElementById("campoEdad").addEventListener("change",enviarFormulario)

function enviarFormulario(){
  let edad = document.getElementById("campoEdad")
if (edad.value < 18){
  document.getElementById("leyenda").innerHTML ="Sos menor de edad, no podés ser parte del mundo UNIK."
  edad.style.background ="red";
} else {
  document.getElementById("leyenda2").innerHTML ="Muchas gracias por haber ingresado tus datos!"
  edad.style.background ="green";
}
}

// Botón Jquery de Trivia en español con animaciones 

$("#boton-show").on("click", function () { 
$("#boton").show(700);
});
$("#boton-show2").on("click", function () { 
$("#boton2").toggle(300);
});
$("#boton-show3").on("click", function () { 
$("#boton3").slideDown(600);
});
$("#boton-show4").on("click", function () { 
$("#boton4").slideDown(600);
  });
$("#boton-show5").on("click", function () { 
$("#boton5").slideDown(600);
    });
$("#boton-show6").on("click", function () { 
  $("#boton6").slideDown(600);
});


      // mercadopago

async function generarLinkDePago() {
  const productsToMP = carrito.map((element) => {
    let nuevoElemento = {
      title: element.titulo,
      description: element.descripcion,
      picture_url: element.imagenes,
      category_id: element.id,
      quantity: Number(element.cantidad),
      currency_id: "ARS",
      unit_price: Number(element.precio),
    };
    return nuevoElemento;
  });
  console.log(productsToMP);
  const response = await fetch(
    "https://api.mercadopago.com/checkout/preferences",
    {
      method: "POST",
      headers: {
        'Authorization': 'Bearer TEST-6430332962331713-051915-962f1aa6a9927024cbed90febb8b9494-604399104',
      },
      body: JSON.stringify({
        items: productsToMP,
      }),
    }
  );
  const data = await response.json();
  window.open(data.init_point, "_blank");
}


//API SIMPSONS QUOTES//

const llamarApi = () => {

  $.get('https://thesimpsonsquoteapi.glitch.me/quotes?count=num', function(response){

  console.log(response[0])

  $('#quote').text(response[0].quote)
  $('#character').text(response[0].character)
  })

} 

$('#siguiente').on('click', llamarApi)