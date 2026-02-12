// ================= USER =================

function getUsuario(){
 return JSON.parse(localStorage.getItem("usuarioMatch")) || {
  nombre:"Invitado",
  edadMax:35,
  distanciaMax:50,
  soloOnline:false,
  likesDados:[],
  matches:[],
  monedas:100,
  premium:false,
  superLikes:3
 };
}

function guardarUsuario(u){
 localStorage.setItem("usuarioMatch",JSON.stringify(u));
}

let usuario = getUsuario();

// ================= PERFILES =================

const perfiles=[
 {id:1,nombre:"Sofía",edad:22,online:true,distancia:5,
  intereses:["gym","música"],
  foto:"https://randomuser.me/api/portraits/women/44.jpg"},
 {id:2,nombre:"Lucía",edad:25,online:false,distancia:10,
  intereses:["cine","arte"],
  foto:"https://randomuser.me/api/portraits/women/65.jpg"}
];

let indice=0;

// ================= MOSTRAR PERFIL =================

function mostrarPerfil(){
 const container=document.getElementById("card-container");
 if(!container) return;

 const p=perfiles[indice%perfiles.length];

 container.innerHTML=`
  <div class="card card-profile bg-dark text-light shadow rounded-4">
   <img src="${p.foto}">
   <div class="card-body">
    <h4>${p.nombre}, ${p.edad}</h4>
    <p>${p.online?"🟢 Online":"⚫ Offline"}</p>
   </div>
  </div>
 `;
 activarSwipe();
}

// ================= LIKE / DISLIKE =================

function like(){
 usuario.likesDados.push(perfiles[indice].nombre);
 usuario.monedas+=10;
 guardarUsuario(usuario);
 indice++;
 mostrarPerfil();
}

function dislike(){
 indice++;
 mostrarPerfil();
}

function superLike(){
 if(usuario.superLikes>0){
   usuario.superLikes--;
   usuario.monedas+=20;
   guardarUsuario(usuario);
   indice++;
   mostrarPerfil();
 }
}

function activarBoost(){
 usuario.monedas-=50;
 guardarUsuario(usuario);
 alert("Boost activado 🚀");
}

// ================= PREMIUM =================

function comprarPremium(){
 if(usuario.monedas>=200){
   usuario.monedas-=200;
   usuario.premium=true;
   guardarUsuario(usuario);
   alert("Ahora sos Premium 💎");
 }
}

// ================= IA CONSEJOS =================

function consejosIA(){
 let c=[];
 if(usuario.likesDados.length<3) c.push("Usá más likes.");
 if(!usuario.premium) c.push("Premium aumenta matches.");
 return c;
}

// ================= SWIPE =================

function activarSwipe(){
 const card=document.querySelector(".card-profile");
 if(!card) return;

 let startX=0;

 card.addEventListener("mousedown",e=>{
  startX=e.clientX;
 });

 card.addEventListener("mouseup",e=>{
  let diff=e.clientX-startX;
  if(diff>100) like();
  if(diff<-100) dislike();
 });
}

// ================= INIT =================

document.addEventListener("DOMContentLoaded",()=>{
 mostrarPerfil();
});
