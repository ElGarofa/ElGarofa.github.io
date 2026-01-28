function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
  let carrito = obtenerCarrito();
  const item = carrito.find(p => p.id === id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ id, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContador();
}

function cambiarCantidad(id, cambio) {
  let carrito = obtenerCarrito();
  const item = carrito.find(p => p.id === id);

  if (!item) return;

  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  guardarCarrito(carrito);
  location.reload();
}

function actualizarContador() {
  const contador = document.getElementById("contador");
  if (!contador) return;

  const total = obtenerCarrito()
    .reduce((acc, p) => acc + p.cantidad, 0);

  contador.textContent = total;
}

actualizarContador();
