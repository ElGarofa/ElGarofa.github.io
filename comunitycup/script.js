let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];
let jugadorActual = null;
let sinocoins = Number(localStorage.getItem("sinocoins")) || 0;
let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

let misiones=[
  {nombre:"Derrotar Roark",coins:20,done:false},
  {nombre:"Derrotar Gardenia",coins:20,done:false},
  {nombre:"Derrotar Maylene",coins:20,done:false},
  {nombre:"Derrotar Wake",coins:20,done:false},
  {nombre:"Derrotar Fantina",coins:20,done:false},
  {nombre:"Derrotar Byron",coins:20,done:false},
  {nombre:"Derrotar Candice",coins:20,done:false},
  {nombre:"Derrotar Volkner",coins:20,done:false},
  {nombre:"Derrotar Rival",coins:15,done:false},
  {nombre:"Derrotar Equipo Galaxia",coins:15,done:false}
];

// Validar jugadores antiguos
jugadores = jugadores.map(j => ({
  nombre:j.nombre||"Sin nombre",
  tier:j.tier||"Beginner",
  img:j.img||"https://via.placeholder.com/80",
  wins:j.wins||0,
  loss:j.loss||0,
  muertes:j.muertes||0,
  equipo:j.equipo||[]
}));

actualizarPantalla();
mostrarMisiones();

// --- FUNCIONES ---
function guardar(){
  localStorage.setItem("jugadores",JSON.stringify(jugadores));
  localStorage.setItem("sinocoins",sinocoins);
  localStorage.setItem("inventario",JSON.stringify(inventario));
}

// Crear participante simplificado + foto
function crearParticipante(){
  const nombre = document.getElementById("nombreJugadorInput").value;
  const tier = document.getElementById("tierJugadorInput").value;
  const imgInput = document.getElementById("imgJugadorInput").value;

  if(!nombre) return;

  const img = imgInput || "https://via.placeholder.com/80";

  jugadores.push({nombre,tier,img,wins:0,loss:0,muertes:0,equipo:[]});

  document.getElementById("nombreJugadorInput").value = "";
  document.getElementById("imgJugadorInput").value = "";

  guardar();
  actualizarPantalla();
}

// Actualizar pantalla
function actualizarPantalla(){
  document.getElementById("sinocoins").innerText = sinocoins;
  let div=document.getElementById("participantes");
  div.innerHTML="";
  jugadores.forEach((j,i)=>{
    div.innerHTML+=`
      <div class="playerCard">
        <img src="${j.img}" class="playerImg">
        <h4>${j.nombre}</h4>
        Tier: ${j.tier}<br>
        Wins:${j.wins} Loss:${j.loss} Muertes:${j.muertes}<br>
        <button onclick="verJugador(${i})" class="btn-neon">Ver perfil</button>
      </div>`;
  });

  let inv=document.getElementById("inventario");
  inv.innerHTML="";
  inventario.forEach(x=>{ inv.innerHTML+=x+"<br>"; });
}

// Ver perfil
function verJugador(i){
  jugadorActual = i;
  let j = jugadores[i];

  // Perfil con edición stats
  document.getElementById("perfil").innerHTML = `
    <h3>${j.nombre}</h3>
    <img src="${j.img}" class="playerImg"><br>
    Tier: ${j.tier}<br>
    Wins: ${j.wins} <button onclick="modificarEstadistica('wins',1)">+</button> <button onclick="modificarEstadistica('wins',-1)">-</button><br>
    Loss: ${j.loss} <button onclick="modificarEstadistica('loss',1)">+</button> <button onclick="modificarEstadistica('loss',-1)">-</button><br>
    Muertes: ${j.muertes} <button onclick="modificarEstadistica('muertes',1)">+</button> <button onclick="modificarEstadistica('muertes',-1)">-</button><br>
  `;

  // Agregar Pokémon
  document.getElementById("perfilEdicion").innerHTML = `
    <input id="pokemonInputPerfil" placeholder="Nombre Pokémon">
    <button class="btn-neon" onclick="agregarPokemonPerfil()">Agregar Pokémon</button>
  `;

  mostrarEquipo();
}

