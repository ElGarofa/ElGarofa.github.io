const supabase = window.supabase.createClient(
  "https://ecwxcwiclbsxxkdltttm.supabase.co", // Reemplaza con tu URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjd3hjd2ljbGJzeHhrZGx0dHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzI4NTAsImV4cCI6MjA2MjgwODg1MH0.CzzF1lrCOJI3M40KuC9RInjjbbSqcAy28LAzy5K26bU"               // Reemplaza con tu clave pública
);

let players = [];
const eventLog = [];

async function fetchPlayers() {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("points", { ascending: false });

  if (error) {
    console.error("Error cargando jugadores:", error);
    return;
  }

  players = data;
  renderPlayers();
  updateChart();
}

async function savePlayerToSupabase(player) {
  const { error } = await supabase.from("players").insert([player]);
  if (error) console.error("Error agregando jugador:", error);
}

async function updatePlayerPoints(name, points) {
  const { error } = await supabase
    .from("players")
    .update({ points })
    .eq("name", name);

  if (error) console.error("Error actualizando puntos:", error);
}

function renderPlayers() {
  const container = document.getElementById("participants-list");
  if (!container) return;
  container.innerHTML = "";

  players.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "card participant-card p-2 mb-2 d-flex flex-md-row flex-column align-items-center justify-content-between";

    div.innerHTML = `
      <div class="d-flex align-items-center mb-2 mb-md-0">
        <img src="${p.img}" alt="${p.name}" class="avatar me-3">
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

function addEvent(msg) {
  const time = new Date().toLocaleTimeString();
  eventLog.unshift(`[${time}] ${msg}`);
  const logBox = document.getElementById("event-log");
  if (logBox) logBox.innerHTML = eventLog.map(e => `<div>${e}</div>`).join('');
}

async function changePoints(name, delta) {
  const player = players.find(p => p.name === name);
  if (!player) return;

  player.points = Math.max(0, player.points + delta);
  await updatePlayerPoints(name, player.points);
  addEvent(`${name} ${delta > 0 ? "gana" : "pierde"} ${Math.abs(delta)} punto(s).`);
  renderPlayers();
  updateChart();
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

  const newPlayer = { name, points: 0, img };
  players.push(newPlayer);
  await savePlayerToSupabase(newPlayer);

  addEvent(`Nuevo jugador: ${name}`);
  nameInput.value = "";
  imgInput.value = "";

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
  fetchPlayers();
});
