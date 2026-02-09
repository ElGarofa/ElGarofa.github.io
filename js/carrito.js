console.log("carrito.js cargado correctamente");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* =========================
   AGREGAR AL CARRITO
========================= */
function agregarAlCarrito(id) {
  console.log("Agregando producto ID:", id);

  if (typeof productosData === "undefined") {
    console.error("productosData no está definido");
    return;
  }

  const producto = productosData.find(p => p.id === id);

  if (!producto) {
    console.error("Producto no encontrado:", id);
    return;
  }

  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  guardarEstadisticas(id);
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
      <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-1">
        <small>${prod.nombre} x${prod.cantidad}</small>
        <small>$${subtotal}</small>
      </div>
    `;
  });

  totalSpan.textContent = `$${total}`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* =========================
   VACIAR CARRITO
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
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "Hola! Quiero hacer el siguiente pedido:%0A%0A";

  carrito.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}%0A`;
  });

  mensaje += `%0A🧾 Total: ${document.getElementById("total").textContent}`;

  const telefono = "5491166616722";

  window.open(
    `https://wa.me/${telefono}?text=${mensaje}`,
    "_blank"
  );
}

/* =========================
   ESTADÍSTICAS
========================= */
function guardarEstadisticas(id) {
  let stats = JSON.parse(localStorage.getItem("estadisticas")) || {};
  stats[id] = (stats[id] || 0) + 1;
  localStorage.setItem("estadisticas", JSON.stringify(stats));
}

/* =========================
   INICIALIZAR
========================= */
document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();
});
