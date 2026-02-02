let productosGlobal = [];

fetch("data/productos.json")
  .then(res => res.json())
  .then(productos => {
    productosGlobal = productos;
    mostrarProductos(productos);
  });

function mostrarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const badge = p.oferta
      ? `<span class="badge-oferta">OFERTA</span>`
      : "";

    contenedor.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card producto-card h-100 text-center position-relative">
          ${badge}
          <img src="${p.imagen}" alt="${p.nombre}">
          <div class="card-body">
            <h6>${p.nombre}</h6>
            <p class="fw-bold">$${p.precio}</p>
            <button class="btn btn-primary w-100"
              onclick="agregarAlCarrito(${p.id})">
              Agregar
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

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
