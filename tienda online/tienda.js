document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById("productos");
  const carritoDiv = document.getElementById("carrito");
  const inputProductos = document.getElementById("input-productos");
  const inputTotal = document.getElementById("input-total");
  const searchInput = document.querySelector('.search-bar');
  
  let productos = [];
  let carrito = [];

  // Crear producto en DOM
  function crearProductoDOM(producto) {
    const div = document.createElement("div");
    div.className = "participant-card";
    div.dataset.nombre = producto.nombre.toLowerCase();

    div.innerHTML = `
      <img class="avatar" src="${producto.imagen}" alt="${producto.nombre}" />
      <div>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p><strong>$${producto.precio}</strong></p>
      </div>
    `;

    const btn = document.createElement('button');
    btn.textContent = "Agregar";
    btn.className = "buy-btn";
    btn.addEventListener('click', () => agregarAlCarrito(producto));
    div.appendChild(btn);

    return div;
  }

  // Renderizar productos filtrados
  function renderProductos(filter = '') {
    contenedor.innerHTML = '';
    const filtro = filter.toLowerCase();
    productos
      .filter(p => p.nombre.toLowerCase().includes(filtro))
      .forEach(p => contenedor.appendChild(crearProductoDOM(p)));
  }

  // Agregar producto al carrito
  function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
  }

  // Quitar producto del carrito por índice
  function quitarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }

  // Actualizar carrito en DOM e inputs
  function actualizarCarrito() {
    carritoDiv.innerHTML = "<h3>🛒 Carrito</h3>";
    if (carrito.length === 0) {
      carritoDiv.innerHTML += "<p>Carrito vacío.</p>";
      inputProductos.value = '';
      inputTotal.value = '0.00';
      return;
    }

    carrito.forEach((p, i) => {
      const pElem = document.createElement('p');
      pElem.textContent = `${p.nombre} - $${p.precio}`;

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'X';
      btnEliminar.style.marginLeft = '10px';
      btnEliminar.style.backgroundColor = '#dc2626';
      btnEliminar.style.color = 'white';
      btnEliminar.style.border = 'none';
      btnEliminar.style.borderRadius = '4px';
      btnEliminar.style.cursor = 'pointer';
      btnEliminar.addEventListener('click', () => quitarDelCarrito(i));

      pElem.appendChild(btnEliminar);
      carritoDiv.appendChild(pElem);
    });

    const total = carrito.reduce((sum, p) => sum + parseFloat(p.precio), 0);
    const totalElem = document.createElement('p');
    totalElem.innerHTML = `<hr><strong>Total: $${total.toFixed(2)}</strong>`;
    carritoDiv.appendChild(totalElem);

    inputProductos.value = carrito.map(p => p.nombre).join(", ");
    inputTotal.value = total.toFixed(2);
  }

  // Evento búsqueda en vivo
  searchInput.addEventListener('input', e => {
    renderProductos(e.target.value);
  });

  // Cargar productos desde backend
  fetch("php/obtener_productos.php")
    .then(res => res.json())
    .then(data => {
      productos = data;
      renderProductos();
    })
    .catch(err => {
      contenedor.innerHTML = "<p>Error cargando productos.</p>";
      console.error(err);
    });
});
