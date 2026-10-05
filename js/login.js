// ===== NovaMart — login page =====
let isRegister = false;

function toggleAuthMode(e) {
  if (e) e.preventDefault();
  isRegister = !isRegister;
  document.getElementById('nameGroup').style.display = isRegister ? 'block' : 'none';
  document.getElementById('confirmGroup').style.display = isRegister ? 'block' : 'none';
  document.getElementById('authTitle').textContent = isRegister ? t('register_title') : t('login_title');
  document.getElementById('authSubtitle').textContent = isRegister
    ? (currentLang === 'ar' ? 'أنشئ حسابك في نوفا مارت' : 'Create your NovaMart account')
    : (currentLang === 'ar' ? 'مرحباً بعودتك إلى نوفا مارت' : 'Welcome back to NovaMart');
  document.getElementById('authSubmit').textContent = isRegister ? t('register') : t('login');
  document.getElementById('authSwitchText').textContent = isRegister ? t('have_account') : t('no_account');
  document.getElementById('authSwitch').textContent = isRegister ? t('login') : t('register');
  document.getElementById('passInput').autocomplete = isRegister ? 'new-password' : 'current-password';
}

function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('emailInput').value.trim();
  const pass = document.getElementById('passInput').value;
  const name = document.getElementById('nameInput').value.trim();

  if (!email || !email.includes('@')) {
    showToast(currentLang === 'ar' ? 'أدخل بريداً إلكترونياً صحيحاً' : 'Enter a valid email');
    return;
  }
  if (pass.length < 6) {
    showToast(currentLang === 'ar' ? 'كلمة المرور 6 أحرف على الأقل' : 'Password must be at least 6 characters');
    return;
  }

  if (isRegister) {
    const confirm = document.getElementById('confirmInput').value;
    if (pass !== confirm) {
      showToast(currentLang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }
    if (!name || name.length < 2) {
      showToast(currentLang === 'ar' ? 'أدخل الاسم بالكامل' : 'Please enter your full name');
      return;
    }
    const user = { name, email };
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    currentUser = user;
    window.currentUser = user;
    showToast(currentLang === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!');
    setTimeout(() => location.href = 'index.html', 1000);
  } else {
    const user = { name: email.split('@')[0], email };
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    currentUser = user;
    window.currentUser = user;
    showToast(currentLang === 'ar' ? 'تم تسجيل الدخول!' : 'Logged in successfully!');
    setTimeout(() => location.href = 'index.html', 1000);
  }
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.user);
  currentUser = null;
  window.currentUser = null;
  location.reload();
}

window.logout = logout;
window.toggleAuthMode = toggleAuthMode;
window.handleAuth = handleAuth;

document.addEventListener('DOMContentLoaded', () => {
  initCommon();
  if (currentUser) {
    document.querySelector('.auth-container').innerHTML = `
      <div class="text-center">
        <div class="logo-icon" style="margin:0 auto 16px;width:48px;height:48px;">N</div>
        <h2>${currentLang === 'ar' ? 'مرحباً' : 'Welcome'}, ${currentUser.name}</h2>
        <p class="text-muted" style="margin:8px 0 20px">${currentUser.email}</p>
        <button class="btn btn-primary btn-block" onclick="logout()">${t('logout')}</button>
        <a href="index.html" class="btn btn-outline btn-block mt-2" data-i18n="continue_shopping">Continue Shopping</a>
      </div>
    `;
    applyTranslations();
  }
});
