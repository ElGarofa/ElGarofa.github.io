let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

let jugadorActual = null;

let sinocoins = Number(localStorage.getItem("sinocoins")) || 0;

let inventario = JSON.parse(localStorage.getItem("inventario")) || [];



let misiones=[

{nombre:"Derrotar Roark",coins:20,done:false},

{nombre:"Derrotar Gardenia",coins:20,done:false},

{nombre:"Derrotar Maylene",coins:20,done:false},

{nombre:"Derrotar Wake",coins:20,done:false},

{nombre:"Derrotar Fantina",coins:20,done:false},

{nombre:"Derrotar Byron",coins:20,done:false},

{nombre:"Derrotar Candice",coins:20,done:false},

{nombre:"Derrotar Volkner",coins:20,done:false},

{nombre:"Derrotar Rival",coins:15,done:false},

{nombre:"Derrotar Equipo Galaxia",coins:15,done:false}

]



actualizarPantalla()

mostrarMisiones()



function guardar(){

localStorage.setItem("jugadores",JSON.stringify(jugadores))

localStorage.setItem("sinocoins",sinocoins)

localStorage.setItem("inventario",JSON.stringify(inventario))

}



function crearParticipante(){

let nombre=prompt("Nombre jugador")

if(!nombre)return

let tier=prompt("Tier (Beginner/Veterano/Pro)")

let img=prompt("URL imagen jugador")

jugadores.push({

nombre,

tier,

img,

wins:0,

loss:0,

muertes:0,

equipo:[]

})

guardar()

actualizarPantalla()

}



function actualizarPantalla(){

document.getElementById("sinocoins").innerText=sinocoins

let div=document.getElementById("participantes")

div.innerHTML=""



jugadores.forEach((j,i)=>{

div.innerHTML+=`

<div class="playerCard">

<img src="${j.img}" class="playerImg">

<h4>${j.nombre}</h4>

Tier: ${j.tier}

<br>

Wins:${j.wins}

Loss:${j.loss}

Muertes:${j.muertes}

<br>

<button onclick="verJugador(${i})"

class="btn-neon">

Ver perfil

</button>

</div>

`

})



let inv=document.getElementById("inventario")

inv.innerHTML=""

inventario.forEach(x=>{

inv.innerHTML+=x+"<br>"

})

}



function verJugador(i){

jugadorActual=i

let j=jugadores[i]

document.getElementById("perfil").innerHTML=`

<h3>${j.nombre}</h3>

Tier:${j.tier}

<br>

Wins:${j.wins}

<br>

Loss:${j.loss}

<br>

Muertes:${j.muertes}

`

mostrarEquipo()

}



function agregarPokemon(){

if(jugadorActual==null)return

let nombre=document.getElementById("pokemonInput").value

if(!nombre)return

let j=jugadores[jugadorActual]

if(j.equipo.length>=6){

alert("Equipo lleno")

return

}



let img=

"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

+nombre.toLowerCase()+".png"



j.equipo.push({

nombre,

img

})



guardar()

mostrarEquipo()

}



function mostrarEquipo(){

let div=document.getElementById("equipo")

div.innerHTML=""



if(jugadorActual==null)return



jugadores[jugadorActual].equipo.forEach(p=>{

div.innerHTML+=`

<div class="pokemonCard">

<img src="${p.img}">

<p>${p.nombre}</p>

</div>

`

})

}



function mostrarMisiones(){

let div=document.getElementById("misiones")

div.innerHTML=""



misiones.forEach((m,i)=>{

div.innerHTML+=`

<div class="mision">

${m.nombre}

<br>

${m.coins} coins

<br>

<button onclick="completarMision(${i})"

class="btn-neon">

Completar

</button>

</div>

`

})

}



function completarMision(i){

if(misiones[i].done)return

misiones[i].done=true

sinocoins+=misiones[i].coins

guardar()

actualizarPantalla()

}



function comprar(nombre,costo){

if(sinocoins<costo){

alert("No alcanza")

return

}



sinocoins-=costo

inventario.push(nombre)

guardar()

actualizarPantalla()

}



/* RANDOM POKEMON */

function randomPokemon(){

if(sinocoins<50){

alert("Necesitas 50 coins")

return

}



if(jugadorActual==null)return



let id=Math.floor(Math.random()*493)+1



let nombre="Pokemon "+id



let img=

"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+id+".png"



jugadores[jugadorActual].equipo.push({

nombre,

img

})



sinocoins-=50



guardar()

mostrarEquipo()

actualizarPantalla()

}