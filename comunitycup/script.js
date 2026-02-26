players=[]
coins=0
selectedPlayer=null


missions=[

{name:"Capturar starter",reward:20},

{name:"Gimnasio 1",reward:30},

{name:"Gimnasio 2",reward:40},

{name:"Gimnasio 3",reward:50},

{name:"Gimnasio 4",reward:60},

{name:"Legendario",reward:150},

{name:"Sin muertes",reward:200},

{name:"Liga",reward:300},

{name:"Shiny",reward:250},

{name:"Equipo completo",reward:100}

]



/* GUARDADO */

load()


function save(){

localStorage.setItem(

"torneo",

JSON.stringify({

players:players,

coins:coins

})

)

}



function load(){

data=

JSON.parse(

localStorage.getItem("torneo")

)


if(data){

players=data.players

coins=data.coins

}


update()

updateCoins()

updateMissions()

}



/* PARTICIPANTES */

function addPlayer(){

name=

document.getElementById("name").value

tier=

document.getElementById("tier").value


players.push({

name:name,

tier:tier,

team:[]

})


save()

update()

}



/* UPDATE GENERAL */

function update(){


div=

document.getElementById("players")

div.innerHTML=""


select=

document.getElementById("playerSelect")

select.innerHTML=""


p1=

document.getElementById("player1")

p1.innerHTML=""


p2=

document.getElementById("player2")

p2.innerHTML=""


players.forEach((p,i)=>{


div.innerHTML+=`

<div class="playerCard"

onclick="openProfile(${i})">

<h4>${p.name}</h4>

<div class="smallText">

Tier ${p.tier}

</div>

<div class="team">

${renderTeam(p)}

</div>

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


save()

}



/* PERFIL */

function openProfile(i){

selectedPlayer=i

p=players[i]


profile=

document.getElementById("profile")


profile.innerHTML=`

<h2>${p.name}</h2>

<div class="smallText">

Tier ${p.tier}

</div>


<h3>Equipo</h3>


<div class="team">

${renderTeam(p)}

</div>


<button

class="btn btn-neon mt-3"

onclick="closeProfile()">

Volver

</button>

`


profile.classList.remove("hidden")

}



function closeProfile(){

document

.getElementById("profile")

.classList.add("hidden")

}



/* POKEMON */

function addPokemon(){

i=

document

.getElementById(

"playerSelect"

).value


pokemon=

document

.getElementById(

"pokemon"

).value

.toLowerCase()


if(players[i].team.length>=6){

alert("Maximo 6")

return

}


fetch(

"https://pokeapi.co/api/v2/pokemon/"+pokemon

)

.then(r=>r.json())

.then(data=>{


img=

data.sprites

.front_default


players[i].team.push({

name:pokemon,

img:img

})


save()

update()

})

}



/* RENDER TEAM */

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



/* MISIONES */

function updateMissions(){

div=

document.getElementById(

"missions"

)


if(!div)return


div.innerHTML=""


missions.forEach((m,i)=>{


div.innerHTML+=`

<div class="mission">

<h5>

${m.name}

</h5>


<div>

${m.reward}

Sinocoins

</div>


<button

class="btn btn-neon"

onclick="completeMission(${i})">

Completar

</button>

</div>

`


})


}



/* MISION */

function completeMission(i){

coins+=missions[i].reward

updateCoins()

save()

}



/* COINS */

function updateCoins(){

document

.getElementById("coins")

.innerText=coins

}



/* TRADE */

function tradeCoins(){

if(coins>=50){

coins-=50

updateCoins()

save()

alert("Trade hecho")

}

}