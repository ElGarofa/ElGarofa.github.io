console.log("carrito.js cargado");

/* =========================
   CARRITO GLOBAL SEGURO
========================= */
let carrito = [];

try {
  const guardado = JSON.parse(localStorage.getItem("carrito"));
  carrito = Array.isArray(guardado) ? guardado : [];
} catch (e) {
  carrito = [];
}

/* =========================
   AGREGAR AL CARRITO
========================= */
function agregarAlCarrito(id) {
  id = Number(id);

  if (!Array.isArray(window.productosData)) {
    console.error("productosData no disponible");
    return;
  }

  const producto = window.productosData.find(p => Number(p.id) === id);

  if (!producto) {
    console.error("Producto no encontrado:", id);
    return;
  }

  if (!Array.isArray(carrito)) {
    carrito = [];
  }

  const existente = carrito.find(p => Number(p.id) === id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  actualizarCarrito();
}

/* =========================
   ACTUALIZAR CARRITO
========================= */
function actualizarCarrito() {
  const contenedor = document.getElementById("carrito");
  const totalSpan = document.getElementById("total");

  if (!contenedor || !totalSpan) return;

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach(prod => {
    const subtotal = prod.precio * prod.cantidad;
    total += subtotal;

    contenedor.innerHTML += `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <small>${prod.nombre} x${prod.cantidad}</small>
        <small>$${subtotal}</small>
      </div>
    `;
  });

  totalSpan.textContent = `$${total}`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* =========================
   VACIAR
========================= */
function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarCarrito();
}

/* =========================
   WHATSAPP
========================= */
function enviarPedidoWhatsApp() {
  if (!carrito.length) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "Hola! Quiero hacer el siguiente pedido:%0A%0A";

  carrito.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}%0A`;
  });

  mensaje += `%0A🧾 Total: ${document.getElementById("total").textContent}`;

  window.open(
    "https://wa.me/5491166616722?text=" + mensaje,
    "_blank"
  );
}

/* =========================
   INICIO
========================= */
document.addEventListener("DOMContentLoaded", actualizarCarrito);
