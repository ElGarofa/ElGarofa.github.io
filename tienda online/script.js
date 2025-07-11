const contenedor = document.getElementById("productos");
const carrito = [];

fetch("php/obtener_productos.php")
  .then(res => res.json())
  .then(data => {
    data.forEach(p => {
      const div = document.createElement("div");
      div.className = "participant-card";
      div.innerHTML = `
        <img class="avatar" src="${p.imagen}" />
        <div>
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
          <p><strong>$${p.precio}</strong></p>
        </div>
        <button onclick='agregarAlCarrito(${JSON.stringify(p)})'>Agregar</button>
      `;
      contenedor.appendChild(div);
    });
  });



function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  const div = document.getElementById("carrito");
  div.innerHTML = "<h3>🛒 Carrito</h3>";

  let total = 0;
  carrito.forEach(p => {
    div.innerHTML += `<p>${p.nombre} - $${p.precio}</p>`;
    total += parseFloat(p.precio);
  });

  div.innerHTML += `<hr><p><strong>Total: $${total.toFixed(2)}</strong></p>`;
  document.getElementById("input-productos").value = carrito.map(p => p.nombre).join(", ");
document.getElementById("input-total").value = carrito.reduce((sum, p) => sum + parseFloat(p.precio), 0).toFixed(2);



}
