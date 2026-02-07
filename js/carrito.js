let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
  const producto = productosData.find(p => p.id === id);

  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarEstadisticas(id);
  actualizarCarrito();
}

function actualizarCarrito() {
  const contenedor = document.getElementById("carrito");
  const totalSpan = document.getElementById("total");

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach(prod => {
    total += prod.precio * prod.cantidad;

    contenedor.innerHTML += `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span>${prod.nombre} x${prod.cantidad}</span>
        <span>$${prod.precio * prod.cantidad}</span>
      </div>
    `;
  });

  totalSpan.textContent = `$${total}`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function enviarPedidoWhatsApp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "Hola! Quiero hacer el siguiente pedido:%0A";

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} x${p.cantidad}%0A`;
  });

  mensaje += `%0ATotal: ${document.getElementById("total").textContent}`;

  window.open(
    `https://wa.me/5491166616722?text=${mensaje}`,
    "_blank"
  );
}

actualizarCarrito();
