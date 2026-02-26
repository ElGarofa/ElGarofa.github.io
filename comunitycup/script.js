// ===== DATOS =====

let jugadores =
JSON.parse(localStorage.getItem("jugadores")) || []

let datos =
JSON.parse(localStorage.getItem("datos")) || {}



// ===== GUARDAR =====

function guardar(){

localStorage.setItem(
"jugadores",
JSON.stringify(jugadores)
)

localStorage.setItem(
"datos",
JSON.stringify(datos)
)

}



// ===== AGREGAR JUGADOR =====

function agregar(){

let nombre =
document.getElementById("nombre").value

if(!nombre) return

if(jugadores.includes(nombre)) return


jugadores.push(nombre)

datos[nombre]={

wins:0,
loss:0,
muertes:0,
trofeos:0,
equipo:[]

}


guardar()

mostrar()

}



// ===== MOSTRAR =====

function mostrar(){

let lista =
document.getElementById("lista")

if(!lista) return


lista.innerHTML=""


jugadores.forEach(j=>{

let d = datos[j]

let muerto =
d.muertes>=6 ? "dead":""



lista.innerHTML+=`

<div class="player ${muerto}">

<h5>${j}</h5>

Wins: ${d.wins}<br>
Loss: ${d.loss}<br>
Muertes: ${d.muertes}<br>
Trofeos: ${d.trofeos}

<br><br>


<input
placeholder="Pokemon"
id="poke${j}">


<button
onclick="agregarPokemon('${j}')"
class="btn btn-warning btn-sm">

Agregar

</button>


<div class="team">

${dibujarEquipo(j)}

</div>


<br>


<button
onclick="muerte('${j}')"
class="btn btn-danger btn-sm">

+ muerte

</button>


<button
onclick="trofeo('${j}')"
class="btn btn-success btn-sm">

+ trofeo

</button>


</div>

`

})


campeon()

stats()

mvp()

}



// ===== DIBUJAR EQUIPO =====

function dibujarEquipo(j){

let html=""

datos[j].equipo.forEach(p=>{

html+=`

<div class="pokeCard">

<img src="${p.img}">

<br>

${p.nombre}

<br>

<button
onclick="borrarPokemon('${j}','${p.nombre}')">

X

</button>

</div>

`

})

return html

}



// ===== AGREGAR POKEMON =====

function agregarPokemon(j){

let nombre =
document.getElementById(
"poke"+j
).value.toLowerCase()

if(!nombre) return


if(datos[j].equipo.length>=6){

alert("Equipo lleno")

return

}



fetch(
"https://pokeapi.co/api/v2/pokemon/"+nombre
)

.then(r=>r.json())

.then(data=>{

let img =
data.sprites.front_default


datos[j].equipo.push({

nombre:nombre,
img:img

})


guardar()

mostrar()

})


.catch(()=>{

alert("Pokemon no encontrado")

})

}



// ===== BORRAR POKEMON =====

function borrarPokemon(j,poke){

datos[j].equipo=
datos[j].equipo.filter(

x=>x.nombre!=poke

)

guardar()

mostrar()

}



// ===== MUERTES =====

function muerte(j){

datos[j].muertes++

guardar()

mostrar()

}



// ===== TROFEOS =====

function trofeo(j){

datos[j].trofeos++

guardar()

mostrar()

}



// ===== BRACKET =====

function generarBracket(){

let div =
document.getElementById("bracket")

if(!div) return


div.innerHTML=""


let vivos =
jugadores.filter(j=>
datos[j].muertes<6
)



for(let i=0;i<vivos.length;i+=2){

let a=vivos[i]
let b=vivos[i+1]

if(!b) continue


div.innerHTML+=`

<div class="card m-2">

<h4>

${a} ⚔️ ${b}

</h4>


<button
onclick="ganar('${a}','${b}')"
class="btn btn-success">

${a}

</button>


<button
onclick="ganar('${b}','${a}')"
class="btn btn-success">

${b}

</button>

</div>

`

}

}



// ===== GANADOR =====

function ganar(a,b){

datos[a].wins++

datos[b].loss++

guardar()

mostrar()

}



// ===== CAMPEON =====

function campeon(){

let div=
document.getElementById("campeon")

if(!div) return


let vivos=

jugadores.filter(j=>
datos[j].muertes<6
)


if(vivos.length==1){

div.innerHTML=`

<div class="champion">

🏆 ${vivos[0]}

</div>

`

}

else{

div.innerHTML="Torneo en progreso"

}

}



// ===== STATS =====

function stats(){

let div=
document.getElementById("stats")

if(!div) return


div.innerHTML=""


jugadores.forEach(j=>{

let d=datos[j]


let progreso=

(6-d.muertes)/6*100


div.innerHTML+=`

<div class="card m-2">

<h4>${j}</h4>

Victorias:

${d.wins}

<br>

Muertes:

${d.muertes}

<br>


<div class="progress">

<div
class="progress-bar"
style="width:${progreso}%">

</div>

</div>


</div>

`

})

}



// ===== MVP =====

function mvp(){

let mejor=null
let max=-1


jugadores.forEach(j=>{

if(datos[j].wins>max){

max=datos[j].wins
mejor=j

}

})


let div=
document.getElementById("mvp")

if(!div) return


div.innerHTML=`

⭐ MVP:

${mejor}

`

}



// ===== RESET =====

function resetear(){

localStorage.clear()

location.reload()

}



// ===== INICIO =====

mostrar()