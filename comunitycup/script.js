players=[]
coins=0
selectedPlayer=null


/* TIENDA */

shop=[

{name:"Cambio habilidad",price:80},

{name:"Captura extra",price:120},

{name:"Cambio naturaleza",price:70},

{name:"Segunda oportunidad",price:200},

{name:"Revivir Pokemon",price:250},

{name:"MT gratis",price:60},

{name:"Objeto equipado",price:40},

{name:"Repetir ruta",price:150},

{name:"Cambiar muerto",price:180},

{name:"Info rival",price:50}

]



/* MISIONES */

missions=[

{name:"Capturar Starter",reward:20},

{name:"Gimnasio 1",reward:30},

{name:"Gimnasio 2",reward:40},

{name:"Gimnasio 3",reward:50},

{name:"Gimnasio 4",reward:60},

{name:"Capturar Legendario",reward:150},

{name:"Equipo completo",reward:100},

{name:"Sin muertes",reward:200},

{name:"Liga Pokemon",reward:300},

{name:"Capturar Shiny",reward:250}

]



load()



/* GUARDAR */

function save(){

localStorage.setItem(

"torneo",

JSON.stringify({

players:players,

coins:coins

})

)

}



/* CARGAR */

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

updateShop()

updateMissions()

}



/* JUGADORES */

function addPlayer(){

name=document.getElementById("name").value

img=document.getElementById("image").value

tier=document.getElementById("tier").value


players.push({

name:name,

img:img,

tier:tier,

wins:0,

loss:0,

deaths:0,

team:[],

dead:[]

})


save()

update()

}



/* UPDATE GENERAL */

function update(){

div=document.getElementById("players")

div.innerHTML=""



select=document.getElementById("playerSelect")

select.innerHTML=""



players.forEach((p,i)=>{


div.innerHTML+=`

<div class="playerCard"

onclick="openProfile(${i})">

<img src="${p.img}" class="avatar">

<h4>${p.name}</h4>

<div class="smallText">

Tier ${p.tier}

</div>

</div>

`


select.innerHTML+=

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


profile=document.getElementById("profile")


profile.innerHTML=`

<img src="${p.img}" class="avatarBig">

<h2>${p.name}</h2>

<div>Tier ${p.tier}</div>


<h4>

Victorias ${p.wins}

</h4>

<button onclick="win()">+</button>


<h4>

Derrotas ${p.loss}

</h4>

<button onclick="lose()">+</button>


<h4>

Muertes ${p.deaths}

</h4>


<button onclick="death()">

+ muerte

</button>


<h3>Equipo</h3>

<div class="team">

${renderTeam(p)}

</div>


<h3>Cementerio</h3>

${renderDead(p)}


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



/* ESTADISTICAS */

function win(){

players[selectedPlayer].wins++

save()

openProfile(selectedPlayer)

}


function lose(){

players[selectedPlayer].loss++

save()

openProfile(selectedPlayer)

}


function death(){

players[selectedPlayer].deaths++

save()

openProfile(selectedPlayer)

}



/* POKEMON */

function addPokemon(){

i=document.getElementById("playerSelect").value

pokemon=document.getElementById("pokemon").value.toLowerCase()


if(players[i].team.length>=6){

alert("Maximo 6")

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


save()

update()

})

}



/* EQUIPO */

function renderTeam(player){

html=""

player.team.forEach((p,i)=>{


html+=`

<div class="pokemonCard">

<img src="${p.img}">

<div>

${p.name}

</div>

<button onclick="kill(${i})">

☠

</button>

</div>

`


})

return html

}



/* CEMENTERIO */

function renderDead(player){

html=""

player.dead.forEach(p=>{


html+=`

<div>

☠ ${p.name}

</div>

`


})

return html

}



function kill(i){

p=players[selectedPlayer]

dead=p.team.splice(i,1)[0]

p.dead.push(dead)

p.deaths++

save()

openProfile(selectedPlayer)

}



/* TIENDA */

function updateShop(){

div=document.getElementById("shop")

div.innerHTML=""


shop.forEach((s,i)=>{


div.innerHTML+=`

<div class="shopItem">

${s.name}

-

${s.price}

<button

onclick="buy(${i})"

class="btn btn-neon btn-sm">

Comprar

</button>

</div>

`

})

}



function buy(i){

if(coins>=shop[i].price){

coins-=shop[i].price

updateCoins()

save()

alert("Comprado")

}

}



/* MISIONES */

function updateMissions(){

div=document.getElementById("missions")

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

onclick="completeMission(${i})"

class="btn btn-neon">

Completar

</button>

</div>

`

})

}



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