// ===== NovaMart — category page =====
const CAT_IMAGES = {
  watches: 'img/product-407.jpg',
  jewelry: 'img/product-368.jpg',
  footwear: 'img/product-269.jpg',
  bags: 'img/product-362.jpg',
  accessories: 'img/product-359.jpg',
  winter: 'img/product-71.jpg',
  summer: 'img/product-78.jpg',
  appliances: 'img/product-9.jpg',
  electronics: 'img/product-208.jpg',
  beauty: 'img/product-115.jpg',
  furniture: 'img/product-7.jpg',
  gaming: 'img/product-174.jpg'
};

let catId = 'all';
let catProducts = [];

function renderCategoryProducts() {
  const sort = (document.getElementById('sortBy') || {}).value || 'default';
  let list = [...catProducts];
  if (sort === 'price-asc') list.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  else if (sort === 'rating') list.sort((a,b) => b.rating - a.rating);

  const grid = document.getElementById('productGrid');
  const noRes = document.getElementById('noResults');
  if (!list.length) {
    grid.innerHTML = '';
    noRes.classList.remove('hidden');
  } else {
    noRes.classList.add('hidden');
    grid.innerHTML = list.map(p => productCardHTML(p)).join('');
  }
  document.getElementById('catCount').textContent =
    list.length + ' ' + t('results');
}

function initCategory() {
  catId = new URLSearchParams(location.search).get('id') || 'all';
  const cat = SITE_CATEGORIES.find(c => c.id === catId) || SITE_CATEGORIES[0];
  const name = currentLang === 'ar' ? cat.name_ar : cat.name_en;
  document.title = name + ' – NovaMart';
  document.getElementById('catTitle').textContent = name;
  document.getElementById('catBreadcrumb').textContent = name;

  const img = CAT_IMAGES[catId] || (products.find(p => p.category === catId) || {}).image || 'img/product-1.jpg';
  document.getElementById('catHeroImg').innerHTML = `<img src="${img}" alt="${name}">`;

  catProducts = catId === 'all' ? [...products] : products.filter(p => p.category === catId);
  renderCategoryProducts();
}

window.renderCategoryProducts = renderCategoryProducts;

const originalSetLang = setLanguage;
window.setLanguage = function(lang) {
  originalSetLang(lang);
  initCategory();
};

document.addEventListener('DOMContentLoaded', () => {
  initCommon();
  initCategory();
});
