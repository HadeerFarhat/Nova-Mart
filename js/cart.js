// ===== NovaMart — cart page =====
function renderCart() {
  const el = document.getElementById('cartContent');
  if (cart.length === 0) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="icon">${icon('cart', 'empty-icon', 46)}</div>
        <p data-i18n="empty_cart">Your cart is empty</p>
        <a href="index.html" class="btn btn-primary mt-2" data-i18n="continue_shopping">Continue Shopping</a>
      </div>
    `;
    return;
  }

  let itemsHTML = cart.map(item => {
    const p = products.find(pr => pr.id === item.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${getProductName(p)}"></a>
        <div>
          <a href="product.html?id=${p.id}" class="cart-item-name">${getProductName(p)}</a>
          <div class="text-muted" style="font-size:0.85rem">${getCategoryName(p.category)}</div>
          <div class="price-current" style="margin-top:4px">${formatPrice(p.price)}</div>
        </div>
        <div class="qty-control">
          <button onclick="updateCartQty(${p.id}, ${item.qty - 1})" aria-label="Decrease quantity">${icon('minus', 'qty-icon', 16)}</button>
          <span>${item.qty}</span>
          <button onclick="updateCartQty(${p.id}, ${item.qty + 1})" aria-label="Increase quantity">${icon('plus', 'qty-icon', 16)}</button>
        </div>
        <div class="fw-bold item-total">${formatPrice(p.price * item.qty)}</div>
        <button class="btn btn-sm remove-btn" style="background:#fee2e2;color:#b91c1c" onclick="removeFromCart(${p.id})">${t('remove')}</button>
      </div>
    `;
  }).join('');

  const total = getCartTotal();
  el.innerHTML = `
    <div class="cart-table">${itemsHTML}</div>
    <div class="cart-summary" style="max-width:360px;margin-left:auto;">
      <div class="summary-row">
        <span data-i18n="subtotal">Subtotal</span>
        <span>${formatPrice(total)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${total >= 50 ? 'FREE' : formatPrice(9.99)}</span>
      </div>
      <div class="summary-row total">
        <span data-i18n="total">Total</span>
        <span>${formatPrice(total + (total >= 50 ? 0 : 9.99))}</span>
      </div>
      <a href="checkout.html" class="btn btn-primary btn-block mt-2" data-i18n="checkout">Checkout</a>
      <a href="index.html" class="btn btn-outline btn-block mt-2" data-i18n="continue_shopping">Continue Shopping</a>
    </div>
  `;
  applyTranslations();
}

const originalSetLang = setLanguage;
window.setLanguage = function(lang) {
  originalSetLang(lang);
  renderCart();
};

window.renderCart = renderCart;

document.addEventListener('DOMContentLoaded', () => {
  initCommon();
  renderCart();
});
