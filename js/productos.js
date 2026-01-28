fetch("data/productos.json")
  .then(res => res.json())
  .then(productos => {
    const contenedor = document.getElementById("productos");

    productos.forEach(p => {
      contenedor.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 producto-card text-center">
            <img src="${p.imagen}" class="card-img-top p-3" alt="${p.nombre}">
            <div class="card-body d-flex flex-column">
              <h6 class="mb-2">${p.nombre}</h6>
              <p class="fw-bold text-primary mb-3">$${p.precio}</p>
              <button 
                class="btn btn-primary mt-auto"
                onclick="agregarAlCarrito(${p.id})">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      `;
    });
  });
