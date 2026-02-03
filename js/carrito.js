let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarProducto(id) {
  const prod = productosGlobal.find(p => p.id === id);
  if (!prod) return;

  const item = carrito.find(p => p.id === id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      cantidad: 1
    });
  }

  guardarCarrito();
  renderCarrito();
}

function agregarCombo(id) {
  const combo = combos.find(c => c.id === id);
  if (!combo) return;

  carrito.push({
    id: combo.id,
    nombre: combo.nombre,
    precio: combo.precio,
    cantidad: 1
  });

  guardarCarrito();
  renderCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
  renderCarrito();
}

function renderCarrito() {
  const contenedor = document.getElementById("carrito");
  const totalEl = document.getElementById("total");

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;

    contenedor.innerHTML += `
      <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
        <div>
          <strong>${p.nombre}</strong><br>
          <small>${p.cantidad} x $${p.precio}</small>
        </div>
        <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${p.id})">✕</button>
      </div>
    `;
  });

  totalEl.innerText = total;
}

function enviarPedidoWhatsApp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "🛒 *Pedido E&M Bebidas y Hielo*%0A%0A";
  let total = 0;

  carrito.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad}%0A`;
    total += p.precio * p.cantidad;
  });

  mensaje += `%0A💰 Total: $${total}`;

  // Historial
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push({
    fecha: new Date().toLocaleString(),
    pedido: carrito,
    total
  });
  localStorage.setItem("historial", JSON.stringify(historial));

  carrito = [];
  guardarCarrito();
  renderCarrito();

  window.open(`https://wa.me/+5491166616722?text=${mensaje}`, "_blank");
}

renderCarrito();
