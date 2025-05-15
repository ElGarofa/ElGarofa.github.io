// main.js

let players = JSON.parse(localStorage.getItem('ligalockePlayers')) || [
  { name: "Vargash", points: 0, img: "https://media.tenor.com/BS6MXJndFmgAAAAm/n-pokemon.webp" },
  { name: "Marci", points: 0, img: "https://media.tenor.com/nRP3gaOv5bIAAAAm/hi-beeg-hey-beeg.webp" },
  { name: "Exxis", points: 0, img: "https://media.tenor.com/4eHJK7PKU2QAAAAM/mari-marnie.gif" },
  { name: "Shy-red", points: 0, img: "https://media.tenor.com/hUWnlzrcPgkAAAAm/gritar-pokemon-trainer.webp" },
  { name: "BenjaOf", points: 0, img: "https://media.tenor.com/IyStLZUSsQIAAAAm/pok%C3%A9mon-serena-pok%C3%A9mon.webp" },
  { name: "Leo", points: 0, img: "https://media.tenor.com/tm7bF8VmEZQAAAAm/skyla-pokemon.webp" },
  { name: "Zeref", points: 0, img: "https://media.tenor.com/soWhgqIus1cAAAAM/pokemon-hilbert.gif" },
  { name: "Garofa", points: 0, img: "https://media.tenor.com/X_xh7_GIN9YAAAAm/rojo-pokemon.webp" },

];

const eventLog = [];

function savePlayers() {
  localStorage.setItem('ligalockePlayers', JSON.stringify(players));
}

function renderPlayers() {
  const container = document.getElementById("participants-list");
  if (!container) return;
  container.innerHTML = "";

  // Ordena por puntos descendente
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

function changePoints(name, delta) {
  const player = players.find(p => p.name === name);
  if (!player) return;

  player.points = Math.max(0, player.points + delta);
  const action = delta > 0 ? "gana" : "pierde";
  const cantidad = Math.abs(delta);
  addEvent(`${name} ${action} ${cantidad} punto(s).`);

  savePlayers();
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

function addNewPlayer() {
  const nameInput = document.getElementById("new-player-name");
  const imgInput = document.getElementById("new-player-img");

  const name = nameInput.value.trim();
  const img = imgInput.value.trim() || "img/default.png";

  if (!name) return alert("El nombre no puede estar vacío.");
  if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    return alert("Ese jugador ya existe.");
  }

  players.push({ name, points: 0, img });
  addEvent(`Nuevo jugador: ${name}`);

  nameInput.value = "";
  imgInput.value = "";

  savePlayers();
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
  renderPlayers();
  updateChart();
});
