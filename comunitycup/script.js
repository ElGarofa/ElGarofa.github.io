players=[]
coins=0
jugadorActual=null


missions=[

{name:"Starter",reward:20},

{name:"Gimnasio 1",reward:30},

{name:"Gimnasio 2",reward:40},

{name:"Gimnasio 3",reward:50},

{name:"Liga",reward:200}

]


actualizarMisiones()



function crearJugador(){

nombre=document.getElementById("nombreInput").value

foto=document.getElementById("fotoInput").value

tier=document.getElementById("tierInput").value


players.push({

nombre,

foto,

tier,

wins:0,

loses:0,

draws:0,

team:[]

})


actualizarLista()

}



function actualizarLista(){

div=document.getElementById("listaJugadores")

div.innerHTML=""


players.forEach((p,i)=>{


div.innerHTML+=`

<div class="playerCard"

onclick="abrirPerfil(${i})">

<img src="${p.foto}" class="avatar">

${p.nombre}

<br>

Tier ${p.tier}

</div>

`

})


}



function abrirPerfil(i){

jugadorActual=i

p=players[i]


document.getElementById("perfil").classList.remove("hidden")


document.getElementById("nombrePerfil").innerText=p.nombre

document.getElementById("fotoPerfil").src=p.foto


document.getElementById("wins").innerText=p.wins

document.getElementById("loses").innerText=p.loses

document.getElementById("draws").innerText=p.draws


mostrarTeam()

}



function cerrarPerfil(){

document.getElementById("perfil").classList.add("hidden")

}



function modificarEstadistica(tipo,v){

p=players[jugadorActual]

p[tipo]+=v

if(p[tipo]<0)p[tipo]=0

abrirPerfil(jugadorActual)

}



function mostrarTeam(){

div=document.getElementById("team")

div.innerHTML=""


p=players[jugadorActual]


p.team.forEach(pk=>{


div.innerHTML+=`

<div class="pokemonCard">

<img src="${pk.img}">

<br>

${pk.nombre}

</div>

`


})


}




function randomPokemon(){

id=Math.floor(Math.random()*898)+1


fetch("https://pokeapi.co/api/v2/pokemon/"+id)

.then(r=>r.json())

.then(data=>{


players[jugadorActual].team.push({

nombre:data.name,

img:data.sprites.front_default

})


mostrarTeam()

})

}



function agregarPokemonManual(){

nombre=prompt("Pokemon")


fetch("https://pokeapi.co/api/v2/pokemon/"+nombre)

.then(r=>r.json())

.then(data=>{


players[jugadorActual].team.push({

nombre:data.name,

img:data.sprites.front_default

})


mostrarTeam()

})

}




function actualizarMisiones(){

div=document.getElementById("missions")

missions.forEach((m,i)=>{


div.innerHTML+=`

<div class="mission">

${m.name}

<br>

${m.reward}

<br>

<button onclick="completar(${i})">

Completar

</button>

</div>

`


})


}



function completar(i){

coins+=missions[i].reward

document.getElementById("coins").innerText=coins

}



function comprar(precio){

if(coins>=precio){

coins-=precio

document.getElementById("coins").innerText=coins

alert("Comprado")

}

}