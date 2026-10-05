// ===== NovaMart — checkout page =====
function renderCheckout() {
  const el = document.getElementById('checkoutContent');
  if (cart.length === 0) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="icon">${icon('cart', 'empty-icon', 46)}</div>
        <p data-i18n="empty_cart">Your cart is empty</p>
        <a href="index.html" class="btn btn-primary mt-2" data-i18n="continue_shopping">Continue Shopping</a>
      </div>
    `;
    applyTranslations();
    return;
  }

  const total = getCartTotal();
  const shipping = total >= 50 ? 0 : 9.99;
  const grand = total + shipping;

  el.innerHTML = `
    <div class="checkout-grid">
      <div>
        <form id="checkoutForm" onsubmit="placeOrder(event)">
          <div class="form-group">
            <label data-i18n="name">Full Name</label>
            <input type="text" id="shipName" required value="${currentUser?.name || ''}">
          </div>
          <div class="form-group">
            <label data-i18n="email">Email</label>
            <input type="email" id="shipEmail" required value="${currentUser?.email || ''}">
          </div>
          <div class="form-group">
            <label data-i18n="delivery_method">Delivery Method</label>
            <select id="deliveryMethod" onchange="toggleDeliveryAddress()">
              <option value="home" data-i18n="home_delivery">Home Delivery</option>
              <option value="showroom" data-i18n="showroom_pickup">Showroom Pickup</option>
            </select>
          </div>
          <div class="form-group" id="addressGroup">
            <label data-i18n="shipping">Shipping Address</label>
            <input type="text" id="shipAddress" required placeholder="123 Main St, City, Country">
          </div>
          <div class="form-group" id="showroomInfo" style="display:none">
            <div class="secure-badge" style="margin-bottom:8px">${icon('mapPin', 'inline-icon', 16)} <span data-i18n="showroom_address">Pyramids Road, Giza, Egypt</span></div>
            <p style="font-size:0.85rem;color:var(--text-muted)" data-i18n="showroom_pickup_desc"></p>
          </div>
          <div class="form-group">
            <label data-i18n="payment">Payment Method</label>
            <select id="paymentMethod" onchange="toggleCardForm()">
              <option value="cod" data-i18n="cod">Cash on Delivery</option>
              <option value="card" data-i18n="card">Credit / Debit Card</option>
            </select>
          </div>
          <div id="cardForm" class="payment-form" style="display:none">
            <div class="form-group">
              <label data-i18n="card_number">Card Number</label>
              <input type="text" id="cardNum" placeholder="**** **** **** ****" maxlength="19" autocomplete="cc-number">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label data-i18n="expiry">Expiry</label>
                <input type="text" id="cardExp" placeholder="MM/YY" maxlength="5" autocomplete="cc-exp">
              </div>
              <div class="form-group">
                <label data-i18n="cvv">CVV</label>
                <input type="password" id="cardCvv" placeholder="***" maxlength="4" autocomplete="cc-csc">
              </div>
            </div>
            <div class="ssl-note">${icon('lock', 'inline-icon', 16)} <span data-i18n="ssl">SSL Encrypted</span> — Your data is protected</div>
          </div>
          <button type="submit" class="btn btn-primary btn-block" data-i18n="pay_now">Pay Securely</button>
        </form>
      </div>
      <div class="cart-summary">
        <h3 style="margin-bottom:16px" data-i18n="cart">Order Summary</h3>
        ${cart.map(item => {
          const p = products.find(pr => pr.id === item.id);
          if (!p) return '';
          return `<div class="summary-row"><span>${getProductName(p)} × ${item.qty}</span><span>${formatPrice(p.price * item.qty)}</span></div>`;
        }).join('')}
        <div class="summary-row"><span data-i18n="subtotal">Subtotal</span><span>${formatPrice(total)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
        <div class="summary-row total"><span data-i18n="total">Total</span><span>${formatPrice(grand)}</span></div>
        <p style="margin-top:12px;font-size:0.85rem;color:var(--text-muted)" data-i18n="returns_policy"></p>
      </div>
    </div>
  `;
  applyTranslations();
}


function toggleDeliveryAddress() {
  const method = document.getElementById('deliveryMethod')?.value || 'home';
  const addr = document.getElementById('addressGroup');
  const showroom = document.getElementById('showroomInfo');
  const shipInput = document.getElementById('shipAddress');
  if (method === 'showroom') {
    if (addr) addr.style.display = 'none';
    if (showroom) showroom.style.display = 'block';
    if (shipInput) shipInput.required = false;
  } else {
    if (addr) addr.style.display = 'block';
    if (showroom) showroom.style.display = 'none';
    if (shipInput) shipInput.required = true;
  }
}
window.toggleDeliveryAddress = toggleDeliveryAddress;

function toggleCardForm() {
  const method = document.getElementById('paymentMethod').value;
  const form = document.getElementById('cardForm');
  if (form) form.style.display = method === 'card' ? 'block' : 'none';
}
window.toggleCardForm = toggleCardForm;

function placeOrder(e) {
  e.preventDefault();
  const method = document.getElementById('paymentMethod').value;
  if (method === 'card') {
    const num = document.getElementById('cardNum').value.replace(/\s/g,'');
    const exp = document.getElementById('cardExp').value;
    const cvv = document.getElementById('cardCvv').value;
    if (num.length < 13 || !exp || cvv.length < 3) {
      showToast(currentLang === 'ar' ? 'يرجى إدخال بيانات البطاقة بشكل صحيح' : 'Please enter valid card details');
      return;
    }
  }
  cart.length = 0;
  window.cart = cart;
  saveCart();
  updateBadges();
  showToast(t('order_success') || t('order_placed'));
  setTimeout(() => location.href = 'index.html', 1800);
}
window.placeOrder = placeOrder;

const originalSetLang = setLanguage;
window.setLanguage = function(lang) {
  originalSetLang(lang);
  renderCheckout();
};

document.addEventListener('DOMContentLoaded', () => {
  initCommon();
  renderCheckout();
});
