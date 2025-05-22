// === CONTADOR DE PRÓXIMO COMBATE ===
const countdownElement = document.getElementById("countdown");
const nextMatchDate = new Date("May 25, 2025 18:00:00").getTime(); // Ajusta esta fecha

if (countdownElement) {
  setInterval(() => {
    const now = new Date().getTime();
    const distance = nextMatchDate - now;

    if (distance < 0) {
      countdownElement.innerHTML = "¡El combate ha comenzado!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}