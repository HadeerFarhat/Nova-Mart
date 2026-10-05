// ===== NovaMart App - Vanilla JS =====

const STORAGE_KEYS = {
  cart: 'novamart_cart',
  wishlist: 'novamart_wishlist',
  lang: 'novamart_lang',
  user: 'novamart_user',
  theme: 'novamart_theme'
};

// State
let cart = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || '[]');
let wishlist = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist) || '[]');
let currentLang = localStorage.getItem(STORAGE_KEYS.lang) || 'en';
let currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.user) || 'null');
let currentTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'light';

// Categories
const SITE_CATEGORIES = window.SITE_CATEGORIES = [
  { id: 'all', name_en: 'All', name_ar: 'الكل' },
  { id: 'watches', name_en: 'Watches', name_ar: 'ساعات' },
  { id: 'jewelry', name_en: 'Jewelry', name_ar: 'مجوهرات' },
  { id: 'footwear', name_en: 'Footwear', name_ar: 'أحذية' },
  { id: 'bags', name_en: 'Bags', name_ar: 'حقائب' },
  { id: 'accessories', name_en: 'Accessories', name_ar: 'إكسسوارات' },
  { id: 'winter', name_en: 'Winter Wear', name_ar: 'شتوي' },
  { id: 'summer', name_en: 'Summer Wear', name_ar: 'صيفي' },
  { id: 'appliances', name_en: 'Appliances', name_ar: 'أجهزة كهربائية' },
  { id: 'electronics', name_en: 'Electronics', name_ar: 'إلكترونيات' },
  { id: 'beauty', name_en: 'Beauty', name_ar: 'تجميل' },
  { id: 'furniture', name_en: 'Furniture', name_ar: 'أثاث' },
  { id: 'gaming', name_en: 'Gaming', name_ar: 'ألعاب' }
];



// i18n — dictionaries loaded from js/lang/en.js & js/lang/ar.js (before this file)
const i18n = {
  en: window.LANG_EN || {},
  ar: window.LANG_AR || {}
};


function getProducts() {
  return (typeof products !== "undefined" && products) || window.products || [];
}

function t(key) {
  return i18n[currentLang][key] || key;
}


// Lightweight inline SVG icon set — keeps icons crisp, theme-friendly and dependency-free.
const ICONS = {
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.2 4.2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/>',
  moon: '<path d="M20.8 15.5A8.5 8.5 0 0 1 8.5 3.2 8.7 8.7 0 1 0 20.8 15.5Z"/>',
  heart: '<path d="M20.8 8.8c0 5.2-8.8 10.1-8.8 10.1S3.2 14 3.2 8.8A4.6 4.6 0 0 1 12 6.5a4.6 4.6 0 0 1 8.8 2.3Z"/>',
  heartFill: '<path fill="currentColor" stroke="none" d="M20.8 8.8c0 5.2-8.8 10.1-8.8 10.1S3.2 14 3.2 8.8A4.6 4.6 0 0 1 12 6.5a4.6 4.6 0 0 1 8.8 2.3Z"/>',
  cart: '<path d="M3 4h2l1.6 9.2a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 1.9-1.5L20 7H6"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
  user: '<circle cx="12" cy="8" r="3.2"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>',
  home: '<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-6h6v6"/>',
  sparkles: '<path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3ZM19 13l.7 2.3L22 16l-2.3.7L19 19l-.7-2.3L16 16l2.3-.7L19 13ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z"/>',
  box: '<path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/>',
  shoppingBag: '<path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  tag: '<path d="M3.5 12V5.5h6.5L20.5 16l-4.5 4.5L6 11.5V12Z"/><circle cx="7.5" cy="8.5" r="1"/>',
  truck: '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  landmark: '<path d="m3 9 9-5 9 5M5 10h14M7 10v7M12 10v7M17 10v7M4 19h16"/>',
  rotate: '<path d="M4 7h10V3l6 6-6 6v-4H7a4 4 0 0 0 0 8h2"/>',
  lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  mapPin: '<path d="M20 10.5c0 5.5-8 10.5-8 10.5S4 16 4 10.5a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10.5" r="2.2"/>',
  minus: '<path d="M5 12h14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  alertCircle: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
  shield: '<path d="M12 3 19 6v5c0 5-3.1 8.3-7 10-3.9-1.7-7-5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M7 3h3l1.5 4-2 1.7a13 13 0 0 0 5.8 5.8l1.7-2 4 1.5v3a2 2 0 0 1-2 2C11 19 5 13 5 5a2 2 0 0 1 2-2Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>'
};

function icon(name, className = '', size = 20, extraAttrs = '') {
  const paths = ICONS[name] || ICONS.alertCircle;
  return `<svg class="icon-svg ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" ${extraAttrs}>${paths}</svg>`;
}
window.icon = icon;

