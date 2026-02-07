const productosGlobal = [
  {
    id: 1,
    nombre: "Coca-Cola 2.25L",
    precio: 1800,
    categoria: "gaseosa",
    imagen: "img/coca-cola-225L-almacen-gaseosas-casa-segal-mendoza-600x600.jpg",
    oferta: true,
    stock: 10
  },
  {
    id: 2,
    nombre: "Sprite 2.25L",
    precio: 1700,
    categoria: "gaseosa",
    imagen: "img/144-03f228c49f14b9c1ac17155651946759-1024-1024.webp",
    oferta: false,
    stock: 8
  },
  {
    id: 3,
    nombre: "Quilmes 1L",
    precio: 1500,
    categoria: "cerveza",
    imagen: "img/Quilmes-Cristal-1-L-Retornable-3-18652.webp",
    oferta: true,
    stock: 6
  },
  {
    id: 4,
    nombre: "Agua Villa Del Sur 2.25L",
    precio: 1200,
    categoria: "agua",
    imagen: "img/product_picture_6b46e604e2db4dccbf770ba78efa925b_637862206780185132_0_m.jpg",
    oferta: false,
    stock: 12
  },
  {
    id: 5,
    nombre: "Bolsa de Hielo 5kg",
    precio: 1000,
    categoria: "hielo",
    imagen: "img/Mesa-de-trabajo-11-1.jpg",
    oferta: false,
    stock: 20
  },
  {
    id: 3,
    nombre: "Cerveza Quilmes Lata",
    precio: 900,
    categoria: "cerveza",
    imagen: "img/14463-F1-42.jpg",
    stock: 30
  },
  {
    id: 4,
    nombre: "Fernet Branca 750ml",
    precio: 8500,
    categoria: "alcohol",
    imagen: "img/156070-800-auto.webp",
    stock: 8
  },
  {
     id: 4,
     nombre : "Manaos 2.25L",
     precio: 1100,
     categoria: "gaseosa",
     marca: "Manaos",
     imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFspQnR6VrTUWE0ZKb1fIydWIdyIaMghygTQ&s",
  },
  {
     id: 6,
     nombre: "Fanta Naranja 2.25L",
     precio: 1500,
     categoria: "gaseosa",
     marca: "Coca-Cola",
     imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9-lyg58safhLNBErb-j0NkGG_NGSk-XI3Nw&s",
  },
  {
     id: 8,
     nombre: "Speed Energizante 473ml",
     precio: 1200,
     categoria: "energizante",
     marca: "Speed",
     imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToi4-kKeXhImicJ5Dps7SC4dwCoCJju49m-g&s",
  },
  {
    
  }
];

const combos = [
  {
    id: 101,
    nombre: "Combo Previa",
    precio: 4500,
    categoria: "combo"
  },
  {
    id: 102,
    nombre: "Combo Birra",
    precio: 6000,
    categoria: "combo"
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
