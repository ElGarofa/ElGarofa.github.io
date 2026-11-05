(() => {
  'use strict';
  const data = window.VEYRATH_DATA;
  if (!data) {
    console.error('No se encontró data/site-content.js');
    return;
  }
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const imagePath = filename => 'assets/images/' + filename;
  const roadmapLabels = { incluido: 'EN LA BUILD', experimental: 'EXPERIMENTAL', planeado: 'PLANIFICADO' };
  const icons = { arrow: 'i-arrow', arrowup: 'i-arrowup' };
  function svgIcon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#' + icons[name]);
    svg.append(use);
    return svg;
  }

  /* Enlaces oficiales: agregar Discord en el archivo de datos cuando exista. */
  const itchUrl = data.links && data.links.itch;
  if (itchUrl && /^https:\/\//.test(itchUrl)) {
    $$('#nav-itch, #community-itch').forEach(a => a.href = itchUrl);
  }
  const discordUrl = data.links && data.links.discord;
  if (discordUrl && /^https:\/\//.test(discordUrl)) {
    const discord = $('#discord-link');
    discord.href = discordUrl;
    discord.target = '_blank';
    discord.rel = 'noopener noreferrer';
    discord.hidden = false;
  }
  $('#copyright-year').textContent = new Date().getFullYear();

  /* Barra de navegación */
  const header = $('.site-header');
  const menuToggle = $('.menu-toggle');
  const mobileMenu = $('#mobile-menu');
  const setMenu = open => {
    mobileMenu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    $('use', menuToggle).setAttribute('href', open ? '#i-x' : '#i-menu');
  };
  menuToggle.addEventListener('click', () => setMenu(mobileMenu.hidden));
  $$('.mobile-nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !mobileMenu.hidden) setMenu(false);
  });
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

  /* Roadmap: estados documentados de la build 0.6 + trabajo pendiente. */
  const roadmapGrid = $('#roadmap-grid');
  const roadmapCount = $('#roadmap-count');
  let roadmapFilter = 'todos';
  const renderRoadmap = () => {
    const entries = (data.roadmap || []).filter(item => roadmapFilter === 'todos' || item.status === roadmapFilter);
    roadmapGrid.replaceChildren();
    entries.forEach(item => {
      const card = element('article', 'roadmap-card');
      card.dataset.status = item.status;
      const top = element('div', 'roadmap-card-top');
      top.append(element('span', null, item.category.toUpperCase()));
      const status = element('span', 'roadmap-status');
      status.append(element('i'), document.createTextNode(roadmapLabels[item.status] || item.status));
      top.append(status);
      card.append(top, element('h3', null, item.name), element('p', null, item.detail));
      roadmapGrid.append(card);
    });
    roadmapCount.textContent = String(entries.length).padStart(2, '0') + ' SISTEMAS';
  };
  $$('[data-roadmap-filter]').forEach(btn => btn.addEventListener('click', () => {
    roadmapFilter = btn.dataset.roadmapFilter;
    $$('[data-roadmap-filter]').forEach(b => {
      const isActive = b === btn;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });
    renderRoadmap();
  }));
  renderRoadmap();

  /* Galería: todas las fotos proceden de las imágenes compartidas por el autor. */
  const galleryGrid = $('#gallery-grid');
  const lightbox = $('#lightbox');
  const lightboxImage = $('#lightbox-image');
  let galleryFilter = 'todos';
  let visibleGallery = [];
  let lightboxIndex = 0;
  let lastFocusedElement = null;
  function showLightboxImage() {
    const item = visibleGallery[lightboxIndex];
    if (!item) return;
    lightboxImage.src = imagePath(item.image);
    lightboxImage.alt = item.description;
    $('#lightbox-title').textContent = item.title + ' — ' + item.description;
    $('#lightbox-counter').textContent = String(lightboxIndex + 1).padStart(2, '0') + ' / ' + String(visibleGallery.length).padStart(2, '0');
  }
  function openLightbox(index) {
    lastFocusedElement = document.activeElement;
    lightboxIndex = index;
    showLightboxImage();
    lightbox.hidden = false;
    document.body.classList.add('modal-open');
    $('#lightbox-close').focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove('modal-open');
    lightboxImage.removeAttribute('src');
    if (lastFocusedElement && lastFocusedElement.isConnected) lastFocusedElement.focus();
  }
  function moveLightbox(direction) {
    lightboxIndex = (lightboxIndex + direction + visibleGallery.length) % visibleGallery.length;
    showLightboxImage();
  }
  const renderGallery = () => {
    visibleGallery = (data.gallery || []).filter(item => galleryFilter === 'todos' || item.type === galleryFilter);
    galleryGrid.replaceChildren();
    visibleGallery.forEach((item, index) => {
      const card = element('button', 'gallery-item');
      card.type = 'button';
      card.setAttribute('aria-label', 'Ampliar: ' + item.title);
      const photo = element('img');
      photo.src = imagePath(item.image);
      photo.alt = item.description;
      photo.loading = 'lazy';
      photo.decoding = 'async';
      const zoom = element('span', 'zoom-symbol', '+');
      zoom.setAttribute('aria-hidden', 'true');
      const meta = element('span', 'gallery-meta');
      const names = element('span', '', item.type.toUpperCase());
      names.append(element('strong', null, item.title));
      meta.append(names, element('span', 'gallery-number', String(index + 1).padStart(2, '0') + ' / ' + String(visibleGallery.length).padStart(2, '0')));
      card.append(photo, zoom, meta);
      card.addEventListener('click', () => openLightbox(index));
      galleryGrid.append(card);
    });
  };
  $$('[data-gallery-filter]').forEach(btn => btn.addEventListener('click', () => {
    galleryFilter = btn.dataset.galleryFilter;
    $$('[data-gallery-filter]').forEach(b => {
      const isActive = b === btn;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });
    renderGallery();
  }));
  $('#lightbox-close').addEventListener('click', closeLightbox);
  $('#lightbox-prev').addEventListener('click', () => moveLightbox(-1));
  $('#lightbox-next').addEventListener('click', () => moveLightbox(1));
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') moveLightbox(-1);
    else if (e.key === 'ArrowRight') moveLightbox(1);
    else if (e.key === 'Tab') {
      const controls = $$('.lightbox-close, .lightbox-prev, .lightbox-next');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  renderGallery();

  /* Entradas del devlog. */
  const newsGrid = $('#news-grid');
  (data.news || []).forEach(entry => {
    const card = element('article', 'news-card');
    const photo = element('img', 'news-image');
    photo.src = entry.image;
    photo.alt = 'Captura de Veyrath asociada a: ' + entry.title;
    photo.loading = 'lazy';
    const content = element('div', 'news-content');
    const top = element('div', 'news-eyebrow');
    top.append(element('span', null, entry.tag), element('span', null, 'VERSIÓN ' + entry.version));
    const footer = element('div', 'news-footer');
    footer.append(element('span', null, 'DOCUMENTADO EN LA BUILD'), svgIcon('arrowup'));
    content.append(top, element('h3', null, entry.title), element('p', null, entry.text), footer);
    card.append(photo, content);
    newsGrid.append(card);
  });

  /* Entrada sutil de secciones, desactivada si el usuario reduce movimiento. */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-ready');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .09 });
    $$('.reveal').forEach(node => observer.observe(node));
  }
})();
