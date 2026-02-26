let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];
let jugadorActual=null;
let sinocoins = Number(localStorage.getItem("sinocoins")) || 0;
let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

let misiones = JSON.parse(localStorage.getItem("misiones")) || [
 {nombre:"Roark",coins:20,done:false},
 {nombre:"Gardenia",coins:20,done:false},
 {nombre:"Maylene",coins:20,done:false},
 {nombre:"Wake",coins:20,done:false}
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

 participantes.innerHTML="";
 jugadores.forEach((j,i)=>{
  participantes.innerHTML+=`
  <div class="playerCard ${jugadorActual===i?"active":""}">
   <img src="${j.img}" class="playerImg"><br>
   <b>${j.nombre}</b><br>
   ${j.tier}<br>
   W:${j.wins} L:${j.loss}

   <div class="hoverActions">
    <button onclick="abrirPerfil(${i})">Perfil</button>
    <button onclick="agregarPokemon(${i})">+ Pokémon</button>
   </div>
  </div>`;
 });

 renderEquipo();
 renderMisiones();
 renderInventario();
}

function abrirPerfil(i){
 jugadorActual=i;
 let j=jugadores[i];

 perfilContenido.innerHTML=`
 <h2>${j.nombre}</h2>
 <img src="${j.img}" class="playerImg"><br><br>

 Wins ${j.wins}
 <button onclick="stat('wins',1)">+</button>
 <button onclick="stat('wins',-1)">-</button><br><br>

 Loss ${j.loss}
 <button onclick="stat('loss',1)">+</button>
 <button onclick="stat('loss',-1)">-</button><br><br>

 Muertes ${j.muertes}
 <button onclick="stat('muertes',1)">+</button>
 <button onclick="stat('muertes',-1)">-</button>
 `;

 panelPerfil.classList.add("open");
 render();
}

function cerrarPerfil(){
 panelPerfil.classList.remove("open");
 jugadorActual=null;
 render()
}

function stat(tipo,val){
 let j=jugadores[jugadorActual];
 j[tipo]=Math.max(0,j[tipo]+val);
 guardar();
 abrirPerfil(jugadorActual);
}

function agregarPokemon(i){
 jugadorActual=i;
 let nombre=prompt("Nombre Pokémon");
 if(!nombre)return;

 let j=jugadores[i];
 if(j.equipo.length>=6)return alert("Equipo lleno");

 let img=`https://img.pokemondb.net/artwork/large/${nombre.toLowerCase()}.jpg`;

 j.equipo.push({nombre,img});
 guardar();
 render();
}

function eliminarPokemon(index){
 jugadores[jugadorActual].equipo.splice(index,1);
 guardar();
 render();
}

function renderEquipo(){
 equipo.innerHTML="";
 if(jugadorActual===null)return;

 jugadores[jugadorActual].equipo.forEach((p,i)=>{
  equipo.innerHTML+=`
  <div class="pokemonCard">
   <img src="${p.img}">
   ${p.nombre}<br>
   <button onclick="eliminarPokemon(${i})">X</button>
  </div>`;
 });
}

function renderMisiones(){
 misiones.innerHTML="";
 misiones.forEach((m,i)=>{
  misiones.innerHTML+=`
  <div class="mision">
   ${m.nombre} (${m.coins})
   <button onclick="completar(${i})">
   ${m.done?"✔":"OK"}
   </button>
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

function renderInventario(){
 inventarioDiv.innerHTML="";
 inventario.forEach(x=>inventarioDiv.innerHTML+=x+"<br>");
}

render();