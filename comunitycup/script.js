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


shop=[

{name:"Cambio habilidad",price:80},

{name:"Captura extra",price:100},

{name:"Cambio naturaleza",price:120},

{name:"Segunda oportunidad",price:200}

]


actualizarMisiones()
actualizarShop()



function crearJugador(){

players.push({

nombre:nombreInput.value,

foto:fotoInput.value,

tier:tierInput.value,

wins:0,

loses:0,

draws:0,

team:[]

})

actualizarLista()

}



function actualizarLista(){

listaJugadores.innerHTML=""


players.forEach((p,i)=>{


listaJugadores.innerHTML+=`

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

perfil.classList.remove("hidden")

nombrePerfil.innerText=p.nombre

fotoPerfil.src=p.foto

wins.innerText=p.wins

loses.innerText=p.loses

draws.innerText=p.draws

mostrarTeam()

}



function cerrarPerfil(){

perfil.classList.add("hidden")

}



function modificarEstadistica(tipo,v){

p=players[jugadorActual]

p[tipo]+=v

if(p[tipo]<0)p[tipo]=0

abrirPerfil(jugadorActual)

}



function mostrarTeam(){

team.innerHTML=""

p=players[jugadorActual]


p.team.forEach(pk=>{


team.innerHTML+=`

<div class="pokemonCard">

<img src="${pk.img}">

<br>

${pk.nombre}

</div>

`

})


}



function randomPokemonAnimado(){

randomBox.classList.remove("hidden")

speed=50

loops=0


interval=setInterval(()=>{


id=Math.floor(Math.random()*898)+1


fetch("https://pokeapi.co/api/v2/pokemon/"+id)

.then(r=>r.json())

.then(data=>{


randomImg.src=data.sprites.front_default

randomName.innerText=data.name


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


},speed)


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

missions.forEach((m,i)=>{


missionsDiv.innerHTML+=`

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

coins.innerText=coins

}



function actualizarShop(){

shop.forEach(s=>{


shop.innerHTML+=`

<div class="shopItem">

${s.name}

${s.price}

<button onclick="comprar(${s.price})">

Comprar

</button>

</div>

`


})


}



function comprar(precio){

if(coins>=precio){

coins-=precio

coins.innerText=coins

alert("Comprado")

}

}