let coins = parseInt(localStorage.getItem("coins")) || 0

function guardar(){
localStorage.setItem("coins", coins)
}

function actualizarCoins(){
let el=document.getElementById("coins")
if(el) el.innerText=coins
guardar()
}

function sumarCoins(n){
coins+=n
actualizarCoins()
popup("+"+n+" monedas 💰")
}

function gastarCoins(n){
if(coins<n){
popup("No tienes monedas ❌")
return false
}
coins-=n
actualizarCoins()
return true
}

function popup(text,img=null){
let p=document.createElement("div")
p.className="popup"

p.innerHTML=`
<div class="popup-box">
${img?`<img src="${img}">`:""}
<h3>${text}</h3>
</div>
`

document.body.appendChild(p)
setTimeout(()=>p.remove(),2000)
}