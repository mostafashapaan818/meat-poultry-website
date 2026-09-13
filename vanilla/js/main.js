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
            <img src="${basePath}images/logo_v2.png" alt="Logo" class="brand-logo">
            <div class="brand-text">
              <span class="brand-name"><span data-i18n="brandName">${i18n.t('brandName')}</span></span>
              <span class="brand-tag" data-i18n="brandTagline">${i18n.t('brandTagline')}</span>
            </div>
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
        <a href="${basePath}track-order.html"          class="${activePage === 'track'   ? 'active' : ''}">🔍 تتبع الطلب</a>
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
            <div class="footer-brand-name" style="display:flex; align-items:center; gap:8px;">
              <img src="${basePath}images/logo_v2.png" alt="Logo" style="width:32px; height:32px; border-radius:50%; object-fit:cover;">
              <span data-i18n="brandName">${i18n.t('brandName')}</span>
            </div>
            <p class="footer-about" data-i18n="footerAbout">${i18n.t('footerAbout')}</p>
          </div>
          <div class="footer-col">
            <h4 data-i18n="footerSections">${i18n.t('footerSections')}</h4>
            <div class="footer-links">
              <a href="${basePath}category.html?cat=meats"   data-i18n="navMeats">${i18n.t('navMeats')}</a>
              <a href="${basePath}category.html?cat=poultry" data-i18n="navPoultry">${i18n.t('navPoultry')}</a>
              <a href="${basePath}category.html?cat=other"   data-i18n="navOther">${i18n.t('navOther')}</a>
              <a href="${basePath}track-order.html"          style="color:var(--primary); font-weight:bold;">🔍 تتبع الطلب</a>
            </div>
          </div>
          <div class="footer-col">
            <h4 data-i18n="footerContact">${i18n.t('footerContact')}</h4>
            <div class="footer-contacts">
              <p>📍 <span data-i18n="footerAddress">${i18n.t('footerAddress')}</span></p>
              <p><a href="https://wa.me/201043066133" target="_blank" style="color:#10b981;font-weight:bold;text-decoration:none;">💬 <span>01043066133 (واتساب)</span></a></p>
              <p><a href="mailto:aelhawary557@gmail.com" style="color:var(--text-dim);text-decoration:none;">✉️ <span>aelhawary557@gmail.com</span></a></p>
            </div>
            <div style="margin-top:0.8rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
              <a href="https://www.facebook.com/people/ديليشس-ميتس/61593413048377/?rdid=V5pFPPM3yFPvPBt4&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19RoBJBhqE%2F%3Fref%3D1" target="_blank" style="background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid rgba(59,130,246,0.3);padding:.3rem .6rem;border-radius:.5rem;font-size:.75rem;font-weight:bold;text-decoration:none;">فيسبوك</a>
              <a href="https://www.instagram.com/delicious_meats.eg?stkn=ZHVieG1ibmM5ZXF2" target="_blank" style="background:rgba(236,72,153,0.15);color:#f472b6;border:1px solid rgba(236,72,153,0.3);padding:.3rem .6rem;border-radius:.5rem;font-size:.75rem;font-weight:bold;text-decoration:none;">إنستغرام</a>
              <a href="https://wa.me/201043066133" target="_blank" style="background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:.3rem .6rem;border-radius:.5rem;font-size:.75rem;font-weight:bold;text-decoration:none;">واتساب</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${year} <span data-i18n="brandName">${i18n.t('brandName')}</span>. <span data-i18n="footerCopy">${i18n.t('footerCopy')}</span>.</span>
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
  const isMeat = product.category === 'meats';

  const frozenBadge = `<span class="badge badge-frozen">${i18n.t('frozenBadge')}</span>`;
  const bestBadge   = product.is_bestseller
    ? `<span class="badge badge-best">${i18n.t('bestsellerBadge')}</span>` : '';

  let selectedWeight = '1kg';
  const halfPrice = Math.round(product.price / 2);

  const weightSelectorHTML = isMeat ? `
    <div class="weight-selector-pills" style="display:flex; gap:6px; margin:8px 0; background:rgba(0,0,0,0.3); padding:4px; border-radius:10px; border:1px solid var(--border);">
      <button type="button" class="w-pill active" data-w="1kg" style="flex:1; padding:4px 6px; font-size:11px; font-weight:bold; border-radius:6px; border:none; background:var(--primary); color:#000; cursor:pointer;">
        ${lang === 'ar' ? '1 كجم' : '1 kg'} (${product.price} ج.م)
      </button>
      <button type="button" class="w-pill" data-w="0.5kg" style="flex:1; padding:4px 6px; font-size:11px; font-weight:bold; border-radius:6px; border:none; background:transparent; color:#888; cursor:pointer;">
        ${lang === 'ar' ? 'نصف كجم' : '0.5 kg'} (${halfPrice} ج.م)
      </button>
    </div>
  ` : `<div class="product-weight">⚖ ${product.weight}</div>`;

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
      ${weightSelectorHTML}
      <div class="product-footer">
        <div class="product-price">
          <span class="price-val">${product.price}</span><span class="currency"> ${i18n.t('egp')}</span>
        </div>
        <button class="atc-btn" data-id="${product.id}" aria-label="${i18n.t('addToCart')}">
          + <span>${i18n.t('addToCart')}</span>
        </button>
      </div>
    </div>`;

  // Weight toggle handler for meats
  if (isMeat) {
    const pills = card.querySelectorAll('.w-pill');
    const priceVal = card.querySelector('.price-val');
    pills.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        pills.forEach(p => {
          p.style.background = 'transparent';
          p.style.color = '#888';
          p.classList.remove('active');
        });
        this.style.background = 'var(--primary)';
        this.style.color = '#000';
        this.classList.add('active');
        selectedWeight = this.getAttribute('data-w');
        if (selectedWeight === '0.5kg') {
          priceVal.textContent = halfPrice;
        } else {
          priceVal.textContent = product.price;
        }
      });
    });
  }

  // Add-to-cart handler
  card.querySelector('.atc-btn').addEventListener('click', function () {
    let itemToAdd = product;
    if (isMeat && selectedWeight === '0.5kg') {
      itemToAdd = {
        ...product,
        id: `${product.id}_05kg`,
        name_ar: `${product.name_ar} (نصف كجم)`,
        name_en: `${product.name_en} (0.5 kg)`,
        price: halfPrice,
        weight: 'نصف كجم'
      };
    }

    Cart.addItem(itemToAdd);
    this.classList.add('added');
    this.querySelector('span').textContent = i18n.t('addedToCart');
    showToast(`${lang === 'ar' ? itemToAdd.name_ar : itemToAdd.name_en} — ${i18n.t('addedToCart')}`, 'success');
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
