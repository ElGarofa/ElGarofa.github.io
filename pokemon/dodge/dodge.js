// dodge.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const scoreSpan = document.getElementById("score");
const levelSpan = document.getElementById("level");
const recordSpan = document.getElementById("record");

let player = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 50,
  width: 40,
  height: 40,
  speed: 7,
  color: "#facc15",
};

let keys = {};
let objects = [];
let score = 0;
let level = 1;
let objectSpeed = 3;
let spawnInterval = 1500;
let gameRunning = true;
let highScore = localStorage.getItem('dodgeHighScore') || 0;

recordSpan.textContent = highScore;

const moveSound = new Audio('sounds/move.wav');
const hitSound = new Audio('sounds/hit.wav');
const levelUpSound = new Audio('sounds/levelup.wav');

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

function movePlayer() {
  if ((keys["arrowleft"] || keys["a"]) && player.x > 0) {
    player.x -= player.speed;
    playSound(moveSound);
  }
  if ((keys["arrowright"] || keys["d"]) && player.x + player.width < canvas.width) {
    player.x += player.speed;
    playSound(moveSound);
  }
}

function createObject() {
  const size = Math.floor(Math.random() * 30) + 20;
  const x = Math.random() * (canvas.width - size);
  objects.push({
    x,
    y: -size,
    size,
    speed: objectSpeed,
    color: "#dc2626",
  });
}

function updateObjects() {
  for (let i = objects.length - 1; i >= 0; i--) {
    objects[i].y += objects[i].speed;
    if (objects[i].y > canvas.height) {
      objects.splice(i, 1);
      score++;
      scoreSpan.textContent = score;
      checkLevelUp();
    } else if (collision(player, objects[i])) {
      gameOver();
    }
  }
}

function collision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.size &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.size &&
    rect1.y + rect1.height > rect2.y
  );
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObjects() {
  objects.forEach((obj) => {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.size, obj.size);
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkLevelUp() {
  const nextLevelScore = level * 10;
  if (score >= nextLevelScore) {
    level++;
    levelSpan.textContent = level;
    objectSpeed += 1;
    if (spawnInterval > 500) spawnInterval -= 150;
    playSound(levelUpSound);
    clearInterval(spawnTimer);
    spawnTimer = setInterval(createObject, spawnInterval);
  }
}

function gameOver() {
  playSound(hitSound);
  gameRunning = false;
  restartBtn.style.display = "inline-block";
  updateHighScore();
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("dodgeHighScore", highScore);
    recordSpan.textContent = highScore;
  }
}

restartBtn.addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  score = 0;
  level = 1;
  objectSpeed = 3;
  spawnInterval = 1500;
  objects = [];
  player.x = canvas.width / 2 - 20;
  scoreSpan.textContent = score;
  levelSpan.textContent = level;
  gameRunning = true;
  restartBtn.style.display = "none";
  clearInterval(spawnTimer);
  spawnTimer = setInterval(createObject, spawnInterval);
  gameLoop();
}

let spawnTimer = setInterval(createObject, spawnInterval);

function gameLoop() {
  if (!gameRunning) return;
  clearCanvas();
  movePlayer();
  updateObjects();
  drawPlayer();
  drawObjects();
  requestAnimationFrame(gameLoop);
}

gameLoop();
