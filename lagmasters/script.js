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
// Lista de miembros con sus IDs de Epic
const clanMembers = [
    { name: "Marcos", rank: "Platino", epicId: "LMS ElGarofa", img: "img/auto1.png", rankImg: "img/Platino.png" },
    { name: "Benja", rank: "Platino", epicId: "LMS Benja", img: "img/auto2.png", rankImg: "img/Platino.png" },
    { name: "Lywerd", rank: "Diamante", epicId: "LMS Lywerd", img: "img/auto3.png", rankImg: "img/Diamante.png" }
];

const membersContainer = document.querySelector(".members-container");
const searchInput = document.getElementById("memberSearch");

// Función para renderizar miembros
function displayMembers(filter = "") {
    membersContainer.innerHTML = "";
    const filtered = clanMembers.filter(m => 
        m.name.toLowerCase().includes(filter.toLowerCase()) || 
        m.rank.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(m => {
        membersContainer.innerHTML += `
            <div class="member-card rank-${m.rank.toLowerCase()}">
                <img src="${m.rankImg}" class="rank">
                <img src="${m.img}" class="car">
                <h3>LMS | ${m.name}</h3>
                <button class="copy-btn" onclick="copyId('${m.epicId}')">
                    ID: ${m.epicId} 📋
                </button>
            </div>
        `;
    });
}

// Función para copiar ID
function copyId(id) {
    navigator.clipboard.writeText(id);
    alert("ID Copiada: " + id);
}

// Escuchar el buscador
searchInput?.addEventListener("input", (e) => displayMembers(e.target.value));

// Inicializar
displayMembers();

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
// Función para detectar el scroll y mostrar secciones
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Validación simple del formulario de torneo
document.querySelector('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("¡Inscripción enviada! Nos vemos en la arena.");
});