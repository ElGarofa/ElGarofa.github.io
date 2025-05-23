// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDk_8pll6f_muLBbNB-BS1n722kPoccAuU",
  authDomain: "torneo-dd967.firebaseapp.com",
  projectId: "torneo-dd967",
  storageBucket: "torneo-dd967.appspot.com",
  messagingSenderId: "903015354798",
  appId: "1:903015354798:web:c02abe531b8e425601f83f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

let players = [];
const eventLog = [];

async function guardarJugadorEnFirebase(jugador) {
  try {
    await addDoc(collection(db, "jugadores"), jugador);
    console.log("Jugador guardado en Firebase:", jugador.name);
  } catch (e) {
    console.error("Error al guardar en Firebase:", e);
  }
}

async function cargarJugadoresDesdeFirebase() {
  try {
    const querySnapshot = await getDocs(collection(db, "jugadores"));
    players = [];
    querySnapshot.forEach((doc) => {
      players.push(doc.data());
    });
    renderPlayers();
    updateChart();
  } catch (e) {
    console.error("Error al cargar desde Firebase:", e);
  }
}

function savePlayers() {
  localStorage.setItem('ligalockePlayers', JSON.stringify(players));
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

  const nuevoJugador = { name, points: 0, img };
  players.push(nuevoJugador);
  addEvent(`Nuevo jugador: ${name}`);

  nameInput.value = "";
  imgInput.value = "";

  guardarJugadorEnFirebase(nuevoJugador);
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
  cargarJugadoresDesdeFirebase();
});
