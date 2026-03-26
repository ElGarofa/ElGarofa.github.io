let state = JSON.parse(localStorage.getItem("therianState")) || {
xp:0,
nivel:1,
matches:[],
likesEnviados:[],
likesRecibidos:[],
chats:{}
}

function saveState(){
localStorage.setItem("therianState",JSON.stringify(state))
}

/* USUARIOS */
let usuarios=[
{id:1,nombre:"Luna",tipo:"Lobo 🌙",img:"https://picsum.photos/400/600?1"},
{id:2,nombre:"Kai",tipo:"Zorro 🦊",img:"https://picsum.photos/400/600?2"},
{id:3,nombre:"Nova",tipo:"Gato 🐱",img:"https://picsum.photos/400/600?3"}
]

let currentIndex=0
const app=document.getElementById("app")

/* NAV */
function navigate(v){
if(v==="inicio") renderInicio()
if(v==="matches") renderMatches()
if(v==="perfil") renderPerfil()
}

/* SWIPE + MATCH */
function swipe(like){

let user=usuarios[currentIndex]
if(!user) return

if(like){

state.likesEnviados.push(user.id)

/* simulación match */
if(Math.random()>0.5){
state.likesRecibidos.push(user.id)
}

/* match real */
if(state.likesRecibidos.includes(user.id)){

state.matches.push(user)
state.chats[user.id]=[]

alert("MATCH con "+user.nombre+" ❤️")

}

state.xp+=10
if(state.xp>=100){
state.nivel++
state.xp=0
}

}

currentIndex++
saveState()
renderInicio()

}

/* INICIO */
function renderInicio(){

let user=usuarios[currentIndex]

if(!user){
app.innerHTML="<div class='header'>No hay más perfiles</div>"
return
}

app.innerHTML=`
<div class="header">Explorar</div>

<div class="card-stack">
<div class="card-perfil">
<img src="${user.img}">
<div class="card-overlay">
<h4>${user.nombre}</h4>
<p>${user.tipo}</p>
</div>
</div>
</div>

<div class="swipe-buttons">
<button class="swipe-btn dislike" onclick="swipe(false)">❌</button>
<button class="swipe-btn like" onclick="swipe(true)">❤️</button>
</div>
`
}

/* MATCHES */
function renderMatches(){

app.innerHTML=`
<div class="header">Matches</div>

<div style="padding:10px">

${state.matches.length===0?"No hay matches":
state.matches.map(m=>`
<div class="card p-2 mb-2 bg-dark text-white">
<b>${m.nombre}</b>
<button onclick="abrirChat(${m.id})">Chat</button>
</div>
`).join("")}

</div>
`
}

/* CHAT */
function abrirChat(id){

let match=state.matches.find(m=>m.id===id)

app.innerHTML=`
<div class="header">${match.nombre}</div>

<div id="chatBox" class="chat-box"></div>

<div class="chat-input">
<input id="msg">
<button onclick="enviarMensaje(${id})">➤</button>
</div>
`

renderMensajes(id)

}

function enviarMensaje(id){

let input=document.getElementById("msg")
let texto=input.value
if(!texto) return

state.chats[id].push({texto,mio:true})

/* respuesta fake */
setTimeout(()=>{
state.chats[id].push({texto:"Hola 😎",mio:false})
saveState()
renderMensajes(id)
},800)

input.value=""
saveState()
renderMensajes(id)

}

function renderMensajes(id){

let box=document.getElementById("chatBox")

box.innerHTML=state.chats[id].map(m=>`
<div class="msg ${m.mio?"mio":"otro"}">${m.texto}</div>
`).join("")

box.scrollTop=box.scrollHeight

}

/* PERFIL */
function renderPerfil(){
app.innerHTML=`
<div class="header">Perfil</div>
<div style="padding:20px">
<p>Nivel: ${state.nivel}</p>
<p>XP: ${state.xp}</p>
</div>
`
}

/* INIT */
renderInicio()