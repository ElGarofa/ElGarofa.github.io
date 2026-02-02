const productosGlobal = [
  {
    id: 1,
    nombre: "Coca-Cola 2.25L",
    precio: 1800,
    categoria: "gaseosa",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCC0n-t7TY1uTtMap9hY0RH15PZ2WZC1YPsw&s",
    oferta: true,
    stock: 10
  },
  {
    id: 2,
    nombre: "Sprite 2.25L",
    precio: 1700,
    categoria: "gaseosa",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBfhhGRq80nxL_y2rw1FQcLiQNMsm_sDuQ0g&s",
    oferta: false,
    stock: 8
  },
  {
    id: 3,
    nombre: "Quilmes 1L",
    precio: 1500,
    categoria: "cerveza",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY1265M7KvIax11IDU-YNbVSvOf1J4OxCDjQ&s",
    oferta: true,
    stock: 6
  },
  {
    id: 4,
    nombre: "Agua Villa Del Sur 2.25L",
    precio: 1200,
    categoria: "agua",
    imagen: "https://www.villadelsur.com.ar/img/origen/botellasombra.png",
    oferta: false,
    stock: 12
  },
  {
    id: 5,
    nombre: "Bolsa de Hielo 5kg",
    precio: 1000,
    categoria: "hielo",
    imagen: "https://mondezza.com.ar/wp-content/uploads/2025/04/Mesa-de-trabajo-11-1.jpg",
    oferta: false,
    stock: 20
  }
];

let categoriaActual = "todos";

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  productosGlobal
    .filter(p => categoriaActual === "todos" || p.categoria === categoriaActual)
    .forEach(p => {

      const sinStock = p.stock === 0;

      contenedor.innerHTML += `
        <div class="col-md-4">
          <div class="card producto-card h-100 position-relative ${p.categoria}">
            
            ${p.oferta ? `<span class="badge-oferta">OFERTA</span>` : ""}

            <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">

            <div class="card-body text-center">
              <h5 class="text-light">${p.nombre}</h5>
              <p class="text-info fw-bold">$${p.precio}</p>

              ${
                sinStock
                  ? `<button class="btn btn-secondary w-100" disabled>Sin stock</button>`
                  : `<button class="btn btn-primary w-100"
                        onclick="agregarAlCarrito(${p.id})">
                        Agregar al carrito
                     </button>`
              }
            </div>
          </div>
        </div>
      `;
    });
}

function filtrar(categoria) {
  categoriaActual = categoria;
  mostrarProductos();
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
