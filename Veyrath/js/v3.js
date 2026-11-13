(() => {
  'use strict';
  /* VEYRATH web 3 — versión y años de desarrollo desde los datos, y contadores de cifras. */
  const data = window.VEYRATH_DATA || {};
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* Versión visible: se cambia solo en data/site-content.js. */
  if (typeof data.version === 'string' && data.version.trim()) {
    $$('[data-veyrath-version]').forEach(node => { node.textContent = data.version.trim(); });
  }

  /* Años de desarrollo a partir de "AAAA-MM" (por ejemplo, "2024-11"). */
  const start = /^(\d{4})-(\d{1,2})$/.exec(String(data.developmentStart || ''));
  if (start) {
    const year = Number(start[1]);
    const month = Number(start[2]);
    const now = new Date();
    const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
    const years = Math.max(1, Math.floor(months / 12));
    $$('[data-dev-years]').forEach(node => { node.textContent = String(years); });
    $$('[data-dev-start-year]').forEach(node => { node.textContent = String(year); });
  }

  /* Contadores: arrancan al aparecer en pantalla; sin animación si se pide menos movimiento. */
  const counters = $$('[data-count]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!counters.length || reduceMotion || !('IntersectionObserver' in window)) return;
  const format = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const animate = node => {
    const target = Number(node.dataset.count);
    const finalText = node.textContent;
    if (!Number.isFinite(target) || target <= 0) return;
    const duration = 1400;
    const begin = performance.now();
    const step = now => {
      const t = Math.min(1, (now - begin) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      node.textContent = t < 1 ? format(Math.round(target * eased)) : finalText;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      animate(entry.target);
    });
  }, { threshold: 0.6 });
  counters.forEach(node => observer.observe(node));
})();
