const playerHpEl = document.getElementById('player-hp');
const enemyHpEl = document.getElementById('enemy-hp');
const playerHpBar = document.getElementById('player-hp-bar');
const enemyHpBar = document.getElementById('enemy-hp-bar');
const battleLog = document.getElementById('battle-log');
const attackBtn = document.getElementById('attack-btn');
const healBtn = document.getElementById('heal-btn');
const restartBtn = document.getElementById('restart-btn');

let playerHp = 100;
let enemyHp = 100;
const maxHp = 100;
let gameOver = false;

function log(text) {
  const p = document.createElement('p');
  p.textContent = text;
  battleLog.appendChild(p);
  battleLog.scrollTop = battleLog.scrollHeight;
}

function updateHp() {
  playerHpEl.textContent = playerHp;
  enemyHpEl.textContent = enemyHp;

  playerHpBar.style.width = (playerHp / maxHp) * 100 + '%';
  enemyHpBar.style.width = (enemyHp / maxHp) * 100 + '%';

  // Cambiar color de barra según porcentaje
  playerHpBar.style.backgroundColor = getHpColor(playerHp);
  enemyHpBar.style.backgroundColor = getHpColor(enemyHp);
}

function getHpColor(hp) {
  if (hp > 60) return '#4caf50'; // verde
  if (hp > 30) return '#ff9800'; // naranja
  return '#f44336'; // rojo
}

function checkGameOver() {
  if (playerHp <= 0) {
    log("¡Has sido derrotado!");
    gameOver = true;
    attackBtn.disabled = true;
    healBtn.disabled = true;
    restartBtn.style.display = 'block';
  } else if (enemyHp <= 0) {
    log("¡Has ganado el combate!");
    gameOver = true;
    attackBtn.disabled = true;
    healBtn.disabled = true;
    restartBtn.style.display = 'block';
  }
}

function enemyTurn() {
  if (gameOver) return;
  const damage = Math.floor(Math.random() * 15) + 5;
  playerHp -= damage;
  if (playerHp < 0) playerHp = 0;
  log(`El enemigo te ataca y causa ${damage} de daño.`);
  updateHp();
  checkGameOver();
}

attackBtn.addEventListener('click', () => {
  if (gameOver) return;
  const damage = Math.floor(Math.random() * 20) + 10;
  enemyHp -= damage;
  if (enemyHp < 0) enemyHp = 0;
  log(`Atacas al enemigo causando ${damage} de daño.`);
  updateHp();
  checkGameOver();
  if (!gameOver) {
    setTimeout(enemyTurn, 1000);
  }
});

healBtn.addEventListener('click', () => {
  if (gameOver) return;
  const heal = Math.floor(Math.random() * 15) + 10;
  playerHp += heal;
  if (playerHp > maxHp) playerHp = maxHp;
  log(`Te curas y recuperas ${heal} de HP.`);
  updateHp();
  setTimeout(enemyTurn, 1000);
});

restartBtn.addEventListener('click', () => {
  playerHp = maxHp;
  enemyHp = maxHp;
  gameOver = false;
  battleLog.innerHTML = '';
  updateHp();
  attackBtn.disabled = false;
  healBtn.disabled = false;
  restartBtn.style.display = 'none';
  log('¡Comienza un nuevo combate!');
});

updateHp();
log('¡Comienza el combate! Usa atacar o curar para vencer al enemigo.');
