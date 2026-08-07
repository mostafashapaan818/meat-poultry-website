/**
 * main.js — Shared utilities: header, toast, product card rendering, etc.
 * Loaded on every public page.
 *
 * basePath: '' for root-level pages (index, category, cart, checkout)
 *           '../' for pages inside /staff/
 */

/* ── Header HTML (injected into #site-header placeholder) ── */
function buildHeaderHTML(activePage = '', basePath = '') {
  const lang = i18n.getLang();
  return `
    <header class="site-header" id="site-header">
      <div class="container">
        <div class="header-inner">
          <a href="${basePath}index.html" class="brand">
            <span class="brand-name"><span class="brand-star">★</span> <span data-i18n="brandName">${i18n.t('brandName')}</span></span>
            <span class="brand-tag" data-i18n="brandTagline">${i18n.t('brandTagline')}</span>
          </a>

          <nav class="main-nav" id="main-nav">
            <a href="${basePath}index.html"                class="${activePage === 'home'    ? 'active' : ''}" data-i18n="navHome">${i18n.t('navHome')}</a>
            <a href="${basePath}category.html?cat=meats"   class="${activePage === 'meats'   ? 'active' : ''}" data-i18n="navMeats">${i18n.t('navMeats')}</a>
            <a href="${basePath}category.html?cat=poultry" class="${activePage === 'poultry' ? 'active' : ''}" data-i18n="navPoultry">${i18n.t('navPoultry')}</a>
            <a href="${basePath}category.html?cat=other"   class="${activePage === 'other'   ? 'active' : ''}" data-i18n="navOther">${i18n.t('navOther')}</a>
          </nav>

          <div class="header-actions">
            <button class="lang-btn" id="lang-toggle" onclick="i18n.toggleLang()" aria-label="Switch language">
              🌐 <span data-i18n="langToggle">${i18n.t('langToggle')}</span>
            </button>

            <a href="${basePath}cart.html" class="cart-btn" aria-label="Cart">
              🛒
              <span class="cart-badge" id="cart-badge">0</span>
            </a>
          </div>

          <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu" onclick="toggleMobileNav()">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <nav class="mobile-nav" id="mobile-nav">
        <a href="${basePath}index.html"                class="${activePage === 'home'    ? 'active' : ''}" data-i18n="navHome">${i18n.t('navHome')}</a>
        <a href="${basePath}category.html?cat=meats"   class="${activePage === 'meats'   ? 'active' : ''}" data-i18n="navMeats">${i18n.t('navMeats')}</a>
        <a href="${basePath}category.html?cat=poultry" class="${activePage === 'poultry' ? 'active' : ''}" data-i18n="navPoultry">${i18n.t('navPoultry')}</a>
        <a href="${basePath}category.html?cat=other"   class="${activePage === 'other'   ? 'active' : ''}" data-i18n="navOther">${i18n.t('navOther')}</a>
        <a href="${basePath}staff/login.html" data-i18n="navStaff">${i18n.t('navStaff')}</a>
      </nav>
    </header>`;
}

function injectHeader(activePage = '', basePath = '') {
  const placeholder = document.getElementById('header-placeholder');
  if (placeholder) {
    placeholder.outerHTML = buildHeaderHTML(activePage, basePath);
  }
}

/* ── Mobile nav toggle ── */
function toggleMobileNav() {
  const btn = document.getElementById('menu-toggle');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.classList.toggle('open');
  nav.classList.toggle('open');
}

