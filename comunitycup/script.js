let players=[]
let coins=0
let jugadorActual=null

let tramoActual=1

/* ---------------- MISIONS ---------------- */

let misiones=[

{
nombre:"Vencer Gimnasio",
rewards:{A:5,B:5,C:10,D:15},
tiers:["A","B","C","D"]
},

{
nombre:"Sin muertes en tramo",
rewards:{A:5,B:5,C:10,D:15},
tiers:["A","B"]
},

{
nombre:"Capturar 5 Pokemon",
rewards:{A:5,B:5,C:10,D:15},
tiers:["A","B","C","D"]
},

{
nombre:"No usar objetos en boss",
rewards:{A:5,B:5,C:10,D:15},
tiers:["A","B"]
},

{
nombre:"Equipo full evolucionado",
rewards:{A:5,B:5,C:10,D:15},
tiers:["B","C","D"]
},

{
nombre:"Completar tramo",
rewards:{A:5,B:5,C:10,D:15},
tiers:["A","B","C","D"]
}

]


/* ---------------- TIENDA ---------------- */

let tienda=[

{
nombre:"Pokemon Random",
precios:{A:120,B:100,C:80,D:60},
tiers:["A","B","C","D"]
},

{
nombre:"Captura Extra",
precios:{A:80,B:70,C:60,D:50},
tiers:["A","B","C","D"]
},

{
nombre:"Revive Pokemon",
precios:{A:0,B:100,C:80,D:60},
tiers:["B","C","D"]
},

{
nombre:"Quitar Muerte",
precios:{A:200,B:150,C:120,D:100},
tiers:["A","B","C","D"]
},

{
nombre:"Segunda Vida",
precios:{A:250,B:200,C:150,D:120},
tiers:["A","B","C","D"]
}

]


/* ---------------- INICIO ---------------- */

window.onload=function(){

actualizarTodo()

}


/* ---------------- GENERAL ---------------- */

function actualizarTodo(){

actualizarPlayers()
cargarMisiones()
cargarTienda()
actualizarCoins()

}


/* ---------------- CREAR JUGADOR ---------------- */

function crearJugador(){

let nombre=document.getElementById("nombre").value
let rango=document.getElementById("rango").value
let file=document.getElementById("foto").files[0]

if(nombre=="") return


let jugador={

nombre:nombre,
rango:rango,
foto:"",
team:[],
victorias:0,
derrotas:0,
muertes:0

}


if(file){

let reader=new FileReader()

reader.onload=function(){

jugador.foto=reader.result

players.push(jugador)

actualizarPlayers()

}

reader.readAsDataURL(file)

}
else{

players.push(jugador)

actualizarPlayers()

}

}


/* ---------------- LISTA JUGADORES ---------------- */

function actualizarPlayers(){

let div=document.getElementById("players")

if(!div)return

div.innerHTML=""


players.forEach((p,i)=>{

div.innerHTML+=`

<div class="playerCard">

<b>${p.nombre}</b>

<br>

${p.rango}

<br>

<button
class="btn btn-neon mt-2"
onclick="verPerfil(${i})">

Perfil

</button>

</div>

`

})

}


/* ---------------- PERFIL ---------------- */

function verPerfil(id){

jugadorActual=id

let perfil=document.getElementById("perfil")

perfil.style.display="block"

let p=players[id]


perfil.innerHTML=`

<h3>${p.nombre}</h3>

<img class="avatarBig"
src="${p.foto || ''}">

<br><br>

Victorias: ${p.victorias}

<br>

Derrotas: ${p.derrotas}

<br>

Muertes: ${p.muertes}

<button
class="btn btn-success mt-2"
onclick="completarTramo()">

Completar Tramo

</button>

<button
class="btn btn-danger mt-2"
onclick="sumarMuerte()">

Sumar Muerte

</button>

<br><br>


<h4>Agregar Pokemon</h4>

<input id="pokemonInput">

<button
class="btn btn-neon"
onclick="agregarPokemon(${id})">

Agregar

</button>

<br><br>


<button
class="btn btn-purple"
onclick="pokemonRandomPerfil()">

Pokemon Random

</button>


<h4>Equipo</h4>

<div
class="team"
id="equipo">

</div>


<button
class="btn btn-danger mt-3"
onclick="cerrarPerfil()">

Cerrar

</button>

`

mostrarEquipo(id)
cargarMisiones()
cargarTienda()

}


function cerrarPerfil(){

document.getElementById("perfil").style.display="none"

}


/* ---------------- EQUIPO ---------------- */

function mostrarEquipo(id){

let div=document.getElementById("equipo")

if(!div)return

div.innerHTML=""

let jugador=players[id]

jugador.team.forEach(p=>{

div.innerHTML+=`

<div class="pokemonCard">

<img src="${p.img}">

<br>

${p.nombre}

</div>

`

})

}


/* ---------------- AGREGAR POKEMON ---------------- */

