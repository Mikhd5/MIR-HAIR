const igUrl = 'https://www.instagram.com/mire_heir/';
const priceData = {
  keratin: { name: 'КЕРАТИНОВЕ ВИРІВНЮВАННЯ', prices: [1900,2300,2700,3100,3500,3900] },
  botox:   { name: 'БОТОКС ДЛЯ ВОЛОССЯ', prices: [1000,1300,1600,1900,2200,2500] },
  cold:    { name: 'ХОЛОДНЕ ВІДНОВЛЕННЯ', prices: [1000,1300,1600,1900,2200,2500] }
};
const lengthLabels = ['10 — 30 см','30 — 40 см','40 — 50 см','50 — 60 см','60 — 70 см','70 — 80 см'];
let currentService = 'keratin';
let currentLength = 0;
const fmt = n => n.toLocaleString('uk-UA').replace(/ /g, ' ');
function renderPrice(){
  const data = priceData[currentService];
  document.getElementById('priceServiceName').textContent = data.name;
  document.querySelectorAll('.length-option').forEach((btn,i)=>{
    btn.classList.toggle('active',i===currentLength);
    btn.querySelector('span').textContent = lengthLabels[i];
    btn.querySelector('b').innerHTML = `${fmt(data.prices[i])} <small>грн</small>`;
    btn.setAttribute('aria-pressed',i===currentLength?'true':'false');
  });
  document.getElementById('selectedPrice').innerHTML = `${fmt(data.prices[currentLength])} <small>грн</small>`;
  const serviceName = data.name.toLowerCase();
  document.getElementById('priceBook').href = `${igUrl}`;
  document.getElementById('priceBook').setAttribute('aria-label',`Запитати про запис: ${serviceName}, довжина ${lengthLabels[currentLength]}, ${fmt(data.prices[currentLength])} гривень`);
}
document.querySelectorAll('.price-tab').forEach(btn=>btn.addEventListener('click',()=>{
  currentService=btn.dataset.service;
  document.querySelectorAll('.price-tab').forEach(tab=>{const active=tab===btn;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',active?'true':'false');});
  renderPrice();
}));
document.querySelectorAll('.length-option').forEach(btn=>btn.addEventListener('click',()=>{currentLength=Number(btn.dataset.length);renderPrice();}));

const menuToggle=document.getElementById('menuToggle');
const nav=document.getElementById('mainNav');
function closeMenu(){nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');}
menuToggle.addEventListener('click',()=>{const isOpen=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!isOpen));nav.classList.toggle('open',!isOpen);document.body.classList.toggle('menu-open',!isOpen);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeLightbox();}});

const preloader=document.getElementById('preloader');
window.addEventListener('load',()=>setTimeout(()=>preloader.classList.add('done'),450));
setTimeout(()=>preloader.classList.add('done'),2400);
document.getElementById('year').textContent=new Date().getFullYear();

// The studio's video is loaded from /hero.mp4. If it cannot play,
// the high-quality poster remains visible and the page layout is unchanged.
const heroVideo=document.getElementById('heroVideo');
heroVideo.addEventListener('canplay',()=>heroVideo.classList.add('ready'));
heroVideo.addEventListener('error',()=>heroVideo.classList.remove('ready'));
heroVideo.play().catch(()=>{});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightboxImage');
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImage.src='';document.body.style.overflow='';}
document.querySelectorAll('.gallery-item').forEach(btn=>btn.addEventListener('click',()=>{lightboxImage.src=btn.dataset.full;lightboxImage.alt=btn.querySelector('img').alt;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}));
document.getElementById('lightboxClose').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
renderPrice();
