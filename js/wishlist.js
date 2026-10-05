// ===== NovaMart — wishlist page =====
function renderWishlist() {
  const el = document.getElementById('wishlistContent');
  if (wishlist.length === 0) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="icon">${icon('heart', 'empty-icon', 46)}</div>
        <p data-i18n="empty_wishlist">Your wishlist is empty</p>
        <a href="index.html" class="btn btn-primary mt-2" data-i18n="continue_shopping">Continue Shopping</a>
      </div>
    `;
    return;
  }
  const items = wishlist.map(id => products.find(p => p.id === id)).filter(Boolean);
  el.innerHTML = `<div class="product-grid">${items.map(p => productCardHTML(p)).join('')}</div>`;
}

const originalSetLang = setLanguage;
window.setLanguage = function(lang) {
  originalSetLang(lang);
  renderWishlist();
};

window.renderWishlist = renderWishlist;

document.addEventListener('DOMContentLoaded', () => {
  initCommon();
  renderWishlist();
});