function saveCart() {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  updateBadges();
}

function saveWishlist() {
  localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
  updateBadges();
}

function updateBadges() {
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const wishCount = wishlist.length;
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = cartCount;
    el.style.display = cartCount > 0 ? 'flex' : 'none';
  });
  document.querySelectorAll('[data-wish-count]').forEach(el => {
    el.textContent = wishCount;
    el.style.display = wishCount > 0 ? 'flex' : 'none';
  });
}


function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem(STORAGE_KEYS.theme, currentTheme);
  applyTheme();
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.innerHTML = icon(currentTheme === 'dark' ? 'sun' : 'moon', 'theme-icon', 19);
    const label = currentTheme === 'dark' ? t('light_mode') : t('dark_mode');
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }
}

function setLanguage(lang) {
  currentLang = lang;
  window.currentLang = lang;
  localStorage.setItem(STORAGE_KEYS.lang, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  applyTranslations();
  renderNavCats();
  renderSidebarCats();
  if (typeof renderProducts === 'function') renderProducts();
  if (typeof renderCart === 'function') renderCart();
  if (typeof renderWishlist === 'function') renderWishlist();
  if (typeof renderProductDetail === 'function') renderProductDetail();
  if (typeof renderCategories === 'function') renderCategories();
  if (typeof renderOffers === 'function') renderOffers();
  if (typeof renderClearance === 'function') renderClearance();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[currentLang][key]) el.textContent = i18n[currentLang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (i18n[currentLang][key]) el.placeholder = i18n[currentLang][key];
  });
  updateLangButton();
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg || '';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function updateLangButton() {
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = currentLang === 'ar' ? 'EN' : 'عربي';
}

function addToCart(productId, qty = 1) {
  const product = getProducts().find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  window.cart = cart;
  saveCart();
  showToast(t('added_cart'));
}

function removeFromCart(productId) {
  const idx = cart.findIndex(i => i.id === productId);
  if (idx > -1) cart.splice(idx, 1);
  window.cart = cart;
  saveCart();
  if (typeof renderCart === 'function') renderCart();
}

function updateCartQty(productId, qty) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart();
    if (typeof renderCart === 'function') renderCart();
  }
}

function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast(t('removed_wish'));
  } else {
    wishlist.push(productId);
    showToast(t('added_wish'));
  }
  window.wishlist = wishlist;
  saveWishlist();
  // Update all wishlist buttons for this product
  document.querySelectorAll('[data-wish-id="' + productId + '"]').forEach(btn => {
    const active = wishlist.includes(productId);
    btn.classList.toggle('active', active);
    if (btn.classList.contains('wishlist-btn')) {
      btn.innerHTML = icon(active ? 'heartFill' : 'heart', 'wishlist-icon', 19);
    }
  });
  if (typeof renderWishlist === 'function') renderWishlist();
}

