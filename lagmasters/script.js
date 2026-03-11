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

{name:"LMS Benja",wins:120},
{name:"LMS Camavinga",wins:80},
{name:"LMS Lywerd",wins:150},
{name:"LMS ElGarofa",wins:60}

]

const ranking=[...players].sort((a,b)=>b.wins-a.wins)

const container=document.getElementById("rankingTable")

ranking.forEach((p,i)=>{

container.innerHTML+=`

<div class="rankCard">

<span>#${i+1}</span>

<span>${p.name}</span>

<span>${p.wins} wins</span>

</div>

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

fetch("data/players.json")
.then(res=>res.json())
.then(players=>{

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

})
const sections=document.querySelectorAll("section")

window.addEventListener("scroll",()=>{

sections.forEach(sec=>{

const top=sec.getBoundingClientRect().top

if(top<window.innerHeight-100){

sec.classList.add("show")

}

})

})

document.querySelectorAll("nav a").forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault()

document.querySelector(this.getAttribute("href"))
.scrollIntoView({

behavior:"smooth"

})

})

})
function counter(el,target){

let count=0

let interval=setInterval(()=>{

count++

el.innerText=count

if(count>=target){

clearInterval(interval)

}

},20)

}