/* ===========================
   LAG MASTERS — script.js
   =========================== */

/* ----- NAVBAR SCROLL ----- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ----- HAMBURGER MENU ----- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ----- SMOOTH SCROLL ----- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ----- COUNTERS ----- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1400;
  const steps = 60;
  const stepTime = duration / steps;
  let current = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.ceil(current);
    }
  }, stepTime);
}

// Trigger counters when hero is visible
const counterEls = document.querySelectorAll('.stat-num');
let countersTriggered = false;
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersTriggered) {
      countersTriggered = true;
      counterEls.forEach(el => animateCounter(el));
    }
  });
}, { threshold: 0.4 });

const heroSection = document.getElementById('inicio');
if (heroSection) counterObserver.observe(heroSection);

/* ----- REVEAL ON SCROLL ----- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ----- TOAST NOTIFICATION ----- */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ----- CLAN MEMBERS ----- */
const clanMembers = [
  {
    name: "Marcos",
    rank: "Platino",
    rankKey: "platino",
    epicId: "LMS ElGarofa",
    img: "img/auto1.png",
    rankImg: "img/Platino.png",
    wins: 89
  },
  {
    name: "Benja",
    rank: "Platino",
    rankKey: "platino",
    epicId: "LMS Benja",
    img: "img/auto2.png",
    rankImg: "img/Platino.png",
    wins: 76
  },
  {
    name: "Lywerd",
    rank: "Diamante",
    rankKey: "diamante",
    epicId: "LMS Lywerd",
    img: "img/auto3.png",
    rankImg: "img/Diamante.png",
    wins: 112
  }
];

const membersContainer = document.getElementById('membersContainer');
const searchInput = document.getElementById('memberSearch');
const noResults = document.getElementById('noResults');

function displayMembers(filter = '') {
  if (!membersContainer) return;
  membersContainer.innerHTML = '';

  const filtered = clanMembers.filter(m =>
    m.name.toLowerCase().includes(filter.toLowerCase()) ||
    m.rank.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  filtered.forEach((m, i) => {
    const card = document.createElement('div');
    card.className = `member-card rank-${m.rankKey}`;
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <img src="${m.rankImg}" class="rank" alt="${m.rank}" onerror="this.style.display='none'">
      <img src="${m.img}" class="car" alt="${m.name}" onerror="this.style.display='none'">
      <h3>LMS | ${m.name}</h3>
      <p style="font-size:0.75rem;color:var(--text-dim);letter-spacing:1px;margin-bottom:4px">${m.rank} · ${m.wins} wins</p>
      <button class="copy-btn" onclick="copyId('${m.epicId}')">
        ID: ${m.epicId} 📋
      </button>
    `;
    membersContainer.appendChild(card);
  });
}

function copyId(id) {
  navigator.clipboard.writeText(id).then(() => {
    showToast(`✓ ID copiada: ${id}`);
  }).catch(() => {
    showToast(`ID: ${id}`);
  });
}

searchInput?.addEventListener('input', e => displayMembers(e.target.value));
displayMembers();

/* ----- TOURNAMENTS ----- */
const tournaments = [
  {
    name: "Copa de Bienvenida",
    mode: "2vs2",
    date: "15 Jun 2025",
    prize: "Rol Especial + 500 Créditos",
    slots: 12,
    maxSlots: 16,
    status: "open",       // open | upcoming | finished
    result: null
  },
  {
    name: "Clan Battle #1",
    mode: "1vs1",
    date: "10 Jul 2025",
    prize: "Créditos + Mención Discord",
    slots: 6,
    maxSlots: 8,
    status: "upcoming",
    result: null
  },
  {
    name: "Rocket Cup",
    mode: "3vs3",
    date: "15 Mar 2025",
    prize: "Rol Campeón",
    slots: 16,
    maxSlots: 16,
    status: "finished",
    result: "Win 🏆"
  }
];

const statusLabel = {
  open: "INSCRIPCIÓN ABIERTA",
  upcoming: "PRÓXIMAMENTE",
  finished: "FINALIZADO"
};

function renderTournaments() {
  const grid = document.getElementById('tournamentsGrid');
  if (!grid) return;

  tournaments.forEach(t => {
    const pct = Math.round((t.slots / t.maxSlots) * 100);
    const card = document.createElement('div');
    card.className = 'tournament-card reveal';
    card.innerHTML = `
      <span class="tournament-status status-${t.status}">${statusLabel[t.status]}</span>
      <h3>${t.name}</h3>
      <div class="meta">
        <span class="meta-item">🎮 ${t.mode}</span>
        <span class="meta-item">📅 ${t.date}</span>
        <span class="meta-item">🏅 ${t.prize}</span>
        ${t.result ? `<span class="meta-item" style="color:#00f7ff">🏆 ${t.result}</span>` : ''}
      </div>
      ${t.status !== 'finished' ? `
        <div style="display:flex;justify-content:space-between;font-size:0.78rem;color:var(--text-dim);margin-bottom:6px">
          <span>Cupos</span>
          <span>${t.slots} / ${t.maxSlots}</span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
      ` : ''}
      ${t.status === 'open' ? `<a href="torneo.html" class="btn btn-primary">Inscribirse</a>` : ''}
      ${t.status === 'upcoming' ? `<button class="btn btn-outline" disabled style="width:100%;justify-content:center;cursor:not-allowed;opacity:0.5">Próximamente</button>` : ''}
    `;
    grid.appendChild(card);
    // Observe for reveal
    revealObserver.observe(card);
  });
}

renderTournaments();