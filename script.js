// Inicializa Supabase
const supabase = supabase.createClient(
  "https://ecwxcwiclbsxxkdltttm.supabase.co",
  "tu_api_key"
);

// Cargar jugadores desde Supabase
async function loadPlayers() {
  const { data, error } = await supabase.from('players').select('*');
  if (error) {
    console.error("Error cargando jugadores:", error);
    return;
  }
  players = data || [];  // Si no hay jugadores, iniciamos un arreglo vacío
  renderPlayers();
}

// Guardar jugadores en Supabase
async function savePlayers() {
  const { data, error } = await supabase.from('players').upsert(players);
  if (error) {
    console.error("Error guardando jugadores:", error);
    return;
  }
}

// Renderizar jugadores en la página
function renderPlayers() {
  const container = document.getElementById("participants-list");
  if (!container) return;
  container.innerHTML = "";  // Limpiar lista actual

  // Ordenar por puntos descendentes
  players.sort((a, b) => b.points - a.points);

  players.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "card participant-card p-2 mb-2 d-flex flex-md-row flex-column align-items-center justify-content-between";

    div.innerHTML = `
      <div class="d-flex align-items-center mb-2 mb-md-0">
        <img src="${p.img}" alt="${p.name}" class="avatar me-3" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
        <strong>${index + 1}. ${p.name}</strong>
      </div>
      <div>
        <span id="points-${p.name}" class="me-2">${p.points}</span> pts
        <button class="btn btn-sm btn-primary me-1" onclick="changePoints('${p.name}', 1)">+1</button>
        <button class="btn btn-sm btn-danger" onclick="changePoints('${p.name}', -1)">-1</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// Cambiar puntos de un jugador
function changePoints(name, delta) {
  const player = players.find(p => p.name === name);
  if (!player) return;

  player.points = Math.max(0, player.points + delta);
  const action = delta > 0 ? "gana" : "pierde";
  const cantidad = Math.abs(delta);
  addEvent(`${name} ${action} ${cantidad} punto(s).`);

  savePlayers();
  renderPlayers();
}

// Agregar un nuevo jugador
async function addNewPlayer() {
  const nameInput = document.getElementById("new-player-name");
  const imgInput = document.getElementById("new-player-img");

  const name = nameInput.value.trim();
  const img = imgInput.value.trim() || "img/default.png";

  if (!name) return alert("El nombre no puede estar vacío.");
  if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    return alert("Ese jugador ya existe.");
  }

  const newPlayer = { name, points: 0, img };
  players.push(newPlayer);

  // Guardar el nuevo jugador en Supabase
  await savePlayers();
  addEvent(`Nuevo jugador: ${name}`);

  nameInput.value = "";
  imgInput.value = "";

  renderPlayers();
}

// Función para mostrar los eventos
function addEvent(msg) {
  const time = new Date().toLocaleTimeString();
  const logEntry = `[${time}] ${msg}`;
  eventLog.unshift(logEntry);

  const logBox = document.getElementById("event-log");
  if (logBox) {
    logBox.innerHTML = eventLog.map(e => `<div>${e}</div>`).join('');
  }
}

// Cargar jugadores cuando la página se haya cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  loadPlayers();
});
