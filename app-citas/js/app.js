/* =========================
   ESTADO GLOBAL
========================= */

let state = {
xp: 0,
nivel: 1,
theracoins: 150,
seguidores: 10,
reputacion: 25,
premium: false,
perfil: {
tipo: "",
personalidad: "",
ubicacion: "",
estado: "",
instagram: "",
tiktok: "",
discord: ""
}
};

/* =========================
   PERSISTENCIA
========================= */

function saveState(){
localStorage.setItem("therianState", JSON.stringify(state));
}

function loadState(){
let saved = localStorage.getItem("therianState");
if(saved){
state = JSON.parse(saved);
}
}

/* =========================
   NAVEGACIÓN
========================= */

const app = document.getElementById("app");

function navigate(view){
switch(view){
case "inicio": renderInicio(); break;
case "comunidad": renderComunidad(); break;
case "eventos": renderEventos(); break;
case "misiones": renderMisiones(); break;
case "premium": renderPremium(); break;
case "perfil": renderPerfil(); break;
}
}

/* =========================
   SWIPE
========================= */

function swipe(like){
if(like){
state.xp += 10;
if(state.xp >= 100){
state.nivel++;
state.xp = 0;
}
}
saveState();
renderInicio();
}

/* =========================
   VISTAS
========================= */

function renderInicio(){
app.innerHTML = `
<div class="header">Explorar</div>

<div class="card-wrapper">
<div class="card-perfil">
<img src="https://picsum.photos/400/600">
<div class="card-overlay">
<h4>Luna, 22</h4>
<p>Therian Lobo 🌙</p>
</div>
</div>
</div>

<div class="swipe-buttons text-center pb-5">
<button class="btn btn-dark me-3" onclick="swipe(false)">❌</button>
<button class="btn btn-danger" onclick="swipe(true)">❤️</button>
</div>
`;
}

function renderComunidad(){
app.innerHTML = `
<div class="header">Comunidad</div>

<div style="padding:15px;overflow-y:auto;height:85vh">

<h5>📢 Feed</h5>
<textarea class="form-control mb-2" placeholder="¿Qué estás pensando?"></textarea>
<button class="btn btn-success w-100 mb-3">Publicar</button>

<div class="card p-2 mb-3 bg-dark text-white">
<b>Kai</b>
<p>Explorando el bosque 🌲</p>
<small>❤️ 12 🔥 4 💬 3</small>
</div>

<hr>

<h5>🐺 Manadas</h5>
<p>Tu rango: Explorador</p>
<button class="btn btn-outline-light w-100 mb-2">Manada Lobo</button>

<hr>

<h5>🏆 Ranking</h5>
<p>1. Luna ⭐ 540xp</p>

<hr>

<h5>💡 Sugerencias</h5>
<textarea class="form-control mb-2" placeholder="Envía tu idea..."></textarea>
<button class="btn btn-warning w-100">Enviar</button>

</div>
`;
}

function renderEventos(){
app.innerHTML = `
<div class="header">Eventos</div>

<div style="padding:20px">
<h5>🔥 Evento Artístico</h5>
<button class="btn btn-success w-100 mb-3">Participar</button>

<h5>🌕 Reunión Virtual</h5>
<button class="btn btn-success w-100">Unirse</button>
</div>
`;
}

function renderMisiones(){
app.innerHTML = `
<div class="header">Misiones</div>

<div style="padding:20px">
<p>🎯 Dar 5 likes</p>
<p>💬 Enviar 3 mensajes</p>
<p>📸 Subir foto</p>
<p>🔥 Unirse a una manada</p>
</div>
`;
}

function renderPremium(){
app.innerHTML = `
<div class="header">Premium</div>

<div style="padding:20px">

<h5>Suscripciones</h5>
<button class="btn btn-warning w-100 mb-2">1 Mes</button>
<button class="btn btn-warning w-100 mb-2">3 Meses</button>
<button class="btn btn-warning w-100 mb-2">1 Año</button>
<button class="btn btn-danger w-100 mb-3">Permanente</button>

<hr>

<h5>Comprar Theracoins</h5>
<button class="btn btn-outline-light w-100 mb-2">150</button>
<button class="btn btn-outline-light w-100 mb-2">500</button>
<button class="btn btn-outline-light w-100 mb-2">1000</button>

</div>
`;
}

function renderPerfil(){
app.innerHTML = `
<div class="header">Mi Perfil</div>

<div style="padding:20px">

<input class="form-control mb-2" placeholder="Tipo Therian" value="${state.perfil.tipo}">
<input class="form-control mb-2" placeholder="Personalidad" value="${state.perfil.personalidad}">
<input class="form-control mb-2" placeholder="Ubicación" value="${state.perfil.ubicacion}">
<input class="form-control mb-2" placeholder="Estado" value="${state.perfil.estado}">

<h5>Redes Sociales</h5>
<input class="form-control mb-2" placeholder="Instagram" value="${state.perfil.instagram}">
<input class="form-control mb-2" placeholder="TikTok" value="${state.perfil.tiktok}">
<input class="form-control mb-2" placeholder="Discord" value="${state.perfil.discord}">

<hr>

<p>Nivel: ${state.nivel}</p>
<p>XP: ${state.xp}/100</p>
<p>Theracoins: ${state.theracoins}</p>
<p>Seguidores: ${state.seguidores}</p>
<p>Reputación: ${state.reputacion}</p>

<button class="btn btn-success w-100 mt-3" onclick="saveState()">Guardar</button>

</div>
`;
}

/* =========================
   INIT
========================= */

loadState();
navigate("inicio");