/* ── Footer HTML ── */
function buildFooterHTML(basePath = '') {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-col">
            <div class="footer-brand-name"><span class="brand-star">★</span> <span data-i18n="brandName">${i18n.t('brandName')}</span></div>
            <p class="footer-about" data-i18n="footerAbout">${i18n.t('footerAbout')}</p>
          </div>
          <div class="footer-col">
            <h4 data-i18n="footerSections">${i18n.t('footerSections')}</h4>
            <div class="footer-links">
              <a href="${basePath}category.html?cat=meats"   data-i18n="navMeats">${i18n.t('navMeats')}</a>
              <a href="${basePath}category.html?cat=poultry" data-i18n="navPoultry">${i18n.t('navPoultry')}</a>
              <a href="${basePath}category.html?cat=other"   data-i18n="navOther">${i18n.t('navOther')}</a>
              <a href="${basePath}staff/login.html"          data-i18n="navStaff">${i18n.t('navStaff')}</a>
            </div>
          </div>
          <div class="footer-col">
            <h4 data-i18n="footerContact">${i18n.t('footerContact')}</h4>
            <div class="footer-contacts">
              <p>📍 <span data-i18n="footerAddress">${i18n.t('footerAddress')}</span></p>
              <p>📞 <span data-i18n="footerPhone">${i18n.t('footerPhone')}</span></p>
              <p>✉ <span data-i18n="footerEmail">${i18n.t('footerEmail')}</span></p>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${year} <span data-i18n="brandName">${i18n.t('brandName')}</span>. <span data-i18n="footerCopy">${i18n.t('footerCopy')}</span>.</span>
          <a href="${basePath}staff/login.html" style="color:var(--text-dim); text-decoration:underline;" data-i18n="navStaff">${i18n.t('navStaff')}</a>
        </div>
      </div>
    </footer>`;
}

function injectFooter(basePath = '') {
  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.outerHTML = buildFooterHTML(basePath);
  }
}

/* ── Toast notifications ── */
function showToast(message, type = 'default', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `<span>${icon}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ── Product card builder ── */
function buildProductCard(product) {
  const lang  = i18n.getLang();
  const name  = lang === 'ar' ? product.name_ar  : product.name_en;
  const desc  = lang === 'ar' ? product.desc_ar  : product.desc_en;
  const icon  = product.category === 'meats' ? '🥩' : product.category === 'poultry' ? '🍗' : '🔥';

  const frozenBadge = `<span class="badge badge-frozen">${i18n.t('frozenBadge')}</span>`;
  const bestBadge   = product.is_bestseller
    ? `<span class="badge badge-best">${i18n.t('bestsellerBadge')}</span>` : '';

  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-thumb">
      ${icon}
      <div class="product-badges">${frozenBadge}${bestBadge}</div>
    </div>
    <div class="product-body">
      <div class="product-name">${name}</div>
      <div class="product-desc">${desc}</div>
      <div class="product-weight">⚖ ${product.weight}</div>
      <div class="product-footer">
        <div class="product-price">
          ${product.price}<span class="currency"> ${i18n.t('egp')}</span>
        </div>
        <button class="atc-btn" data-id="${product.id}" aria-label="${i18n.t('addToCart')}">
          + <span>${i18n.t('addToCart')}</span>
        </button>
      </div>
    </div>`;

  // Add-to-cart handler
  card.querySelector('.atc-btn').addEventListener('click', function () {
    Cart.addItem(product);
    this.classList.add('added');
    this.querySelector('span').textContent = i18n.t('addedToCart');
    showToast(`${name} — ${i18n.t('addedToCart')}`, 'success');
    setTimeout(() => {
      this.classList.remove('added');
      this.querySelector('span').textContent = i18n.t('addToCart');
    }, 1800);
  });

  return card;
}

/* Re-render product cards when language changes */
window.addEventListener('langchange', () => {
  // Re-apply i18n to static elements (done inside i18n.applyLang)
  // Dynamic ATC buttons need special handling — handled per page
  updateCartBadge();
});

/* Govs select builder (used in checkout) */
function buildGovernoratesSelect(selectEl) {
  const lang = i18n.getLang();
  const govs = GOVERNORATES[lang];
  selectEl.innerHTML = `<option value="" data-i18n="fieldGovPH">${i18n.t('fieldGovPH')}</option>`;
  govs.forEach((g, i) => {
    const en = GOVERNORATES.en[i];
    const opt = document.createElement('option');
    opt.value = en;
    opt.textContent = g;
    selectEl.appendChild(opt);
  });
}

/* Utility: generate order reference */
function generateOrderRef() {
  return 'DM-' + Math.floor(100000 + Math.random() * 900000);
}

/* Format price */
function fmt(price) {
  return `${price.toLocaleString('ar-EG')} <span class="cur">${i18n.t('egp')}</span>`;
}
