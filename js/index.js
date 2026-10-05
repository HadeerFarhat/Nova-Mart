// ===== NovaMart — index page =====
let filteredProducts = [...products];

// Best representative image per category (real product photos)
const CAT_IMAGES = {
  watches: 'img/product-407.jpg',
  jewelry: 'img/product-512.jpg',
  footwear: 'img/product-269.jpg',
  bags: 'img/product-511.jpg',
  accessories: 'img/product-359.jpg',
  winter: 'img/product-71.jpg',
  summer: 'img/product-78.jpg',
  appliances: 'img/product-9.jpg',
  electronics: 'img/product-208.jpg',
  beauty: 'img/product-115.jpg',
  furniture: 'img/product-69.jpg',
  gaming: 'img/product-171.jpg'
};

function getCatImage(catId) {
  if (CAT_IMAGES[catId]) return CAT_IMAGES[catId];
  const p = products.find(x => x.category === catId);
  return p ? p.image : 'img/product-1.jpg';
}

function renderHeroCollage() {
  const el = document.getElementById('heroCollage');
  if (!el) return;
  // Use products with discounts for promo collage
  const deals = products.filter(p => p.oldPrice).slice(0, 8);
  const fallback = products.slice(0, 8);
  const list = deals.length >= 6 ? deals : fallback;
  el.innerHTML = list.map(p =>
    `<div class="hero-collage-item"><img src="${p.image}" alt="" loading="lazy"></div>`
  ).join('');
}

function renderCategories() {
  const grid = document.getElementById('catGrid');
  if (!grid) return;
  const cats = SITE_CATEGORIES.filter(c => c.id !== 'all');
  grid.innerHTML = cats.map(c => {
    const count = products.filter(p => p.category === c.id).length;
    if (count === 0) return '';
    const img = getCatImage(c.id);
    const name = currentLang === 'ar' ? c.name_ar : c.name_en;
    return `
      <a href="category.html?id=${c.id}" class="cat-card cat-card-img" data-cat="${c.id}">
        <div class="cat-img-wrap">
          <img src="${img}" alt="${name}" loading="lazy">
          <div class="cat-img-overlay"></div>
        </div>
        <div class="cat-card-body">
          <h3>${name}</h3>
          <span class="cat-count">${count} ${currentLang === 'ar' ? 'منتج' : 'items'}</span>
        </div>
      </a>`;
  }).join('');
}

function renderOffers() {
  const offers = products.filter(p => p.oldPrice).slice(0, 8);
  const el = document.getElementById('offersGrid');
  if (el) el.innerHTML = offers.map(p => productCardHTML(p)).join('');
}

function renderClearance() {
  const clearance = products.filter(p => p.oldPrice && (1 - p.price / p.oldPrice) >= 0.25).slice(0, 8);
  const el = document.getElementById('clearanceGrid');
  if (el) el.innerHTML = clearance.map(p => productCardHTML(p)).join('');
}

function applyFilters() {
  const params = new URLSearchParams(location.search);
  const catEl = document.getElementById('filterCat');
  const sortEl = document.getElementById('sortBy');
  const searchEl = document.getElementById('searchInput');
  const cat = (catEl && catEl.value) || params.get('cat') || 'all';
  const search = ((searchEl && searchEl.value) || params.get('search') || '').toLowerCase().trim();
  const sort = (sortEl && sortEl.value) || 'default';

  filteredProducts = products.filter(p => {
    const matchCat = cat === 'all' || p.category === cat;
    const name = ((p.name_en || '') + ' ' + (p.name_ar || '') + ' ' + (p.desc_en || '') + ' ' + (p.category || '')).toLowerCase();
    const matchSearch = !search || name.includes(search);
    return matchCat && matchSearch;
  });

  if (sort === 'price-asc') filteredProducts.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filteredProducts.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filteredProducts.sort((a, b) => b.rating - a.rating);

  renderProducts();
}
window.applyFilters = applyFilters;

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const noRes = document.getElementById('noResults');
  const countEl = document.getElementById('resultsCount');
  const titleEl = document.getElementById('productsTitle');
  if (!grid) return;

  const params = new URLSearchParams(location.search);
  const cat = params.get('cat') || (document.getElementById('filterCat') || {}).value;
  const search = params.get('search');

  if (search) {
    titleEl.textContent = '"' + search + '"';
  } else if (cat && cat !== 'all') {
    titleEl.textContent = getCategoryName(cat);
  } else {
    titleEl.setAttribute('data-i18n', 'all_products');
    titleEl.textContent = t('all_products');
  }

  countEl.textContent = filteredProducts.length + ' ' + t('results');

  if (filteredProducts.length === 0) {
    grid.innerHTML = '';
    noRes.classList.remove('hidden');
  } else {
    noRes.classList.add('hidden');
    grid.innerHTML = filteredProducts.map(p => productCardHTML(p)).join('');
  }
}
window.renderProducts = renderProducts;
window.renderCategories = renderCategories;
window.renderOffers = renderOffers;
window.renderClearance = renderClearance;

function fillFilterSelect() {
  const sel = document.getElementById('filterCat');
  if (!sel) return;
  const current = new URLSearchParams(location.search).get('cat') || 'all';
  sel.innerHTML = SITE_CATEGORIES.map(c =>
    `<option value="${c.id}" ${c.id === current ? 'selected' : ''}>${currentLang === 'ar' ? c.name_ar : c.name_en}</option>`
  ).join('');
}

// Sticky header scroll effect
function initStickyNav() {
  const onScroll = () => {
    const header = document.querySelector('.header');
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

const originalSetLang = setLanguage;
window.setLanguage = function (lang) {
  originalSetLang(lang);
  renderCategories();
  renderOffers();
  renderClearance();
  fillFilterSelect();
  applyFilters();
};

document.addEventListener('DOMContentLoaded', function () {
  initCommon();
  initStickyNav();
  renderHeroCollage();
  renderCategories();
  renderOffers();
  renderClearance();
  fillFilterSelect();

  const params = new URLSearchParams(location.search);
  if (params.get('cat')) {
    const fc = document.getElementById('filterCat');
    if (fc) fc.value = params.get('cat');
  }
  if (params.get('search')) {
    const si = document.getElementById('searchInput');
    if (si) si.value = params.get('search');
  }
  applyFilters();

  const sp = document.getElementById('statProducts');
  if (sp) sp.textContent = products.length;
});
