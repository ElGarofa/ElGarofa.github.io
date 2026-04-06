let players = JSON.parse(localStorage.getItem("players")) || []
let jugadorActual = null
let coins = parseInt(localStorage.getItem("coins")) || 0

let xp = 0
let nivel = 1


/* ================= XP ================= */

function ganarXP(n=10){
xp += n

if(xp >= 100){
nivel++
xp = 0
popup("Subiste a nivel " + nivel + " 🔥")
}

actualizarXP()
}

function actualizarXP(){
let bar = document.getElementById("xp-bar")
if(bar) bar.style.width = xp + "%"
}

/* ================= CREAR ================= */

function crearJugador(){

let nombre = document.getElementById("nombre")?.value
let rango = document.getElementById("rango")?.value
let inputFoto = document.getElementById("foto")

if(!nombre){
alert("Poné un nombre")
return
}

let formData = new FormData()
formData.append("nombre", nombre)
formData.append("rango", rango)

if(inputFoto && inputFoto.files[0]){
formData.append("foto", inputFoto.files[0])
}

fetch("save_player.php",{
method:"POST",
body:formData
})
.then(res=>res.text())
.then(()=>{
popup("Jugador creado 🔥")
cargarPlayersDB()
})

}

function cargarPlayersDB(){

fetch("get_players.php")
.then(res=>res.json())
.then(data=>{

players = data

renderPlayers()

})

}

/* ================= PLAYERS ================= */

function renderPlayers(){

let div = document.getElementById("players")
if(!div) return

div.innerHTML=""

players.forEach((p,i)=>{
div.innerHTML+=`
<div class="playerCard" onclick="verPerfil(${i})">
<img src="${p.foto ? 'data:image/png;base64,'+p.foto : 'https://via.placeholder.com/40'}">
<div>
<b>${p.nombre}</b><br>${p.rango}
</div>
</div>`
})

renderRanking()
}

/* ================= PERFIL ================= */

function verPerfil(i){

jugadorActual = i
let p = players[i]

document.getElementById("perfil").innerHTML = `

<h2>${p.nombre}</h2>

<img src="${p.foto || ''}" class="avatarBig">

<div class="xp-container">
<div id="xp-bar"></div>
</div>

<p>🏆 Victorias: ${p.victorias}</p>
<p>💀 Muertes: ${p.muertes}</p>
<p>🎒 Items: ${p.compras.length}</p>

<div class="mt-2">

<button class="btn-game" onclick="pokemonRandom()">🎲 Pokemon</button>
<button class="btn-game" onclick="abrirInventario()">📦</button>
<button class="btn-game" onclick="ganarXP(20)">⭐ XP</button>

</div>

<div class="team mt-3">
${p.team.map(t=>`<img src="${t.img}">`).join("")}
</div>
`
}

/* ================= IA EQUIPO ================= */

function analizarEquipo(){

let p=players[jugadorActual]

if(p.team.length==0){
popup("No tenés equipo ❌")
return
}

let tiposDetectados = {}

p.team.forEach(pk=>{
if(tiposDetectados[pk.img]) tiposDetectados[pk.img]++
else tiposDetectados[pk.img]=1
})

let mensaje=""

if(p.team.length<6){
mensaje+="⚠ Equipo incompleto\n"
}

if(Object.values(tiposDetectados).some(v=>v>1)){
mensaje+="⚠ Tenés Pokémon repetidos\n"
}

if(p.team.length>=6){
mensaje+="✅ Equipo completo\n"
}

popup(mensaje || "Equipo balanceado 🔥")
}

/* ================= POKEMON RANDOM ================= */

function pokemonRandom(){

let id = Math.floor(Math.random()*898)+1

fetch("https://pokeapi.co/api/v2/pokemon/"+id)
.then(r=>r.json())
.then(data=>{

players[jugadorActual].team.push({
img:data.sprites.front_default
})

guardarPlayers()
verPerfil(jugadorActual)
ganarXP(5)

})

}

/* ================= TORNEO PRO ================= */

let bracket = {
left: [],
right: [],
semi: [],
final: []
}

/* GENERAR */
function generarTorneo(){

let pool=document.getElementById("pool")
pool.innerHTML=""

let lista=[...players].sort(()=>Math.random()-0.5)

lista.forEach(p=>{
pool.innerHTML+=`
<div class="player" draggable="true" data-name="${p.nombre}">
${p.nombre}
</div>`
})

initDrag()
}

/* DRAG */
function initDrag(){

document.querySelectorAll(".player").forEach(el=>{
el.addEventListener("dragstart",e=>{
e.dataTransfer.setData("text",el.dataset.name)
})
})

document.querySelectorAll(".slot").forEach(slot=>{

slot.addEventListener("dragover",e=>e.preventDefault())

slot.addEventListener("drop",e=>{
e.preventDefault()

if(slot.innerHTML!="") return

let name=e.dataTransfer.getData("text")

slot.innerHTML=name
slot.classList.add("filled")

})

})
}

/* CLICK AVANCE */
document.addEventListener("click",e=>{

if(e.target.classList.contains("slot") && e.target.innerHTML){

let next=e.target.dataset.next

if(!next) return

let target=document.getElementById(next)

if(target && target.innerHTML==""){
target.innerHTML=e.target.innerHTML
target.classList.add("filled")
}

}
})

/* RENDER */
function renderBracket(){

let div = document.getElementById("torneo")
div.innerHTML = `<div class="bracket">

${renderSide(bracket.left, "L")}
${renderSemi()}
${renderSide(bracket.right, "R")}

</div>`
}

/* LADOS */
function renderSide(side, tag){

return `<div class="round">

${side.map((m,i)=>`
<div class="match">

<div>${m[0].nombre}</div>
<div>VS</div>
<div>${m[1].nombre}</div>

<button onclick="ganar('${tag}',${i},0)">✔</button>
<button onclick="ganar('${tag}',${i},1)">✔</button>

</div>
`).join("")}

</div>`
}

/* SEMIS + FINAL */
function renderSemi(){

return `<div class="round">

${bracket.semi.map((m,i)=>`
<div class="match">

<div>${m[0].nombre}</div>
<div>VS</div>
<div>${m[1].nombre}</div>

<button onclick="ganarSemi(${i},0)">✔</button>
<button onclick="ganarSemi(${i},1)">✔</button>

</div>
`).join("")}

${bracket.final.length ? `
<div class="match champion">

<div>${bracket.final[0].nombre}</div>
<div>VS</div>
<div>${bracket.final[1].nombre}</div>

<button onclick="ganarFinal(0)">🏆</button>
<button onclick="ganarFinal(1)">🏆</button>

</div>` : ""}

</div>`
}

/* CUARTOS */
function ganar(side,i,w){

let ganador = side==="L" ? bracket.left[i][w] : bracket.right[i][w]

bracket.semi.push(ganador)

if(bracket.semi.length === 4){

bracket.semi = [
[bracket.semi[0], bracket.semi[1]],
[bracket.semi[2], bracket.semi[3]]
]

}

renderBracket()
}

/* SEMIS */
function ganarSemi(i,w){

let ganador = bracket.semi[i][w]

bracket.final.push(ganador)

if(bracket.final.length === 2){
renderBracket()
}
}

/* FINAL */
function ganarFinal(w){

let campeon = bracket.final[w]

campeon.victorias++
guardarPlayers()

popup("🏆 CAMPEÓN: " + campeon.nombre)

renderPlayers()
renderBracket()
}

/* ================= STORAGE ================= */

function guardarPlayers(){
localStorage.setItem("players", JSON.stringify(players))
}
window.onload = () => {
cargarPlayersDB()
}