players = []
coins = 0
currentPlayer = null


missions=[

{name:"Vencer Gimnasio 1",reward:30},
{name:"Vencer Gimnasio 2",reward:40},
{name:"Vencer Gimnasio 3",reward:50},
{name:"Vencer Gimnasio 4",reward:60},
{name:"Vencer Rival",reward:40},
{name:"Vencer Equipo Galaxia",reward:50},
{name:"Capturar Shiny",reward:200},
{name:"Equipo Completo",reward:100},
{name:"Sin muertes",reward:150},
{name:"Vencer Liga",reward:300}

]


updateMissions()


// CREAR JUGADOR

function addPlayer(){

name=document.getElementById("name").value
tier=document.getElementById("tier").value

img=prompt("URL imagen jugador (opcional)")

if(!img)
img="https://via.placeholder.com/100"


player={

name:name,
tier:tier,
img:img,

wins:0,
loss:0,
deaths:0,

team:[]

}

players.push(player)

update()

}



// ACTUALIZAR

function update(){

playersDiv=document.getElementById("players")
playersDiv.innerHTML=""

select=document.getElementById("playerSelect")
select.innerHTML=""

p1=document.getElementById("player1")
p1.innerHTML=""

p2=document.getElementById("player2")
p2.innerHTML=""



players.forEach((p,i)=>{


playersDiv.innerHTML+=`

<div class="playerCard">

<img src="${p.img}" class="avatar">

<h4>${p.name}</h4>

<div class="smallText">

Tier ${p.tier}

</div>

<div>

Wins ${p.wins}
<button onclick="stat(${i},'wins',1)">+</button>
<button onclick="stat(${i},'wins',-1)">-</button>

<br>

Loss ${p.loss}
<button onclick="stat(${i},'loss',1)">+</button>
<button onclick="stat(${i},'loss',-1)">-</button>

<br>

Muertes ${p.deaths}
<button onclick="stat(${i},'deaths',1)">+</button>
<button onclick="stat(${i},'deaths',-1)">-</button>

</div>

<div class="team">

${renderTeam(p)}

</div>

<button
class="btn btn-neon w-100 mt-2"
onclick="randomPokemon(${i})">

Pokemon Random (50)

</button>

</div>

`


select.innerHTML+=

`<option value=${i}>
${p.name}
</option>`


p1.innerHTML+=

`<option value=${i}>
${p.name}
</option>`


p2.innerHTML+=

`<option value=${i}>
${p.name}
</option>`


})



document.getElementById("coins").innerText=coins

}



// STATS

function stat(i,type,value){

players[i][type]+=value

if(players[i][type]<0)
players[i][type]=0

update()

}




// AGREGAR POKEMON NORMAL

function addPokemon(){

i=document.getElementById("playerSelect").value

pokemon=document.getElementById("pokemon").value.toLowerCase()

if(players[i].team.length>=6){

alert("Equipo lleno")

return

}



fetch(

"https://pokeapi.co/api/v2/pokemon/"+pokemon

)

.then(r=>r.json())

.then(data=>{


img=data.sprites.front_default


players[i].team.push({

name:pokemon,
img:img

})


update()

})

}




// RANDOM POKEMON

async function randomPokemon(i){

if(coins<50){

alert("No tienes coins")

return

}


if(players[i].team.length>=6){

alert("Equipo lleno")

return

}


coins-=50

update()


card=document.querySelectorAll(".playerCard")[i]


ruleta=document.createElement("div")

card.appendChild(ruleta)



delay=30


for(x=0;x<20;x++){

id=Math.floor(Math.random()*493)+1


res=await fetch(

"https://pokeapi.co/api/v2/pokemon/"+id

)

data=await res.json()


ruleta.innerHTML=`

<div class="pokemonCard">

<img src="${data.sprites.front_default}">

${data.name}

</div>

`


await new Promise(r=>setTimeout(r,delay))

delay+=20

}



players[i].team.push({

name:data.name,
img:data.sprites.front_default

})


update()

}




// RENDER TEAM

function renderTeam(player){

html=""

player.team.forEach(p=>{

html+=`

<div class="pokemonCard">

<img src="${p.img}">

<div>

${p.name}

</div>

</div>

`

})

return html

}





// MISIONES

function updateMissions(){

div=document.getElementById("missions")

if(!div)return

div.innerHTML=""



missions.forEach((m,i)=>{


div.innerHTML+=`

<div class="mission">

<h5>

${m.name}

</h5>

<div>

Recompensa:

${m.reward}

</div>

<button onclick="completeMission(${i})"
class="btn btn-neon">

Completar

</button>

</div>

`


})


}



// COMPLETAR MISION

function completeMission(i){

coins+=missions[i].reward

update()

}




// INTERCAMBIO

function tradeCoins(){

p1=document.getElementById("player1").value
p2=document.getElementById("player2").value


if(coins>=50){

coins-=50

update()

alert("Intercambio hecho")

}

}