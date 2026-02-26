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



shopItems=[

{name:"Cambio habilidad",price:80},

{name:"Captura extra",price:100},

{name:"Cambio naturaleza",price:120},

{name:"Segunda oportunidad",price:200}

]



iniciar()



function iniciar(){

actualizarMisiones()

actualizarShop()

}



function crearJugador(){

players.push({

nombre:document.getElementById("nombreInput").value,

foto:document.getElementById("fotoInput").value,

tier:document.getElementById("tierInput").value,

wins:0,

loses:0,

draws:0,

team:[]

})

actualizarLista()

}



function actualizarLista(){

lista=document.getElementById("listaJugadores")

lista.innerHTML=""



players.forEach((p,i)=>{

lista.innerHTML+=`

<div class="playerCard"

onclick="abrirPerfil(${i})">

<img src="${p.foto}" width=50>

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


document.getElementById("perfil")
.classList.remove("hidden")


document.getElementById("nombrePerfil")
.innerText=p.nombre


document.getElementById("fotoPerfil")
.src=p.foto


document.getElementById("wins")
.innerText=p.wins


document.getElementById("loses")
.innerText=p.loses


document.getElementById("draws")
.innerText=p.draws


mostrarTeam()

}



function cerrarPerfil(){

document.getElementById("perfil")
.classList.add("hidden")

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




// RANDOM ANIMADO

function randomPokemonAnimado(){

box=document.getElementById("randomBox")

box.classList.remove("hidden")


loops=0


interval=setInterval(()=>{


id=Math.floor(Math.random()*898)+1


fetch("https://pokeapi.co/api/v2/pokemon/"+id)

.then(r=>r.json())

.then(data=>{


document.getElementById("randomImg")
.src=data.sprites.front_default


document.getElementById("randomName")
.innerText=data.name



if(loops>20){

clearInterval(interval)


players[jugadorActual].team.push({

nombre:data.name,

img:data.sprites.front_default

})


mostrarTeam()

}

loops++

})


},80)

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





// MISIONES

function actualizarMisiones(){

div=document.getElementById("missions")

div.innerHTML=""


missions.forEach((m,i)=>{


div.innerHTML+=`

<div class="mission">

${m.name}

<br>

💰 ${m.reward}

<br>

<button onclick="completar(${i})"
class="btn btn-neon">

Completar

</button>

</div>

`

})


}




function completar(i){

coins+=missions[i].reward


document.getElementById("coins")
.innerText=coins

}





// TIENDA

function actualizarShop(){

div=document.getElementById("shop")

div.innerHTML=""


shopItems.forEach(s=>{


div.innerHTML+=`

<div class="shopItem">

${s.name}

💰 ${s.price}


<button onclick="comprar(${s.price})"
class="btn btn-neon">

Comprar

</button>

</div>

`

})


}




function comprar(precio){

if(coins>=precio){

coins-=precio

document.getElementById("coins")
.innerText=coins

alert("Comprado")

}

}