function agregarPokemon(id){

let nombre=document
.getElementById("pokemonInput")
.value
.toLowerCase()

if(nombre=="")return


fetch(
"https://pokeapi.co/api/v2/pokemon/"+nombre
)

.then(r=>r.json())

.then(data=>{

players[id].team.push({

nombre:nombre,
img:data.sprites.front_default

})

verPerfil(id)

})

}


/* ---------------- RULETA PERFIL ---------------- */

function pokemonRandomPerfil(){

if(jugadorActual==null)return


let lista=[

"pikachu",
"garchomp",
"infernape",
"staraptor",
"luxray",
"lucario",
"gastrodon",
"togekiss",
"roselia",
"floatzel"

]


let poke=lista[
Math.floor(Math.random()*lista.length)
]


fetch(
"https://pokeapi.co/api/v2/pokemon/"+poke
)

.then(r=>r.json())

.then(data=>{

players[jugadorActual].team.push({

nombre:poke,
img:data.sprites.front_default

})

verPerfil(jugadorActual)

})

}


/* ---------------- MISIONES ---------------- */

function cargarMisiones(){

let div=document.getElementById("misiones")
if(!div)return

div.innerHTML=""

if(jugadorActual==null){

div.innerHTML="Selecciona un jugador"
return

}

let tierJugador=players[jugadorActual].rango


misiones.forEach((m,i)=>{

if(m.tiers.includes(tierJugador)){

let recompensa=m.rewards[tierJugador]

if(recompensa>0){

div.innerHTML+=`

<div class="mission">

<b>${m.nombre}</b>

<br>

💰 ${recompensa}

<br>

<button
class="btn btn-neon"
onclick="completarMision(${i})">

Completar

</button>

</div>

`

}

}

})

}


/* ---------------- TIENDA ---------------- */

function cargarTienda(){

let div=document.getElementById("tienda")
if(!div)return

div.innerHTML=""

if(jugadorActual==null){

div.innerHTML="Selecciona un jugador"
return

}

let tier=players[jugadorActual].rango

tienda.forEach((item,i)=>{

if(item.tiers.includes(tier)){

let precio=item.precios[tier]

if(precio>0){

div.innerHTML+=`

<div class="shopItem card bg-dark text-light border-info shadow-lg mb-3">

<div class="card-body text-center">

<h5 class="text-info">${item.nombre}</h5>

<p class="text-warning fs-5">💰 ${precio}</p>

<button
class="btn btn-outline-info w-100"
onclick="comprarItem(${i})">

Comprar

</button>

</div>

</div>

`

}

}

})

}


/* ---------------- COINS ---------------- */

function ganarCoins(n){

coins+=n

actualizarCoins()

}


function actualizarCoins(){

let c=document.getElementById("coins")

if(c)

c.innerText=coins

}


function comprarItem(i){

if(jugadorActual==null)return

let tier=players[jugadorActual].rango

let precio=tienda[i].precios[tier]

if(coins<precio){

alert("No tienes suficientes monedas")

return

}

coins-=precio
actualizarCoins()

aplicarItem(i)

} 
/* -------- TORNEO -------- */

function generarTorneo(){

let div=document.getElementById("torneo")

if(!div)return

div.innerHTML=""

if(players.length<2){

div.innerHTML="Necesitas jugadores"

return

}


/* mezclar jugadores */

let lista=[...players]

lista.sort(()=>Math.random()-0.5)


div.innerHTML+=`

<h4>Bracket</h4>

<div class="bracket">

`


for(let i=0;i<lista.length;i+=2){

if(lista[i+1]){

div.innerHTML+=`

<div class="match">

<div>

${lista[i].nombre}

</div>

VS

<div>

${lista[i+1].nombre}

</div>

</div>

`

}

}


div.innerHTML+="</div>"

}


function monedasPorTramo(tier){

if(tier=="A" || tier=="B") return 5

if(tier=="C") return 10

if(tier=="D") return 15

return 0

}


function completarTramo(){

if(jugadorActual==null)return

let jugador=players[jugadorActual]

let base=monedasPorTramo(jugador.rango)

let resultado=base - jugador.muertes

if(resultado<0) resultado=0

coins+=resultado

jugador.muertes=0

actualizarCoins()

alert("Ganaste "+resultado+" monedas en el tramo "+tramoActual)

}

function sumarMuerte(){

if(jugadorActual==null)return

players[jugadorActual].muertes++

verPerfil(jugadorActual)

}


function completarMision(i){

if(jugadorActual==null)return

let tier=players[jugadorActual].rango

let recompensa=misiones[i].rewards[tier]

if(!recompensa)return

coins+=recompensa

actualizarCoins()

}

function aplicarItem(i){

let jugador=players[jugadorActual]
let nombre=tienda[i].nombre

if(nombre=="Pokemon Random"){

pokemonRandomPerfil()

}

if(nombre=="Quitar Muerte"){

if(jugador.muertes>0){

jugador.muertes--

verPerfil(jugadorActual)

}

}

if(nombre=="Revive Pokemon"){

alert("Revive manualmente en tu juego")

}

if(nombre=="Captura Extra"){

alert("Tienes una captura extra permitida")

}

if(nombre=="Segunda Vida"){

alert("Tienes una segunda oportunidad activa")

}

}