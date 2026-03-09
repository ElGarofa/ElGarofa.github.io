/* COUNTERS */

const counters = document.querySelectorAll(".counter")

counters.forEach(counter=>{

const update=()=>{

const target=+counter.dataset.target
const current=+counter.innerText

const inc=target/100

if(current<target){

counter.innerText=Math.ceil(current+inc)
setTimeout(update,20)

}else{

counter.innerText=target

}

}

update()

})

/* PLAYERS */

const players=[

{name:"Shadow",rank:"Leader",wins:120,mvp:30},
{name:"NeoBoost",rank:"Pro Player",wins:100,mvp:25},
{name:"LagHunter",rank:"Member",wins:80,mvp:12},
{name:"BoostX",rank:"Member",wins:70,mvp:10}

]

const container=document.getElementById("playersContainer")

players.forEach(p=>{

container.innerHTML+=`

<div class="player-card">

<h3>${p.name}</h3>
<p>${p.rank}</p>
<p>Wins: ${p.wins}</p>

</div>

`

})

/* RANKING */

const ranking=[...players].sort((a,b)=>b.wins-a.wins)

const table=document.getElementById("rankingTable")

ranking.forEach((p,i)=>{

table.innerHTML+=`

<tr>

<td>${i+1}</td>
<td>${p.name}</td>
<td>${p.wins}</td>
<td>${p.mvp}</td>

</tr>

`

})

/* PARTICLES */

particlesJS.load('particles-js','https://cdn.jsdelivr.net/gh/VincentGarreau/particles.js/particles.json')

/* MODE TOGGLE */

document.getElementById("modeToggle").onclick=()=>{

document.body.classList.toggle("neon")

}
function simulateMatch(){

let a = Math.floor(Math.random()*6)
let b = Math.floor(Math.random()*6)

document.getElementById("score").innerText =
a + " - " + b

}
const tournaments=[

{
name:"Clan Battle",
date:"10 Mar",
result:"Win"
},

{
name:"Rocket Cup",
date:"15 Mar",
result:"Pending"
}

]

const list=document.getElementById("tournamentList")

tournaments.forEach(t=>{

list.innerHTML+=`

<div class="tournament">

<h3>${t.name}</h3>
<p>${t.date}</p>
<p>${t.result}</p>

</div>

`

})