function isInWishlist(id) {
  return wishlist.includes(id);
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = products.find(pr => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function formatPrice(price) {
  return currentLang === 'ar' ? `${price.toFixed(2)} $` : `$${price.toFixed(2)}`;
}

function getProductName(p) {
  return currentLang === 'ar' ? p.name_ar : p.name_en;
}

function getProductDesc(p) {
  return currentLang === 'ar' ? p.desc_ar : p.desc_en;
}

function getCategoryName(catId) {
  const cat = SITE_CATEGORIES.find(c => c.id === catId);
  return cat ? (currentLang === 'ar' ? cat.name_ar : cat.name_en) : catId;
}

// Product card HTML generator
function productCardHTML(p) {
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const inWish = isInWishlist(p.id);
  const desc = getProductDesc(p);
  const shortDesc = desc.length > 70 ? desc.slice(0, 70) + '…' : desc;
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img-wrap">
        <a href="product.html?id=${p.id}">
          <img src="${p.image}" alt="${getProductName(p)}" loading="lazy">
        </a>
        ${discount > 0 ? `<span class="product-badge">-${discount}%</span>` : ''}
        <button class="wishlist-btn ${inWish ? 'active' : ''}" data-wish-id="${p.id}" onclick="toggleWishlist(${p.id})" title="Wishlist">
          ${icon(inWish ? 'heartFill' : 'heart', 'wishlist-icon', 19)}
        </button>
      </div>
      <div class="product-info">
        <div class="product-cat">${getCategoryName(p.category)}</div>
        <a href="product.html?id=${p.id}" class="product-name">${getProductName(p)}</a>
        <p class="product-desc">${shortDesc}</p>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</span>
          <span>(${p.reviews || Math.round((p.rating||4)*17+5)})</span>
        </div>
        <div class="product-price">
          <span class="price-current">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn btn-primary btn-sm" onclick="addToCart(${p.id})">${t('add_to_cart')}</button>
        </div>
      </div>
    </div>
  `;
}

// Header HTML

function getSidebarHTML() {
  return `
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <a href="index.html" class="logo" dir="ltr" onclick="closeSidebar()">
          <div class="logo-icon">N</div>
          <span class="logo-text">Nova<span>Mart</span></span>
        </a>
        <button class="sidebar-close" onclick="closeSidebar()" aria-label="Close">${icon('close', 'close-icon', 19)}</button>
      </div>
      <nav class="sidebar-nav">
        <a href="index.html" onclick="closeSidebar()">${icon('home', 'nav-icon', 19)} <span data-i18n="home">Home</span></a>
        <a href="about.html" onclick="closeSidebar()">${icon('sparkles', 'nav-icon', 19)} <span data-i18n="about_us">About Us</span></a>
        <a href="index.html#categories" onclick="closeSidebar()">${icon('box', 'nav-icon', 19)} <span data-i18n="categories">Categories</span></a>
        <a href="index.html#products" onclick="closeSidebar()">${icon('shoppingBag', 'nav-icon', 19)} <span data-i18n="all_products">All Products</span></a>
        <a href="index.html#offers" onclick="closeSidebar()">${icon('tag', 'nav-icon', 19)} <span data-i18n="offers">Special Offers</span></a>
        <a href="cart.html" onclick="closeSidebar()">${icon('cart', 'nav-icon', 19)} <span data-i18n="cart">Cart</span></a>
        <a href="wishlist.html" onclick="closeSidebar()">${icon('heart', 'nav-icon', 19)} <span data-i18n="wishlist">Wishlist</span></a>
        <a href="login.html" onclick="closeSidebar()">${icon('user', 'nav-icon', 19)} <span data-i18n="account">Account</span></a>
      </nav>
      <div class="sidebar-cats">
        <h4 data-i18n="categories">Categories</h4>
        <div id="sidebarCats"></div>
      </div>
      <div class="sidebar-footer">
        <p class="sidebar-location">${icon('mapPin', 'inline-icon', 16)} <span data-i18n="showroom_address">Pyramids Road, Giza, Egypt</span></p>
        <p data-i18n="home_delivery">Home Delivery</p>
        <p data-i18n="showroom_pickup">Showroom Pickup</p>
      </div>
    </aside>
  `;
}

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('sidebarOverlay')?.classList.toggle('open');
  document.body.classList.toggle('sidebar-open');
}

function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('open');
  document.body.classList.remove('sidebar-open');
}

function renderSidebarCats() {
  const el = document.getElementById('sidebarCats');
  if (!el) return;
  el.innerHTML = SITE_CATEGORIES.filter(c => c.id !== 'all').map(c =>
    `<a href="category.html?id=${c.id}" onclick="closeSidebar()">${currentLang === 'ar' ? c.name_ar : c.name_en}</a>`
  ).join('');
}


function getHeaderHTML() {
  return `
    <header class="header">
      <div class="container header-top">
        <button class="menu-btn" id="menuBtn" onclick="toggleSidebar()" aria-label="Menu">${icon('menu', 'menu-icon', 21)}</button>
        <a href="index.html" class="logo" dir="ltr">
          <div class="logo-icon">N</div>
          <span class="logo-text">Nova<span>Mart</span></span>
        </a>
        <div class="search-bar">
          <input type="text" id="searchInput" data-i18n-placeholder="search_placeholder" placeholder="Search products..." onkeypress="if(event.key==='Enter') doSearch()">
          <button onclick="doSearch()" aria-label="Search">${icon('search', 'search-icon', 19)}</button>
        </div>
        <div class="header-actions">
          <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()"></button>
          <button class="lang-toggle" id="langToggle" onclick="toggleLang()"></button>
          <a href="wishlist.html" class="header-btn" aria-label="Wishlist">
            <span class="icon">${icon('heart', 'header-icon', 19)}</span>
            <span data-i18n="wishlist">Wishlist</span>
            <span class="badge" data-wish-count style="display:none">0</span>
          </a>
          <a href="cart.html" class="header-btn" aria-label="Cart">
            <span class="icon">${icon('cart', 'header-icon', 19)}</span>
            <span data-i18n="cart">Cart</span>
            <span class="badge" data-cart-count style="display:none">0</span>
          </a>
          <a href="login.html" class="header-btn" id="accountBtn" aria-label="Account">
            <span class="icon">${icon('user', 'header-icon', 19)}</span>
            <span data-i18n="account">Account</span>
          </a>
        </div>
      </div>
      <nav class="nav-cats">
        <div class="container">
          <ul id="navCats"></ul>
        </div>
      </nav>
    </header>
  `;
}

function getFooterHTML() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4 data-i18n="footer_about">About NovaMart</h4>
            <p data-i18n="footer_about_text" style="font-size:0.9rem;line-height:1.6"></p>
          </div>
          <div>
            <h4 data-i18n="footer_links">Quick Links</h4>
            <a href="index.html" data-i18n="home">Home</a>
            <a href="about.html" data-i18n="about_us">About Us</a>
            <a href="index.html#products" data-i18n="all_products">All Products</a>
            <a href="cart.html" data-i18n="cart">Cart</a>
            <a href="wishlist.html" data-i18n="wishlist">Wishlist</a>
          </div>
          <div>
            <h4 data-i18n="footer_contact">Contact</h4>
            <a href="mailto:support@novamart.com">support@novamart.com</a>
            <a href="tel:+20238551234">+20 2 3855 1234</a>
            <p style="margin-top:8px;font-size:0.9rem">
              <span class="footer-icon-wrap">${icon('mapPin', 'inline-icon', 16)}</span> <span data-i18n="address_full">Pyramids Road, Giza, Egypt</span>
            </p>
            <p style="margin-top:8px;font-size:0.85rem">
              <span data-i18n="free_shipping">Free shipping over $50</span> · 
              <span data-i18n="secure">Secure checkout</span>
            </p>
          </div>
          <div>
            <h4 data-i18n="return_policy_title">Return Policy</h4>
            <p style="font-size:0.9rem;line-height:1.6" data-i18n="returns_policy"></p>
            <p style="margin-top:8px;font-size:0.85rem">
              <span data-i18n="free_return">30-Day Free Returns</span> · 
              <span data-i18n="ssl">SSL Encrypted</span>
            </p>
          </div>
        </div>
        <div class="footer-bottom" data-i18n="footer_rights">© 2026 NovaMart. All rights reserved.</div>
      </div>
    </footer>
  `;
}

function renderNavCats() {
  const ul = document.getElementById('navCats');
  if (!ul) return;
  const params = new URLSearchParams(location.search);
  const current = params.get('id') || params.get('cat') || 'all';
  ul.innerHTML = SITE_CATEGORIES.map(c => {
    const href = c.id === 'all' ? 'index.html#products' : `category.html?id=${c.id}`;
    const active = current === c.id ? 'active' : '';
    const name = currentLang === 'ar' ? c.name_ar : c.name_en;
    return `<li><a href="${href}" class="${active}">${name}</a></li>`;
  }).join('');
}

function toggleLang() {
  setLanguage(currentLang === 'en' ? 'ar' : 'en');
  renderNavCats();
  renderSidebarCats();
  applyTranslations();
}

function doSearch() {
  const q = document.getElementById('searchInput')?.value?.trim();
  if (q) {
    window.location.href = `index.html?search=${encodeURIComponent(q)}`;
  }
}

// Init common
function initCommon() {
  // Inject header/footer if placeholders exist
  const headerEl = document.getElementById('site-header');
  if (headerEl) headerEl.innerHTML = getHeaderHTML();
  if (!document.getElementById('sidebar')) {
    document.body.insertAdjacentHTML('afterbegin', getSidebarHTML());
  }
  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = getFooterHTML();
  renderSidebarCats();

  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  applyTranslations();
  applyTheme();
  renderNavCats();
  updateBadges();

  // Account button
  const accBtn = document.getElementById('accountBtn');
  if (accBtn && currentUser) {
    accBtn.querySelector('span:last-child').textContent = currentUser.name?.split(' ')[0] || t('account');
  }
}

// Expose globals
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.toggleLang = toggleLang;
window.doSearch = doSearch;
window.removeFromCart = removeFromCart;
window.updateCartQty = updateCartQty;
window.t = t;
window.formatPrice = formatPrice;
window.getProductName = getProductName;
window.getProductDesc = getProductDesc;
window.getCategoryName = getCategoryName;
window.productCardHTML = productCardHTML;
window.getCartTotal = getCartTotal;
window.showToast = showToast;
window.cart = cart;
window.wishlist = wishlist;
window.currentLang = currentLang;
window.products = products;
window.SITE_CATEGORIES = SITE_CATEGORIES;

window.initCommon = initCommon;
window.toggleTheme = toggleTheme;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.setLanguage = setLanguage;
window.applyTranslations = applyTranslations;
window.updateLangButton = updateLangButton;
window.updateBadges = updateBadges;
window.saveCart = saveCart;
window.currentUser = currentUser;
window.STORAGE_KEYS = STORAGE_KEYS;
