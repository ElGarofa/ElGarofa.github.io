const container = document.getElementById("game-container");
const bgMusic = document.getElementById("bg-music");

// Ruta base de sprites (reemplazala si usás otra estructura)
const SPRITE_PATH = "assets/sprites/";

// IDs de Pokémon a usar (pueden ser random hasta Gen 9)
const memoryPokemonIds = [
  1, 4, 7, 25, 39, 52, 133, 150,
  152, 155, 158, 175, 202, 213, 228, 249
];

function startGame(mode) {
  container.innerHTML = ""; // limpia el contenedor
  if (mode === "memory") initMemoryGame();
  else if (mode === "clicker") initClicker();
  else if (mode === "battle") initBattle();
  else if (mode === "dodge") initDodge();
}

// ------------------------------
// 🧠 POKÉMON MEMORY
// ------------------------------
function initMemoryGame() {
  const selected = [...memoryPokemonIds];
  const fullSet = [...selected, ...selected]; // pares
  const shuffled = shuffleArray(fullSet);

  let first = null;
  let lockBoard = false;
  let matched = 0;

  const grid = document.createElement("div");
  grid.className = "memory-grid";

  shuffled.forEach((id, index) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.id = id;

    const img = document.createElement("img");
    img.src = SPRITE_PATH + "back.png"; // carta oculta
    card.appendChild(img);

    card.addEventListener("click", () => {
      if (lockBoard || card.classList.contains("matched")) return;

      img.src = SPRITE_PATH + `${id}.png`;

      if (!first) {
        first = card;
      } else {
        lockBoard = true;
        if (first.dataset.id === card.dataset.id && first !== card) {
          // Match!
          setTimeout(() => {
            first.classList.add("matched");
            card.classList.add("matched");
            matched += 1;
            resetMemoryTurn();
            if (matched === selected.length) {
              setTimeout(() => {
                alert("¡Has ganado!");
              }, 500);
            }
          }, 500);
        } else {
          // No match
          setTimeout(() => {
            first.querySelector("img").src = SPRITE_PATH + "back.png";
            card.querySelector("img").src = SPRITE_PATH + "back.png";
            resetMemoryTurn();
          }, 800);
        }
      }
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);

  function resetMemoryTurn() {
    first = null;
    lockBoard = false;
  }
}

// ------------------------------
// 🔄 Herramienta común: shuffle
// ------------------------------
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// ------------------------------
// ⚡ CLICKER DE PG
// ------------------------------
function initClicker() {
  container.innerHTML = "";

  let pg = 0;

  const btn = document.createElement("button");
  btn.id = "clicker-button";
  btn.textContent = "Haz click para ganar PG";

  const contador = document.createElement("div");
  contador.id = "pg-count";
  contador.textContent = `PG: ${pg}`;

  btn.addEventListener("click", () => {
    pg++;
    contador.textContent = `PG: ${pg}`;
    // Efecto visual: pequeño escalado
    btn.style.transform = "scale(1.1)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 100);
  });

  container.appendChild(btn);
  container.appendChild(contador);
}
// ------------------------------
// ⚔️ COMBATE POR TURNOS
// ------------------------------
function initBattle() {
  container.innerHTML = "";

  let playerHP = 100;
  let enemyHP = 100;

  const battleLog = document.createElement("div");
  battleLog.id = "battle-log";
  battleLog.textContent = "¡Comienza el combate!";

  const playerHpBar = createHpBar("Jugador", playerHP);
  const enemyHpBar = createHpBar("Enemigo", enemyHP);

  const attackBtns = document.createElement("div");
  attackBtns.style.marginTop = "15px";

  const attacks = [
    {name: "Placaje", min: 8, max: 15},
    {name: "Arañazo", min: 6, max: 18},
    {name: "Mordisco", min: 10, max: 20},
  ];

  attacks.forEach(attack => {
    const btn = document.createElement("button");
    btn.textContent = attack.name;
    btn.className = "toggle-theme btn-sm";
    btn.style.marginRight = "10px";
    btn.onclick = () => {
      if (playerHP <= 0 || enemyHP <= 0) return;

      // Ataque jugador
      const dmg = randomInt(attack.min, attack.max);
      enemyHP -= dmg;
      if (enemyHP < 0) enemyHP = 0;
      updateHpBar(enemyHpBar, enemyHP);

      addBattleLog(`Jugador usa ${attack.name} y causa ${dmg} de daño.`);

      // Revisar si enemigo perdió
      if (enemyHP === 0) {
        addBattleLog("¡Has ganado la batalla!");
        disableButtons();
        return;
      }

      // Ataque enemigo automático
      setTimeout(() => {
        const enemyAttack = attacks[randomInt(0, attacks.length - 1)];
        const dmgEnemy = randomInt(enemyAttack.min, enemyAttack.max);
        playerHP -= dmgEnemy;
        if (playerHP < 0) playerHP = 0;
        updateHpBar(playerHpBar, playerHP);
        addBattleLog(`Enemigo usa ${enemyAttack.name} y causa ${dmgEnemy} de daño.`);

        if (playerHP === 0) {
          addBattleLog("¡Has perdido la batalla!");
          disableButtons();
        }
      }, 1000);
    };
    attackBtns.appendChild(btn);
  });

  container.appendChild(playerHpBar.container);
  container.appendChild(enemyHpBar.container);
  container.appendChild(attackBtns);
  container.appendChild(battleLog);

  function addBattleLog(text) {
    battleLog.textContent += `\n${text}`;
    battleLog.scrollTop = battleLog.scrollHeight;
  }

  function disableButtons() {
    attackBtns.querySelectorAll("button").forEach(b => b.disabled = true);
  }
}

function createHpBar(name, hp) {
  const container = document.createElement("div");
  container.style.marginBottom = "8px";

  const label = document.createElement("div");
  label.textContent = `${name} HP: ${hp}`;
  label.style.marginBottom = "4px";
  label.style.fontWeight = "bold";
  container.appendChild(label);

  const bar = document.createElement("div");
  bar.style.width = "300px";
  bar.style.height = "20px";
  bar.style.backgroundColor = "#444";
  bar.style.borderRadius = "10px";
  bar.style.overflow = "hidden";

  const fill = document.createElement("div");
  fill.style.width = hp + "%";
  fill.style.height = "100%";
  fill.style.backgroundColor = "#facc15";
  fill.style.transition = "width 0.5s ease";
  bar.appendChild(fill);

  container.appendChild(bar);

  return {
    container,
    label,
    fill,
  };
}

function updateHpBar(hpBar, hp) {
  hpBar.fill.style.width = hp + "%";
  hpBar.label.textContent = hpBar.label.textContent.split(":")[0] + ": " + hp;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// ------------------------------
// 🏃 EVITA LAS POKÉBOLAS
// ------------------------------
function initDodge() {
  container.innerHTML = "";

  const canvas = document.createElement("canvas");
  canvas.id = "dodge-canvas";
  canvas.width = 400;
  canvas.height = 500;
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const player = {
    x: 180,
    y: 440,
    width: 32,
    height: 32,
    speed: 5,
    sprite: new Image(),
  };
  player.sprite.src = SPRITE_PATH + "25.png"; // Pikachu

  const pokeball = new Image();
  pokeball.src = "assets/icons/pokeball.png"; // Imagen de pokébola

  const falling = [];

  let gameOver = false;
  let score = 0;

  function spawnBall() {
    const size = 32;
    const x = Math.random() * (canvas.width - size);
    falling.push({ x, y: -size, size, speed: 2 + Math.random() * 3 });
  }

  function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar jugador
    ctx.drawImage(player.sprite, player.x, player.y, player.width, player.height);

    // Dibujar pokebolas
    for (let i = 0; i < falling.length; i++) {
      const b = falling[i];
      ctx.drawImage(pokeball, b.x, b.y, b.size, b.size);
      b.y += b.speed;

      // Colisión
      if (
        b.x < player.x + player.width &&
        b.x + b.size > player.x &&
        b.y < player.y + player.height &&
        b.y + b.size > player.y
      ) {
        endGame();
      }
    }

    // Eliminar pokebolas fuera de pantalla
    for (let i = falling.length - 1; i >= 0; i--) {
      if (falling[i].y > canvas.height) {
        falling.splice(i, 1);
        score++;
      }
    }

    requestAnimationFrame(update);
  }

  function endGame() {
    gameOver = true;
    setTimeout(() => {
      alert(`¡Perdiste! Puntuación: ${score}`);
    }, 100);
  }

  function handleKeys(e) {
    if (gameOver) return;
    if (e.key === "ArrowLeft" || e.key === "a") player.x -= player.speed;
    if (e.key === "ArrowRight" || e.key === "d") player.x += player.speed;

    // Limitar movimiento
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;
  }

  document.addEventListener("keydown", handleKeys);

  setInterval(spawnBall, 800);
  update();
}
