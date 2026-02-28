
players=[]

coins=0

selected=null



misiones=[

["Gym1",30],

["Gym2",40],

["Gym3",50],

["Liga",200]

]


shop=[

["Cambio Naturaleza",50],

["Curar",30],

["Pokemon Random",30]

]



function crearJugador(){

p={

name:name.value,

tier:tier.value,

wins:0,

loss:0,

dead:0,

team:[],

img:"https://i.imgur.com/4AiXzf8.jpeg"

}

players.push(p)

renderPlayers()

}



function renderPlayers(){

playersDiv.innerHTML=""

players.forEach((p,i)=>{

d=document.createElement("div")

d.className="player"

d.innerHTML=p.name+"<br>"+p.tier

d.onclick=()=>perfil(i)

playersDiv.appendChild(d)

})

}



function perfil(i){

selected=i

p=players[i]

perfilNombre.innerHTML=p.name

perfilTier.innerHTML=p.tier

wins.innerHTML=p.wins

loss.innerHTML=p.loss

dead.innerHTML=p.dead

perfilFoto.src=p.img

renderTeam()

}



function renderTeam(){

team.innerHTML=""

p=players[selected]

p.team.forEach((pk,i)=>{

d=document.createElement("div")

d.className="pokemon"

d.innerHTML=`

<img src=${pk.img}>
<br>
${pk.name}
`

d.onclick=()=>{

p.team.splice(i,1)
renderTeam()

}

team.appendChild(d)

})

}



function sumar(tipo){

players[selected][tipo]++

perfil(selected)

}



function restar(tipo){

players[selected][tipo]--

perfil(selected)

}



async function randomPokemon(){

if(selected==null)return

p=players[selected]

if(p.team.length>=6)return


id=Math.floor(Math.random()*151)+1

r=await fetch(

"https://pokeapi.co/api/v2/pokemon/"+id

)

data=await r.json()


p.team.push({

name:data.name,

img:data.sprites.front_default

})

renderTeam()

}



function generarTorneo(){

bracket.innerHTML=""

players.forEach(p=>{

d=document.createElement("div")

d.innerHTML=p.name

bracket.appendChild(d)

})

}



function cargarMisiones(){

misiones.forEach(m=>{

d=document.createElement("div")

d.innerHTML=`

${m[0]} 🪙${m[1]}

<button onclick="ganar(${m[1]})">

Completar

</button>

`

missions.appendChild(d)

})

}



function cargarShop(){

shop.forEach(s=>{

d=document.createElement("div")

d.innerHTML=`

${s[0]} 🪙${s[1]}

<button onclick="comprar(${s[1]})">

Comprar

</button>

`

shopDiv.appendChild(d)

})

}



function ganar(c){

coins+=c

coinsText()

}



function comprar(c){

if(coins<c)return

coins-=c

coinsText()

}



function coinsText(){

coins.innerHTML="🪙 "+coins

}



cargarMisiones()

cargarShop()

coinsText()
