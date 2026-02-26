players=[]

coins=0



missions=[

{name:"Capturar starter",
reward:20},

{name:"Vencer gimnasio 1",
reward:30},

{name:"Vencer gimnasio 2",
reward:40},

{name:"Vencer gimnasio 3",
reward:50},

{name:"Capturar legendario",
reward:150},

{name:"Sin muertes",
reward:200},

{name:"Vencer liga",
reward:300},

{name:"Capturar shiny",
reward:250},

{name:"Equipo completo",
reward:100},

{name:"Intercambio",
reward:80}

]



updateMissions()



function addPlayer(){

name=document.getElementById("name").value

tier=document.getElementById("tier").value


player={

name:name,

tier:tier,

team:[]

}


players.push(player)

update()

}



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

<h4>${p.name}</h4>

<div class="smallText">

Tier ${p.tier}

</div>


<div>

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

}



function addPokemon(){

i=document.getElementById("playerSelect").value

pokemon=document.getElementById("pokemon").value.toLowerCase()


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




function completeMission(i){

coins+=missions[i].reward

document.getElementById("coins").innerText=coins

}




function tradeCoins(){

p1=document.getElementById("player1").value
p2=document.getElementById("player2").value


if(coins>=50){

coins-=50

document.getElementById("coins").innerText=coins

alert("Intercambio hecho")

}

}