let perfiles = [
{nombre:"Luna",edad:22,img:"https://picsum.photos/400/600?1"},
{nombre:"Kai",edad:25,img:"https://picsum.photos/400/600?2"},
{nombre:"Aria",edad:21,img:"https://picsum.photos/400/600?3"},
];

let indexPerfil = 0;
let theracoins = 150;
let nivel = 1;
let xp = 0;

const app = document.getElementById("app");

function renderInicio(){
let perfil = perfiles[indexPerfil];

app.innerHTML = `
<div class="header">Descubrir</div>

<div class="card-wrapper">
    <div class="card-perfil" id="swipeCard">
        <img src="${perfil.img}">
        <div class="card-overlay">
            <h4>${perfil.nombre}, ${perfil.edad}</h4>
            <small>Nivel ${nivel}</small>
        </div>
    </div>
</div>

<div class="swipe-buttons">
    <button class="swipe-btn dislike" onclick="dislike()">✖</button>
    <button class="swipe-btn like" onclick="like()">❤</button>
</div>
`;

activarSwipe();
}

function like(){
xp += 10;
checkNivel();
animacionSalida("right");
}

function dislike(){
animacionSalida("left");
}

function animacionSalida(dir){
const card = document.getElementById("swipeCard");
card.style.transition="0.4s";
card.style.transform = dir==="right" ?
"translateX(500px) rotate(25deg)" :
"translateX(-500px) rotate(-25deg)";

setTimeout(()=>{
indexPerfil = (indexPerfil+1)%perfiles.length;
renderInicio();
},400);
}

function activarSwipe(){
let card = document.getElementById("swipeCard");
let startX=0;

card.addEventListener("mousedown",e=>startX=e.clientX);
card.addEventListener("mouseup",e=>{
if(e.clientX-startX>100) like();
if(startX-e.clientX>100) dislike();
});
}

function checkNivel(){
if(xp>=100){
nivel++;
xp=0;
alert("Subiste a nivel "+nivel+"!");
}
}

/* MISIONS */
function renderMisiones(){
app.innerHTML=`
<div class="header">Misiones</div>

<div style="padding:20px">
<p>🎯 Da 5 likes (50xp)</p>
<p>💬 Envía 3 mensajes (30xp)</p>
<p>🌍 Publica en el foro (40xp)</p>
<p>🔥 Entra a una manada (60xp)</p>
<p>📸 Sube una foto a galería (50xp)</p>
</div>
`;
}

/* COMUNIDAD */
function renderComunidad(){
app.innerHTML=`
<div class="header">Comunidad</div>

<div style="padding:20px">
<h5>🌍 Foro General</h5>
<textarea class="form-control mb-2" placeholder="Escribe algo..."></textarea>
<button class="btn btn-success w-100 mb-3">Publicar</button>

<h5>🐺 Manadas</h5>
<button class="btn btn-outline-light w-100 mb-2">Unirse a Manada Lobo</button>
<button class="btn btn-outline-light w-100 mb-2">Unirse a Manada Felina</button>

<h5>🎨 Galería de Arte</h5>
<input type="file" class="form-control">
</div>
`;
}

/* PREMIUM */
function renderPremium(){
app.innerHTML=`
<div class="header">Premium</div>

<div style="padding:20px">
<h5>Suscripciones</h5>
<button class="btn btn-warning w-100 mb-2">1 Mes</button>
<button class="btn btn-warning w-100 mb-2">3 Meses</button>
<button class="btn btn-warning w-100 mb-2">1 Año</button>
<button class="btn btn-danger w-100 mb-4">Permanente</button>

<h5>Comprar Theracoins</h5>
<button class="btn btn-outline-light w-100 mb-2">150 Monedas</button>
<button class="btn btn-outline-light w-100 mb-2">500 Monedas</button>
<button class="btn btn-outline-light w-100 mb-2">1000 Monedas</button>

<p class="mt-3">Saldo actual: ${theracoins} 🪙</p>
</div>
`;
}

/* PERFIL */
function renderPerfil(){
app.innerHTML=`
<div class="header">Mi Perfil</div>

<div style="padding:20px">
<p>Nivel: ${nivel}</p>
<p>XP: ${xp}/100</p>
<p>Theracoins: ${theracoins}</p>
<button class="btn btn-outline-light w-100 mb-2">Editar Perfil</button>
<button class="btn btn-outline-warning w-100">Modo Boost</button>
</div>
`;
}

/* MATCHES */
function renderMatches(){
app.innerHTML=`
<div class="header">Chats</div>
<div style="padding:20px">
<p>No tienes matches aún</p>
</div>
`;
}

renderInicio();
