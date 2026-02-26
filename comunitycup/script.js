let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];
let jugadorActual = null;
let sinocoins = Number(localStorage.getItem("sinocoins")) || 0;
let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

let misiones = JSON.parse(localStorage.getItem("misiones")) || [
 {nombre:"Roark",coins:20,done:false},
 {nombre:"Gardenia",coins:20,done:false},
 {nombre:"Maylene",coins:20,done:false},
 {nombre:"Wake",coins:20,done:false},
 {nombre:"Fantina",coins:20,done:false},
 {nombre:"Byron",coins:20,done:false},
 {nombre:"Candice",coins:20,done:false},
 {nombre:"Volkner",coins:20,done:false}
];

let tiendaItems=[
 ["Cambio habilidad",40],
 ["Cambio naturaleza",40],
 ["Captura extra",60],
 ["Segunda oportunidad",80],
 ["Revivir Pokémon",100],
 ["Objeto gratis",30],
 ["Re-roll",50],
 ["Intento shiny",200]
];

function guardar(){
 localStorage.setItem("jugadores",JSON.stringify(jugadores));
 localStorage.setItem("sinocoins",sinocoins);
 localStorage.setItem("inventario",JSON.stringify(inventario));
 localStorage.setItem("misiones",JSON.stringify(misiones));
}

function crearParticipante(){
 let nombre=nombreJugadorInput.value;
 if(!nombre)return;

 jugadores.push({
  nombre,
  tier:tierJugadorInput.value,
  img:imgJugadorInput.value||"https://via.placeholder.com/80",
  wins:0,loss:0,muertes:0,equipo:[]
 });

 nombreJugadorInput.value="";
 imgJugadorInput.value="";
 guardar();
 render();
}

function render(){
 sinocoins.innerText=sinocoins;

 let div=participantes;
 div.innerHTML="";

 jugadores.forEach((j,i)=>{
  div.innerHTML+=`
  <div class="playerCard ${j.tier}">
    <img src="${j.img}" class="playerImg"><br>
    <b>${j.nombre}</b><br>
    ${j.tier}<br>
    W:${j.wins} L:${j.loss} ☠:${j.muertes}

    <div class="hoverActions">
      <button class="btn-neon" onclick="verJugador(${i})">Perfil</button>
      <button class="btn-neon" onclick="agregarPokemonPrompt(${i})">+ Pokémon</button>
    </div>
  </div>`;
 });

 inventarioDiv();
 ranking();
 misionesRender();
 tiendaRender();
}

function ranking(){
 let r=[...jugadores].sort((a,b)=>b.wins-a.wins);
 ranking.innerHTML=r.map((j,i)=>
  `#${i+1} ${j.nombre} — ${j.wins} wins`
 ).join("<br>");
}

function verJugador(i){
 jugadorActual=i;
 let j=jugadores[i];

 perfil.innerHTML=`
 <h3>${j.nombre}</h3>
 <img src="${j.img}" class="playerImg"><br>
 Wins ${j.wins}
 <button onclick="stat('wins',1)">+</button>
 <button onclick="stat('wins',-1)">-</button><br>
 Loss ${j.loss}
 <button onclick="stat('loss',1)">+</button>
 <button onclick="stat('loss',-1)">-</button><br>
 Muertes ${j.muertes}
 <button onclick="stat('muertes',1)">+</button>
 <button onclick="stat('muertes',-1)">-</button>
 `;

 mostrarEquipo();
}

function stat(tipo,v){
 let j=jugadores[jugadorActual];
 j[tipo]=Math.max(0,j[tipo]+v);
 guardar();
 render();
 verJugador(jugadorActual);
}

function agregarPokemonPrompt(i){
 jugadorActual=i;
 let nombre=prompt("Nombre Pokémon");
 if(!nombre)return;

 let j=jugadores[i];
 if(j.equipo.length>=6)return alert("Equipo lleno");

 let img=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${nombre.toLowerCase()}.png`;

 j.equipo.push({nombre,img});
 guardar();
 render();
}

function mostrarEquipo(){
 equipo.innerHTML="";
 if(jugadorActual===null)return;
 jugadores[jugadorActual].equipo.forEach(p=>{
  equipo.innerHTML+=`
  <div class="pokemonCard">
    <img src="${p.img}" width="110"><br>${p.nombre}
  </div>`;
 });
}

function misionesRender(){
 misiones.innerHTML="";
 misiones.forEach((m,i)=>{
  misiones.innerHTML+=`
   <div class="mision">
    ${m.nombre} — ${m.coins}
    <button onclick="completar(${i})">✔</button>
   </div>`;
 });
}

function completar(i){
 if(misiones[i].done)return;
 misiones[i].done=true;
 sinocoins+=misiones[i].coins;
 guardar();
 render();
}

function tiendaRender(){
 tienda.innerHTML="";
 tiendaItems.forEach(item=>{
  tienda.innerHTML+=`
   <button class="shopItem"
   onclick="comprar('${item[0]}',${item[1]})">
   ${item[0]} - ${item[1]}
   </button>`;
 });
}

function comprar(n,c){
 if(sinocoins<c)return alert("No coins");
 sinocoins-=c;
 inventario.push(n);
 guardar();
 render();
}

function inventarioDiv(){
 inventario.innerHTML="";
 inventario.forEach(i=>inventario.innerHTML+=i+"<br>");
}

async function randomPokemon(){
 if(jugadorActual===null)return alert("Selecciona jugador");
 if(sinocoins<50)return alert("Necesitas 50");

 let j=jugadores[jugadorActual];
 if(j.equipo.length>=6)return alert("Equipo lleno");

 sinocoins-=50;
 guardar();
 render();

 let box=pokemonRuleta;
 let final=null;

 for(let i=0;i<25;i++){
  let id=Math.floor(Math.random()*493)+1;
  let res=await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let data=await res.json();

  let shiny=Math.random()<1/4096;
  let img= shiny ? data.sprites.front_shiny :
   data.sprites.other["official-artwork"].front_default;

  box.innerHTML=`<div class="pokemonCard">
  <img src="${img}" width="120"><br>${data.name}
  ${shiny?"✨SHINY":""}
  </div>`;

  if(i===24)final={nombre:data.name,img};

  await new Promise(r=>setTimeout(r,60+i*10));
 }

 j.equipo.push(final);
 guardar();
 render();
 alert("Obtuviste "+final.nombre);
}

render();