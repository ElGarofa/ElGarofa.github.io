let players=[]
let coins=0
let jugadorActual=null

/* ---------------- MISIONS ---------------- */

let misiones=[

{nombre:"Vencer Gimnasio 1",reward:20},
{nombre:"Vencer Gimnasio 2",reward:30},
{nombre:"Vencer Rival",reward:25},
{nombre:"Capturar Pokemon",reward:20},
{nombre:"Equipo completo",reward:50},
{nombre:"Sin muertes",reward:100},
{nombre:"Elite 4",reward:200},
{nombre:"Campeon",reward:300},
{nombre:"Captura dificil",reward:60},
{nombre:"Shiny",reward:150}

]

/* ---------------- TIENDA ---------------- */

let tienda=[

{nombre:"Pokemon Random",precio:100},
{nombre:"Cambio Naturaleza",precio:80},
{nombre:"Captura Extra",precio:50},
{nombre:"Segunda Vida",precio:150}

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


misiones.forEach(m=>{

div.innerHTML+=`

<div class="mission">

<b>${m.nombre}</b>

<br>

💰 ${m.reward}

<br>

<button
class="btn btn-neon"
onclick="ganarCoins(${m.reward})">

Completar

</button>

</div>

`

})

}


/* ---------------- TIENDA ---------------- */

function cargarTienda(){

let div=document.getElementById("tienda")

if(!div)return

div.innerHTML=""

tienda.forEach(t=>{

div.innerHTML+=`

<div class="shopItem">

<b>${t.nombre}</b>

<br>

💰 ${t.precio}

<br>

<button
class="btn btn-purple"
onclick="comprar(${t.precio})">

Comprar

</button>

</div>

`

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


function comprar(p){

if(coins<p)return

coins-=p

actualizarCoins()

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