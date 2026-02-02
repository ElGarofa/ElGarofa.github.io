let productosGlobal = [];

// Cargar productos
fetch("data/productos.json")
  .then(res => res.json())
  .then(productos => {
    productosGlobal = productos;
    mostrarProductos(productosGlobal);
  })
  .catch(error => console.error("Error cargando productos:", error));

// Mostrar productos
function mostrarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const badgeOferta = p.oferta
      ? `<span class="badge-oferta">OFERTA</span>`
      : "";

    const claseHielo = p.categoria === "hielo" ? "hielo" : "";

    contenedor.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card producto-card ${claseHielo} h-100 text-center position-relative">
          ${badgeOferta}
          <img src="${p.imagen}" alt="${p.nombre}">
          <div class="card-body">
            <h6>${p.nombre}</h6>
            <p class="fw-bold">$${p.precio}</p>
            <button class="btn btn-primary w-100"
              onclick="agregarAlCarrito(${p.id})">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// Filtros
function filtrar(categoria) {
  document
    .querySelectorAll(".btn-outline-info")
    .forEach(btn => btn.classList.remove("active"));

  event.target.classList.add("active");

  if (categoria === "todos") {
    mostrarProductos(productosGlobal);
  } else {
    const filtrados = productosGlobal.filter(
      p => p.categoria === categoria
    );
    mostrarProductos(filtrados);
  }
}