// Modificar estadísticas
function modificarEstadistica(tipo,valor){
  if(jugadorActual===null) return;
  let j = jugadores[jugadorActual];
  j[tipo] = Math.max(0,j[tipo]+valor);
  guardar();
  verJugador(jugadorActual);
  actualizarPantalla();
}

// Agregar Pokémon al participante
function agregarPokemonPerfil(){
  if(jugadorActual===null) return;
  let nombre = document.getElementById("pokemonInputPerfil").value;
  if(!nombre) return;
  let j = jugadores[jugadorActual];
  if(j.equipo.length >= 6){ alert("Equipo lleno"); return; }
  let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${nombre.toLowerCase()}.png`;
  j.equipo.push({nombre,img});
  document.getElementById("pokemonInputPerfil").value = "";
  guardar();
  mostrarEquipo();
  actualizarPantalla();
}

// Mostrar equipo
function mostrarEquipo(){
  let div=document.getElementById("equipo");
  div.innerHTML="";
  if(jugadorActual===null) return;
  jugadores[jugadorActual].equipo.forEach(p=>{
    div.innerHTML+=`<div class="pokemonCard"><img src="${p.img}"><p>${p.nombre}</p></div>`;
  });
}

// Mostrar misiones
function mostrarMisiones(){
  let div=document.getElementById("misiones");
  div.innerHTML="";
  misiones.forEach((m,i)=>{
    div.innerHTML+=`
      <div class="mision">
        ${m.nombre}<br>
        ${m.coins} coins<br>
        <button onclick="completarMision(${i})" class="btn-neon">Completar</button>
      </div>
    `;
  });
}

// Completar misión
function completarMision(i){
  if(misiones[i].done) return;
  misiones[i].done=true;
  sinocoins += misiones[i].coins;
  guardar();
  actualizarPantalla();
}

// Comprar tienda
function comprar(nombre,costo){
  if(sinocoins<costo){ alert("No alcanza"); return; }
  sinocoins -= costo;
  inventario.push(nombre);
  guardar();
  actualizarPantalla();
}

// RANDOM POKEMON RUEDA
async function randomPokemon(){
  if(jugadorActual===null){ alert("Selecciona un jugador"); return; }
  if(sinocoins<50){ alert("Necesitas 50 coins"); return; }
  const j = jugadores[jugadorActual];
  if(j.equipo.length>=6){ alert("Equipo lleno"); return; }
  sinocoins -= 50;
  guardar();
  actualizarPantalla();

  const ruletaDiv = document.getElementById("pokemonRuleta");
  ruletaDiv.innerHTML = "";

  const totalGiros = 25;
  let delay = 20; // más rápido
  let finalPokemon = null;

  for(let i=0;i<totalGiros;i++){
    const id = Math.floor(Math.random()*493)+1;
    try{
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      const nombre = capitalizeFirstLetter(data.name);
      const img = data.sprites.other['official-artwork'].front_default;
      ruletaDiv.innerHTML = `<div class="pokemonCard"><img src="${img}"><p>${nombre}</p></div>`;
      if(i===totalGiros-1) finalPokemon = {nombre,img};
      await new Promise(r => setTimeout(r, delay));
      delay = Math.min(delay + 30, 350); // frenado progresivo
    }catch(e){ console.error(e); }
  }

  if(finalPokemon){
    j.equipo.push(finalPokemon);
    mostrarEquipo();
    guardar();
    actualizarPantalla();
    alert(`¡Has obtenido a ${finalPokemon.nombre}!`);
  }
}

function capitalizeFirstLetter(string){ return string.charAt(0).toUpperCase()+string.slice(1); }