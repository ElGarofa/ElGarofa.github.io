let pg = 0;
let autoClickActive = false;

const pgDisplay = document.getElementById('pg');
const clickBtn = document.getElementById('clicker');
const upgradeBtn = document.getElementById('autoClick');
const sound = document.getElementById('click-sound');

clickBtn.addEventListener('click', () => {
  pg += 1;
  pgDisplay.textContent = pg;
  sound.play();
});

upgradeBtn.addEventListener('click', () => {
  if (pg >= 50 && !autoClickActive) {
    pg -= 50;
    autoClickActive = true;
    pgDisplay.textContent = pg;
    upgradeBtn.disabled = true;
    upgradeBtn.textContent = 'AutoClick Activo';
    setInterval(() => {
      pg += 1;
      pgDisplay.textContent = pg;
    }, 1000);
  }
});
