let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
  const producto = productosGlobal.find(p => p.id === id);
  if (!producto || producto.stock === 0) return;

  const item = carrito.find(p => p.id === id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  guardarCarrito();
  renderCarrito();
}

function renderCarrito() {
  const contenedor = document.getElementById("carrito");
  const totalEl = document.getElementById("total");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;

    contenedor.innerHTML += `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div>
          <strong>${p.nombre}</strong><br>
          <small>$${p.precio}</small>
        </div>

        <div class="d-flex gap-2 align-items-center">
          <button class="btn btn-sm btn-outline-light"
            onclick="cambiarCantidad(${p.id}, -1)">−</button>

          <span>${p.cantidad}</span>

          <button class="btn btn-sm btn-outline-light"
            onclick="cambiarCantidad(${p.id}, 1)">+</button>

          <button class="btn btn-sm btn-outline-danger"
            onclick="eliminarProducto(${p.id})">✕</button>
        </div>
      </div>
    `;
  });

  totalEl.innerText = `$${total}`;
}

function cambiarCantidad(id, cambio) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;

  item.cantidad += cambio;
  if (item.cantidad <= 0) {
    eliminarProducto(id);
    return;
  }

  guardarCarrito();
  renderCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
  renderCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  renderCarrito();
}

function enviarPedidoWhatsApp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "Hola! Quiero hacer el siguiente pedido:%0A%0A";
  let total = 0;

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} x${p.cantidad} = $${p.precio * p.cantidad}%0A`;
    total += p.precio * p.cantidad;
  });

  mensaje += `%0A🧾 Total: $${total}`;

  window.open(
    `https://wa.me/549XXXXXXXXXX?text=${mensaje}`,
    "_blank"
  );
}

function pedidoRapidoHielo() {
  const hielo = productosGlobal.find(p => p.categoria === "hielo");
  if (!hielo) return;

  carrito = [{
    id: hielo.id,
    nombre: hielo.nombre,
    precio: hielo.precio,
    cantidad: 1
  }];

  guardarCarrito();
  renderCarrito();
}

function imprimirTicket() {
  let texto = "E&M Bebidas y Hielo\n\n";
  let total = 0;

  carrito.forEach(p => {
    texto += `${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}\n`;
    total += p.precio * p.cantidad;
  });

  texto += `\nTOTAL: $${total}`;

  const v = window.open("", "", "width=300,height=400");
  v.document.write(`<pre>${texto}</pre>`);
  v.print();
}

renderCarrito();
