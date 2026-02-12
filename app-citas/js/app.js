let monedas = 200;
let nivelUsuario = 1;
let experiencia = 0;
let modoOscuro = true;

let usuario = {
  intereses: ["música", "viajes"]
};

const perfiles = [
  {
    id: 1,
    nombre: "Sofía",
    edad: 24,
    distancia: 5,
    intereses: ["música", "fitness"],
    fotos: [
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/women/45.jpg"
    ],
    online: true
  },
  {
    id: 2,
    nombre: "Valentina",
    edad: 27,
    distancia: 12,
    intereses: ["arte", "viajes"],
    fotos: [
      "https://randomuser.me/api/portraits/women/65.jpg",
      "https://randomuser.me/api/portraits/women/66.jpg"
    ],
    online: false
  }
];

document.addEventListener("DOMContentLoaded", () => {
  mostrarPerfiles(perfiles);
  actualizarNivel();
});

function mostrarPerfiles(lista) {
  const contenedor = document.getElementById("perfiles");
  contenedor.innerHTML = "";

  lista.forEach(perfil => {

    const compat = calcularCompatibilidad(perfil);

    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="profile-card p-2"
             onmousedown="startSwipe(event,this)"
             onmouseup="endSwipe(event,this)">

          <img src="${perfil.fotos[0]}">

          <div class="gallery mt-2">
            ${perfil.fotos.map(f => `<img src="${f}">`).join("")}
          </div>

          <h5 class="mt-2">
            ${perfil.nombre}, ${perfil.edad}
            ${perfil.online ? '<span class="online-dot"></span>' : ""}
          </h5>

          <p>❤️ ${compat}% compatibilidad</p>

          <button class="btn btn-success w-100"
            onclick="darLike(${perfil.id})">
            Me gusta
          </button>
        </div>
      </div>
    `;
  });
}

function calcularCompatibilidad(perfil) {
  let coincidencias = perfil.intereses.filter(i =>
    usuario.intereses.includes(i)
  ).length;

  return 50 + coincidencias * 20;
}

function darLike(id) {
  experiencia += 10;
  if (experiencia >= 50) {
    nivelUsuario++;
    experiencia = 0;
    mostrarNotificacion("🎉 Subiste a nivel " + nivelUsuario);
  }
  actualizarNivel();
}

function actualizarNivel() {
  document.getElementById("nivelUsuario").innerText = nivelUsuario;
}

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

function toggleModo() {
  modoOscuro = !modoOscuro;
  document.body.className = modoOscuro ? "dark-mode" : "light-mode";
}

function mostrarNotificacion(texto) {
  const div = document.createElement("div");
  div.className = "notification";
  div.innerText = texto;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

// SWIPE REAL

let swipeStart = 0;

function startSwipe(e, card) {
  swipeStart = e.clientX;
}

function endSwipe(e, card) {
  let diff = e.clientX - swipeStart;

  if (diff > 100) {
    card.style.transform = "translateX(500px)";
    setTimeout(() => card.parentElement.remove(), 300);
  }

  if (diff < -100) {
    card.style.transform = "translateX(-500px)";
    setTimeout(() => card.parentElement.remove(), 300);
  }
}

// CHAT

function enviarMensaje() {
  const input = document.getElementById("mensajeInput");
  const chat = document.getElementById("chat");

  if (input.value.trim() === "") return;

  chat.innerHTML += `
    <div class="message me">${input.value}</div>
  `;

  input.value = "";

  setTimeout(() => {
    chat.innerHTML += `
      <div class="message other">Hola 😊</div>
    `;
  }, 1000);
}

function simularTyping() {
  const typing = document.getElementById("typing");
  typing.innerText = "🟢 Está escribiendo...";
  setTimeout(() => typing.innerText = "", 1500);
}
