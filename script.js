const igUrl = 'https://www.instagram.com/mire_heir/';
const priceData = {
  keratin: { name: 'КЕРАТИНОВЕ ВИРІВНЮВАННЯ', prices: [1900,2300,2700,3100,3500,3900] },
  botox: { name: 'БОТОКС ДЛЯ ВОЛОССЯ', prices: [1000,1300,1600,1900,2200,2500] },
  cold: { name: 'ХОЛОДНЕ ВІДНОВЛЕННЯ', prices: [1000,1300,1600,1900,2200,2500] }
};
const lengthLabels = ['10 — 30 см','30 — 40 см','40 — 50 см','50 — 60 см','60 — 70 см','70 — 80 см'];
let currentService = 'keratin';
let currentLength = 0;
const fmt = value => new Intl.NumberFormat('uk-UA').format(value);

function renderPrice() {
  const data = priceData[currentService];
  const name = document.getElementById('priceServiceName');
  const selected = document.getElementById('selectedPrice');
  const book = document.getElementById('priceBook');
  if (!name || !selected || !book) return;
  name.textContent = data.name;
  document.querySelectorAll('.length-option').forEach((button, index) => {
    const active = index === currentLength;
    button.classList.toggle('active', active);
    const label = button.querySelector('span');
    const price = button.querySelector('b');
    if (label) label.textContent = lengthLabels[index];
    if (price) price.innerHTML = `${fmt(data.prices[index])} <small>грн</small>`;
    button.setAttribute('aria-pressed', String(active));
  });
  selected.innerHTML = `${fmt(data.prices[currentLength])} <small>грн</small>`;
  book.href = igUrl;
  book.setAttribute('aria-label', `Запитати про запис: ${data.name.toLowerCase()}, довжина ${lengthLabels[currentLength]}, ${fmt(data.prices[currentLength])} гривень`);
}

const tabs = [...document.querySelectorAll('.price-tab')];
tabs.forEach((button, index) => {
  button.addEventListener('click', () => {
    currentService = button.dataset.service;
    tabs.forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    renderPrice();
  });
  button.addEventListener('keydown', event => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
      (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();
    tabs[next].click();
  });
});
document.querySelectorAll('.length-option').forEach(button => {
  button.addEventListener('click', () => {
    currentLength = Number(button.dataset.length);
    renderPrice();
  });
});

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
function setMenu(open) {
  if (!menuToggle || !nav) return;
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
  document.body.classList.toggle('menu-open', open);
  nav.setAttribute('aria-hidden', String(!open));
  if (open) {
    const firstLink = nav.querySelector('a');
    if (firstLink) firstLink.focus({ preventScroll: true });
  } else {
    menuToggle.focus({ preventScroll: true });
  }
}
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
let lastGalleryTrigger = null;
function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.removeAttribute('src');
  document.body.style.overflow = '';
  if (lastGalleryTrigger) lastGalleryTrigger.focus({ preventScroll: true });
}
document.querySelectorAll('.gallery-item').forEach(button => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lastGalleryTrigger = button;
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = button.querySelector('img')?.alt || 'Фото волосся MIRÉ HAIR';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose?.focus({ preventScroll: true });
  });
});
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (menuToggle?.getAttribute('aria-expanded') === 'true') setMenu(false);
    closeLightbox();
  }
});

const preloader = document.getElementById('preloader');
const hidePreloader = () => preloader?.classList.add('done');
window.addEventListener('load', () => window.setTimeout(hidePreloader, 250));
window.setTimeout(hidePreloader, 1800);
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.playsInline = true;
  heroVideo.loop = true;
  heroVideo.preload = 'metadata';

  if (!reduceMotion) {
    heroVideo.addEventListener('canplay', () => {
      heroVideo.classList.add('ready');
      heroVideo.play().catch(() => {
        // Keep the poster visible if the browser blocks autoplay.
      });
    }, { once: true });
    heroVideo.addEventListener('error', () => heroVideo.classList.remove('ready'));
    heroVideo.load();
    heroVideo.play().then(() => heroVideo.classList.add('ready')).catch(() => {});
  }
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(element => observer.observe(element));
} else {
  revealItems.forEach(element => element.classList.add('visible'));
}
renderPrice();
