/**
 * cart.js — localStorage cart management
 * All pages share this module via <script src="../js/cart.js">
 */

const Cart = (() => {
  const STORAGE_KEY = 'dm_cart';

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch { return []; }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    _dispatch();
  }

  function _dispatch() {
    window.dispatchEvent(new CustomEvent('cartchange'));
  }

  function getItems() { return load(); }

  function getCount() {
    return load().reduce((sum, i) => sum + i.quantity, 0);
  }

  function getSubtotal() {
    return load().reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  function getDeliveryFee() {
    const items = load();
    if (!items.length) return 0;
    return getSubtotal() >= 1500 ? 0 : 50;
  }

  function getTotal() {
    return getSubtotal() + getDeliveryFee();
  }

  /**
   * Add a product to the cart (or increase quantity if already present).
   * @param {object} product — must have: id, name_ar, name_en, price, image, category
   * @param {number} qty
   */
  function addItem(product, qty = 1) {
    const items = load();
    const idx = items.findIndex(i => i.id === product.id);
    if (idx !== -1) {
      items[idx].quantity += qty;
    } else {
      items.push({
        id: product.id,
        name_ar: product.name_ar,
        name_en: product.name_en,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: qty
      });
    }
    save(items);
  }

  function removeItem(id) {
    save(load().filter(i => i.id !== id));
  }

  function updateQty(id, qty) {
    if (qty <= 0) { removeItem(id); return; }
    const items = load();
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) { items[idx].quantity = qty; save(items); }
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY);
    _dispatch();
  }

  return { getItems, getCount, getSubtotal, getDeliveryFee, getTotal, addItem, removeItem, updateQty, clear };
})();

// ── Update every cart badge on the page whenever the cart changes ──
function updateCartBadge() {
  const count = Cart.getCount();
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

window.addEventListener('cartchange', updateCartBadge);
document.addEventListener('DOMContentLoaded', updateCartBadge);
