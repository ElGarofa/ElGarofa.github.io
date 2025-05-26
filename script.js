let players = [];
const eventLog = [];

// Supabase config
const supabaseUrl = 'https://ecwxcwiclbsxxkdltttm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjd3hjd2ljbGJzeHhrZGx0dHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzI4NTAsImV4cCI6MjA2MjgwODg1MH0.CzzF1lrCOJI3M40KuC9RInjjbbSqcAy28LAzy5K26bU'; // ← Pega aquí tu clave pública anon
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function loadPlayersFromSupabase() {
  const { data, error } = await supabaseClient.from('players').select('*');
  if (error) {
    console.error("Error al cargar jugadores:", error);
    return;
  }
  players = data;
  renderPlayers();
  updateChart();
}

async function savePlayerToSupabase(player) {
  const { error } = await supabaseClient
    .from('players')
    .upsert(player, { onConflict: ['name'] });

  if (error) {
    console.error(`Error al guardar a ${player.name}:`, error);
  }
}


function renderPlayers() {
  const container = document.getElementById("participants-list");
  if (!container) return;
  container.innerHTML = "";

  players.sort((a, b) => b.point - a.point);

  players.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "card participant-card p-2 mb-2 d-flex flex-md-row flex-column align-items-center justify-content-between";

    div.innerHTML = `
      <div class="d-flex align-items-center mb-2 mb-md-0">
        <img src="${p.img}" alt="${p.name}" class="avatar me-3" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
        <strong>${index + 1}. ${p.name}</strong>
      </div>
      <div>
        <span id="points-${p.name}" class="me-2">${p.point}</span> pts
        <button class="btn btn-sm btn-primary me-1" onclick="changePoints('${p.name}', 1)">+1</button>
        <button class="btn btn-sm btn-danger" onclick="changePoints('${p.name}', -1)">-1</button>
      </div>
    `;
    container.appendChild(div);
  });
}

async function changePoints(name, delta) {
  const player = players.find(p => p.name === name);
  if (!player) return;

  player.point = Math.max(0, player.point + delta);
  const action = delta > 0 ? "gana" : "pierde";
  const cantidad = Math.abs(delta);
  addEvent(`${name} ${action} ${cantidad} punto(s).`);

  await savePlayerToSupabase(player);
  renderPlayers();
  updateChart();
}

function addEvent(msg) {
  const time = new Date().toLocaleTimeString();
  const logEntry = `[${time}] ${msg}`;
  eventLog.unshift(logEntry);

  const logBox = document.getElementById("event-log");
  if (logBox) {
    logBox.innerHTML = eventLog.map(e => `<div>${e}</div>`).join('');
  }
}

async function addNewPlayer() {
  const nameInput = document.getElementById("new-player-name");
  const imgInput = document.getElementById("new-player-img");

  const name = nameInput.value.trim();
  const img = imgInput.value.trim() || "img/default.png";

  if (!name) return alert("El nombre no puede estar vacío.");
  if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    return alert("Ese jugador ya existe.");
  }

  const newPlayer = { name, point: 0, img };
  players.push(newPlayer);
  addEvent(`Nuevo jugador: ${name}`);

  nameInput.value = "";
  imgInput.value = "";

  await savePlayerToSupabase(newPlayer);
  renderPlayers();
  updateChart();
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

function updateChart() {
  if (typeof Chart !== "undefined" && window.pointsChart) {
    pointsChart.data.labels = players.map(p => p.name);
    pointsChart.data.datasets[0].data = players.map(p => p.points);
    pointsChart.update();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPlayersFromSupabase();
});
