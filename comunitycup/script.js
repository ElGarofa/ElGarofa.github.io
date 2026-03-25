let players = JSON.parse(localStorage.getItem("players")) || []
let jugadorActual = null
let coins=0
let file= null

let misiones=[
{nombre:"Vencer Gimnasio",rewards:{A:5,B:5,C:10,D:15}},
{nombre:"Capturar Pokemon",rewards:{A:5,B:5,C:10,D:15}}
]

let tienda=[
{nombre:"Pokemon Random",precios:{A:100,B:80,C:60,D:50}}
]

/* NAV */
function go(id){
document.getElementById(id).scrollIntoView({behavior:"smooth"})
}

/* CREAR */
function crearJugador(){

let nombre = document.getElementById("nombre")?.value
let rango = document.getElementById("rango")?.value

if(!nombre){
alert("Poné un nombre")
return
}

/* CARGAR PLAYERS */
let players = JSON.parse(localStorage.getItem("players")) || []

let jugador = {
nombre: nombre,
rango: rango,
foto: "",
team: [],
muertes: 0,
inventario: [],
misiones: [],
compras: []
}

/* -------- FOTO SEGURA -------- */

let inputFoto = document.getElementById("foto")

if(inputFoto && inputFoto.files && inputFoto.files.length > 0){

let file = inputFoto.files[0]

let reader = new FileReader()

reader.onload = function(){

jugador.foto = reader.result

players.push(jugador)
localStorage.setItem("players", JSON.stringify(players))

renderPlayers()

popup("Jugador creado con foto ✅")

}

reader.readAsDataURL(file)

}else{

/* SIN FOTO */
players.push(jugador)
localStorage.setItem("players", JSON.stringify(players))

renderPlayers()

popup("Jugador creado ✅")

}

/* LIMPIAR INPUTS */
document.getElementById("nombre").value=""
if(inputFoto) inputFoto.value=""

}


/* ---------------- LISTA ---------------- */

function renderPlayers(){

let players = JSON.parse(localStorage.getItem("players")) || []

let div = document.getElementById("players")

if(!div) return

div.innerHTML=""

players.forEach((p,i)=>{

div.innerHTML+=`
<div class="playerCard" onclick="verPerfil(${i})">

<img src="${p.foto || 'https://via.placeholder.com/40'}">

<div>
<b>${p.nombre}</b><br>
${p.rango}
</div>

</div>
`

})

}

/* ---------------- PERFIL ---------------- */

function verPerfil(i){

jugadorActual=i
localStorage.setItem("jugadorActual", i)

let p=players[i]

let perfil=document.getElementById("perfil")

perfil.innerHTML=`

<h2>${p.nombre}</h2>

<img src="${p.foto || ''}" class="avatarBig">

<p>Muertes: ${p.muertes}</p>

<button class="btn-game" onclick="abrirInventario()">Inventario</button>

<button class="btn-game" onclick="pokemonRandom()">Pokemon Random</button>

<div class="team">
${p.team.map(t=>`<img src="${t.img}">`).join("")}
</div>
`

}

/* ---------------- INVENTARIO ---------------- */

function abrirInventario(){

let p=players[jugadorActual]

let modal=document.createElement("div")
modal.className="modal"

modal.innerHTML=`
<div class="modal-box">

<h2>${p.nombre}</h2>

<h3>🛒 Compras</h3>
${p.compras.map(c=>`<div>${c}</div>`).join("")}

<h3>🎯 Misiones</h3>
${p.misiones.map(m=>`<div>${m}</div>`).join("")}

<h3>🃏 Cartas</h3>
${p.inventario.map(i=>`<div>${i}</div>`).join("")}

<button onclick="this.parentElement.parentElement.remove()">Cerrar</button>

</div>
`

document.body.appendChild(modal)

}

/* ---------------- POKEMON RANDOM REAL ---------------- */

function pokemonRandom(){

let id=Math.floor(Math.random()*898)+1

fetch("https://pokeapi.co/api/v2/pokemon/"+id)
.then(r=>r.json())
.then(data=>{

players[jugadorActual].team.push({
img:data.sprites.front_default
})

guardarPlayers()
verPerfil(jugadorActual)

})

}

/* ---------------- TORNEO BRACKET PRO ---------------- */

function generarTorneo(){

let div=document.getElementById("torneo")
div.innerHTML=""

if(players.length<2){
div.innerHTML="Necesitas jugadores"
return
}

let lista=[...players].sort(()=>Math.random()-0.5)

/* CREAR RONDAS */
let rounds=[]

while(lista.length>1){

let round=[]

for(let i=0;i<lista.length;i+=2){

if(lista[i+1]){
round.push([lista[i],lista[i+1]])
}

}

rounds.push(round)
lista = new Array(Math.ceil(lista.length/2)).fill({nombre:"?"})

}

/* RENDER VISUAL */
div.innerHTML='<div class="bracket">'

rounds.forEach((round,r)=>{

div.innerHTML+=`<div class="round">`

round.forEach(match=>{
div.innerHTML+=`
<div class="match">
<div>${match[0].nombre}</div>
<div>VS</div>
<div>${match[1].nombre}</div>
</div>
`
})

div.innerHTML+=`</div>`

})

div.innerHTML+='</div>'
}

/* INIT */
renderPlayers()

/* MISIONES */
function cargarMisiones(){

let div=document.getElementById("misiones")
if(jugadorActual==null)return

let tier=players[jugadorActual].rango

div.innerHTML=""

misiones.forEach(m=>{
div.innerHTML+=`
<div>
${m.nombre} 💰 ${m.rewards[tier]}
</div>`
})
}

/* TIENDA */
function cargarTienda(){

let div=document.getElementById("tienda")
if(jugadorActual==null)return

let tier=players[jugadorActual].rango

div.innerHTML=""

tienda.forEach(t=>{
div.innerHTML+=`
<div class="shopItem">
${t.nombre} 💰 ${t.precios[tier]}
</div>`
})
}

/* MUERTE */
function sumarMuerte(){
players[jugadorActual].muertes++
verPerfil(jugadorActual)
}

function comprar(nombre,precio){

if(coins<precio){
alert("No tienes monedas")
return
}

coins-=precio
actualizarCoins()

alert("Compraste: "+nombre)
}

function completarMision(reward){
coins+=reward
actualizarCoins()
}

function ganarLogro(reward){
coins+=reward
actualizarCoins()
}

function guardarPlayers(){
localStorage.setItem("players", JSON.stringify(players))
}