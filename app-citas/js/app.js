// ========================
// ESTADO GLOBAL
// ========================

let monedas = 200;
let premium = false;
let boostActivo = false;

let nivelUsuario = 1;
let experiencia = 0;

let usuario = {
  nombre: "Marcos",
  edad: 25,
  bio: "Amante de la música 🎵",
  intereses: ["música", "viajes"]
};

let likesDados = [];
let likesRecibidos = [];

// ========================
// PERFILES
// ========================

const perfiles = [
  {
    id: 1,
    nombre: "Sofía",
    edad: 24,
    distancia: 5,
    intereses: ["música", "fitness"],
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
    online: true,
    likes: 120
  },
  {
    id: 2,
    nombre: "Valentina",
    edad: 27,
    distancia: 12,
    intereses: ["viajes", "arte"],
    foto: "https://randomuser.me/api/portraits/women/65.jpg",
    online: false,
    likes: 98
  },
  {
    id: 3,
    nombre: "Camila",
    edad: 22,
    distancia: 3,
    intereses: ["música", "cine"],
    foto: "https://randomuser.me/api/portraits/women/68.jpg",
    online: true,
    likes: 80
  }
];

// ========================
// INICIO
// ========================

document.addEventListener("DOMContentLoaded", () => {
  mostrarPerfiles(perfiles);
  actualizarMonedasUI();
  actualizarNivelUI();
});

// ========================
// MOSTRAR PERFILES
// ========================

function mostrarPerfiles(lista) {
  const contenedor = document.getElementById("perfiles");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  lista.forEach(perfil => {
    const compat = calcularCompatibilidad(perfil);

    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="profile-card p-3 text-center"
             ontouchstart="iniciarSwipe(event,this)"
             ontouchmove="moverSwipe(event,this)"
             ontouchend="finalizarSwipe(this)">
             
          <img src="${perfil.foto}" class="profile-img">
          
          <h4>${perfil.nombre}, ${perfil.edad}
            ${perfil.online ? '<span class="online-dot"></span>' : ""}
          </h4>

          <p>❤️ Compatibilidad: ${compat}%</p>
          <p>📍 ${perfil.distancia} km</p>

          <button class="btn btn-success w-100 mb-2"
            onclick="darLike(${perfil.id})">
            Me gusta
          </button>

          <button class="btn btn-danger w-100"
            onclick="descartar(${perfil.id})">
            Descartar
          </button>
        </div>
      </div>
    `;
  });
}

// ========================
// COMPATIBILIDAD INTELIGENTE
// ========================

function calcularCompatibilidad(perfil) {
  let coincidencias = perfil.intereses.filter(i =>
    usuario.intereses.includes(i)
  ).length;

  return 40 + coincidencias * 20;
}

// ========================
// SISTEMA DE LIKE + NIVEL
// ========================

function darLike(id) {
  const perfil = perfiles.find(p => p.id === id);
  if (!perfil) return;

  likesDados.push(id);
  experiencia += 10;

  perfil.intereses.forEach(i => {
    if (!usuario.intereses.includes(i)) {
      usuario.intereses.push(i);
    }
  });

  subirNivel();
  mostrarNotificacion("💖 Nuevo Like!");
}

function descartar(id) {
  mostrarNotificacion("❌ Perfil descartado");
}

function subirNivel() {
  if (experiencia >= 50) {
    nivelUsuario++;
    experiencia = 0;
    mostrarNotificacion("🎉 Subiste a nivel " + nivelUsuario);
  }
  actualizarNivelUI();
}

function actualizarNivelUI() {
  const nivel = document.getElementById("nivelUsuario");
  if (nivel) nivel.innerText = nivelUsuario;
}

// ========================
// FILTROS MEJORADOS
// ========================

function aplicarFiltros() {
  const edadMin = +document.getElementById("edadMin").value;
  const edadMax = +document.getElementById("edadMax").value;
  const distancia = +document.getElementById("distancia").value;

  document.getElementById("edadMinLabel").innerText = edadMin;
  document.getElementById("edadMaxLabel").innerText = edadMax;
  document.getElementById("distanciaLabel").innerText = distancia;

  const filtrados = perfiles.filter(p =>
    p.edad >= edadMin &&
    p.edad <= edadMax &&
    p.distancia <= distancia
  );

  mostrarPerfiles(filtrados);
}

// ========================
// PERFIL EDITABLE
// ========================

function guardarPerfil() {
  usuario.nombre = document.getElementById("editNombre").value;
  usuario.edad = document.getElementById("editEdad").value;
  usuario.bio = document.getElementById("editBio").value;

  mostrarNotificacion("✅ Perfil actualizado");
}

// ========================
// IA DE ANÁLISIS
// ========================

function analizarPerfil() {
  let mensaje = "";

  if (usuario.bio.length < 20) {
    mensaje += "Tu bio es muy corta. ";
  }

  if (usuario.intereses.length < 3) {
    mensaje += "Agregá más intereses. ";
  }

  if (mensaje === "") {
    mensaje = "Tu perfil está muy optimizado 🔥";
  }

  mostrarNotificacion("🤖 " + mensaje);
}

// ========================
// ANIMACIONES SWIPE TÁCTIL
// ========================

let startX = 0;

function iniciarSwipe(e, card) {
  startX = e.touches[0].clientX;
}

function moverSwipe(e, card) {
  let moveX = e.touches[0].clientX - startX;
  card.style.transform = `translateX(${moveX}px) rotate(${moveX/10}deg)`;
}

function finalizarSwipe(card) {
  card.style.transform = "translateX(0px)";
}

// ========================
// MONEDAS
// ========================

function actualizarMonedasUI() {
  const el = document.getElementById("monedas");
  if (el) el.innerText = monedas;
}

// ========================
// NOTIFICACIONES
// ========================

function mostrarNotificacion(texto) {
  const div = document.createElement("div");
  div.className = "notification";
  div.innerText = texto;
  document.body.appendChild(div);

  setTimeout(() => div.remove(), 3000);
}
