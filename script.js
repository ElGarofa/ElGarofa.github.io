const supabase = window.supabase.createClient(
  "https://ecwxcwiclbsxxkdltttm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjd3hjd2ljbGJzeHhrZGx0dHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzI4NTAsImV4cCI6MjA2MjgwODg1MH0.CzzF1lrCOJI3M40KuC9RInjjbbSqcAy28LAzy5K26bU"
);

let players = [];

async function loadPlayers() {
  const { data, error } = await supabase.from("players").select("*");
  if (error) {
    console.error("Error al cargar jugadores:", error.message);
    return;
  }
  players = data || [];
  renderPlayers();
  updateChart();
}

async function savePlayer(player) {
  const { error } = await supabase.from("players").insert([player]);
  if (error) console.error("Error al guardar jugador:", error.message);
}

async function updatePoints(name, delta) {
  const player = players.find(p => p.name === name);
  if (!player) return;

  player.points = Math.max(0, player.points + delta);

  const { error } = await supabase
    .from("players")
    .update({ points: player.points })
    .eq("name", name);

  if (error) {
    console.error("Error actualizando puntos:", error.message);
    return;
  }

  addEvent(`${name} ${delta > 0 ? "gana" : "pierde"} ${Math.abs(delta)} punto(s).`);
  renderPlayers();
  updateChart();
}

function renderPlayers() {
  const container = document.getElementById("participants-list");
  if (!container) return;
  container.innerHTML = "";

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
        <button class="btn btn-sm btn-primary me-1" onclick="updatePoints('${p.name}', 1)">+1</button>
        <button class="btn btn-sm btn-danger" onclick="updatePoints('${p.name}', -1)">-1</button>
      </div>
    `;
    container.appendChild(div);
  });
}

async function addNewPlayer() {
  const name = document.getElementById("new-player-name").value.trim();
  const img = document.getElementById("new-player-img").value.trim() || "img/default.png";

  if (!name) return alert("El nombre no puede estar vacío.");
  if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    return alert("Ese jugador ya existe.");
  }

  const newPlayer = { name, points: 0, img };
  players.push(newPlayer);
  await savePlayer(newPlayer);
  addEvent(`Nuevo jugador: ${name}`);
  renderPlayers();
  updateChart();

  document.getElementById("new-player-name").value = "";
  document.getElementById("new-player-img").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  loadPlayers();
});
