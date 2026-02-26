players=[]
selectedPlayer=null


/* MISIONES REALES */

missions=[

{name:"Lider Rocavelo",reward:50},
{name:"Lider Corazon",reward:50},
{name:"Lider Canal",reward:60},
{name:"Lider Pradera",reward:60},
{name:"Lider Puntaneva",reward:70},
{name:"Lider Marina",reward:70},
{name:"Lider Pirita",reward:80},
{name:"Lider Liga",reward:200},

{name:"Rival batalla 1",reward:30},
{name:"Rival batalla 2",reward:40},
{name:"Rival batalla final",reward:100},

{name:"Equipo villano base",reward:50},
{name:"Equipo villano jefe",reward:120}

]



/* TIENDA */

shop=[

{name:"Cambio habilidad",price:80},

{name:"Captura extra",price:120},

{name:"Cambio naturaleza",price:70},

{name:"Segunda oportunidad",price:200},

{name:"Revivir Pokemon",price:250},

{name:"MT gratis",price:60},

{name:"Objeto equipado",price:40},

{name:"Repetir ruta",price:150}

]



load()



function save(){

localStorage.setItem(

"torneo",

JSON.stringify(players)

)

}



function load(){

data=

JSON.parse(

localStorage.getItem("torneo")

)


if(data){

players=data

}


update()

updateMissions()

updateShop()

updateRanking()

}



/* JUGADOR */

function addPlayer(){

const nombre = document.getElementById("nombreJugadorInput").value;
  const tier = document.getElementById("tierJugadorInput").value;
  const imgInput = document.getElementById("imgJugadorInput").value;

  if(!nombre) return;

  const img = imgInput || "https://via.placeholder.com/80";


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




/* UPDATE */

function update(){

div=playersDiv

div.innerHTML=""

select.innerHTML=""


players.forEach((p,i)=>{


div.innerHTML+=`

<div class="playerCard tier${p.tier}"

onclick="openProfile(${i})">

<img src="${p.img}" class="avatar">

<h4>${p.name}</h4>

Coins ${p.coins}

Wins ${p.wins}

</div>

`


select.innerHTML+=

`<option value=${i}>
${p.name}
</option>`


})


updateRanking()

save()

}



/* PERFIL */

function openProfile(i){

selectedPlayer=i

p=players[i]


profile.innerHTML=`

<img src="${p.img}" class="avatarBig">

<h2>${p.name}</h2>

Tier ${p.tier}


<h3>

Coins ${p.coins}

</h3>


Victorias ${p.wins}

<button onclick="win()">+</button>


Derrotas ${p.loss}

<button onclick="lose()">+</button>


<h3>Equipo</h3>

${renderTeam(p)}


<h3>Cementerio</h3>

${renderDead(p)}


<h3>Progreso</h3>

${renderProgress(p)}


<h3>Historial</h3>

${renderLog(p)}

<button onclick="closeProfile()">

Volver

</button>

`

profile.classList.remove("hidden")

}



function closeProfile(){

profile.classList.add("hidden")

}



/* RANKING */

function updateRanking(){

rankDiv.innerHTML=""


sorted=

[...players]

.sort((a,b)=>b.wins-a.wins)


sorted.forEach(p=>{


rankDiv.innerHTML+=`

<div>

${p.name}

${p.wins}

</div>

`


})

}



/* MISIONES */

function updateMissions(){

missionsDiv.innerHTML=""


missions.forEach((m,i)=>{


missionsDiv.innerHTML+=`

<div class="mission">

${m.name}

${m.reward}

<select onchange="missionPlayer(${i},this.value)">

${playerOptions()}

</select>

</div>

`


})

}



function missionPlayer(m,i){

p=players[i]

p.coins+=missions[m].reward

p.log.push(

"Completo "+missions[m].name

)

save()

update()

}



/* SHOP */

function updateShop(){

shopDiv.innerHTML=""


shop.forEach((s,i)=>{


shopDiv.innerHTML+=`

<div class="shopItem">

${s.name}

${s.price}

<select onchange="buy(${i},this.value)">

${playerOptions()}

</select>

</div>

`


})

}



function buy(i,p){

pl=players[p]


if(pl.coins>=shop[i].price){

pl.coins-=shop[i].price

pl.log.push(

"Compro "+shop[i].name

)

save()

update()

}

}



/* TEAM */

function addPokemon(){

i=select.value

name=pokemon.value


fetch(

"https://pokeapi.co/api/v2/pokemon/"+name

)

.then(r=>r.json())

.then(d=>{


players[i].team.push({

name:name,

img:d.sprites.front_default,

type:d.types[0].type.name

})


save()

update()

})


}



function renderTeam(p){

html=""


p.team.forEach((pk,i)=>{


html+=`

<div class="pokemonCard">

<img src="${pk.img}">

${pk.name}

${pk.type}

<button onclick="kill(${i})">

X

</button>

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

p.log.push(

dead.name+" murio"

)

save()

openProfile(selectedPlayer)

}



/* DEAD */

function renderDead(p){

html=""


p.dead.forEach(pk=>{


html+=`

<div>

☠

<img src="${pk.img}" width=40>

${pk.name}

</div>

`

})


return html

}



/* PROGRESS */

function renderProgress(p){

return`

G1 ${p.progress.g1}

G2 ${p.progress.g2}

Liga ${p.progress.liga}

`

}



/* LOG */

function renderLog(p){

html=""

p.log.forEach(l=>{


html+=`

<div>

${l}

</div>

`

})


return html

}



/* HELPERS */

function playerOptions(){

html=""

players.forEach((p,i)=>{


html+=`

<option value=${i}>
${p.name}
</option>

`


})

return html

}