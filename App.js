/* ═══════════════════════════════════════════════════
   LUXE Shopping — app.js
   Sections:
   1.  Data (Categories & Products)
   2.  State
   3.  Initialisation
   4.  Categories
   5.  Filter Chips
   6.  Products — Filter & Render
   7.  Wishlist
   8.  Product Modal
   9.  Cart
   10. Checkout
   11. Page Navigation
   12. Toast Notification
   13. Scroll Helper
════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────
   1. DATA
───────────────────────────────────────────────── */
const categories = [
  { id: 'all',         name: 'All Items',    icon: '✦'  },
  { id: 'clothing',    name: 'Clothing',     icon: '👔' },
  { id: 'footwear',    name: 'Footwear',     icon: '👟' },
  { id: 'accessories', name: 'Accessories',  icon: '⌚' },
  { id: 'bags',        name: 'Bags',         icon: '👜' },
  { id: 'beauty',      name: 'Beauty',       icon: '✨' },
  { id: 'sale',        name: 'Sale',         icon: '🏷️' },
];

const products = [
  {
    id: 1,
    brand: 'Artisan Co.',
    name: 'Linen Overshirt',
    price: 3499,
    original: null,
    category: 'clothing',
    emoji: '👔',
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isSale: false,
    desc: 'Crafted from premium 100% European linen. Features a relaxed silhouette with mother-of-pearl buttons and contrast stitching.',
    sizes: ['XS','S','M','L','XL'],
    colors: ['#c9a96e','#4a3728','#d4d0c8'],
  },
  {
    id: 2,
    brand: 'Sole Studio',
    name: 'Leather Derby Shoes',
    price: 6999,
    original: 8999,
    category: 'footwear',
    emoji: '👞',
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isSale: true,
    desc: 'Hand-stitched full-grain leather Derbies with a Blake construction. Aged brass eyelets and a leather-lined interior for exceptional comfort.',
    sizes: ['6','7','8','9','10','11'],
    colors: ['#3d2b1f','#1a1a1a','#b8a99a'],
  },
  {
    id: 3,
    brand: 'Chrono Lab',
    name: 'Minimalist Watch',
    price: 12499,
    original: null,
    category: 'accessories',
    emoji: '⌚',
    rating: 4.7,
    reviews: 203,
    isNew: true,
    isSale: false,
    desc: 'Swiss-movement timepiece in a brushed stainless steel case. Sapphire crystal glass with an anti-reflective coating. Water resistant to 50m.',
    sizes: ['38mm','42mm'],
    colors: ['#c0c0c0','#c9a96e','#1a1a1a'],
  },
  {
    id: 4,
    brand: 'Maison Trait',
    name: 'Canvas Tote Bag',
    price: 2299,
    original: 3299,
    category: 'bags',
    emoji: '👜',
    rating: 4.6,
    reviews: 156,
    isNew: false,
    isSale: true,
    desc: 'Heavy-duty waxed canvas tote with vegetable-tanned leather handles and base reinforcement. Internal zip pocket and magnetic closure.',
    sizes: ['One Size'],
    colors: ['#4a4a42','#8b7355','#2a2a26'],
  },
  {
    id: 5,
    brand: 'Nord Wear',
    name: 'Merino Wool Sweater',
    price: 5499,
    original: null,
    category: 'clothing',
    emoji: '🧥',
    rating: 4.9,
    reviews: 78,
    isNew: true,
    isSale: false,
    desc: '200gsm extra-fine merino wool in a classic ribbed construction. Temperature-regulating, odour-resistant and incredibly soft against skin.',
    sizes: ['XS','S','M','L','XL','XXL'],
    colors: ['#c9a96e','#b5b5b5','#2c3e50','#3d2b1f'],
  },
  {
    id: 6,
    brand: 'Lumière',
    name: 'Facial Serum Ritual',
    price: 4199,
    original: 5500,
    category: 'beauty',
    emoji: '✨',
    rating: 4.8,
    reviews: 312,
    isNew: false,
    isSale: true,
    desc: 'Triple-action vitamin C, niacinamide and hyaluronic acid complex. Clinical-grade concentration in a lightweight, fast-absorbing formula.',
    sizes: ['30ml','50ml'],
    colors: ['#f5e6c8','#e8d5b0'],
  },
  {
    id: 7,
    brand: 'Strider',
    name: 'Suede Chelsea Boots',
    price: 7999,
    original: null,
    category: 'footwear',
    emoji: '🥾',
    rating: 4.7,
    reviews: 64,
    isNew: true,
    isSale: false,
    desc: 'Premium Italian suede uppers with a Goodyear-welted sole. Elastic side gussets for easy on-and-off. Crepe rubber outsole for durability.',
    sizes: ['6','7','8','9','10','11','12'],
    colors: ['#8b7355','#1a1a1a','#4a3728'],
  },
  {
    id: 8,
    brand: 'Atelier Arc',
    name: 'Structured Blazer',
    price: 9499,
    original: 12999,
    category: 'clothing',
    emoji: '🧣',
    rating: 4.6,
    reviews: 91,
    isNew: false,
    isSale: true,
    desc: 'Italian wool-blend blazer with a half-canvas construction. Double-vented rear, notch lapels, and functional sleeve buttons.',
    sizes: ['36','38','40','42','44'],
    colors: ['#2c2c2c','#5a4a3a','#1a2a3a'],
  },
];


/* ─────────────────────────────────────────────────
   2. STATE
───────────────────────────────────────────────── */
let cart           = [];
let wishlist       = [];
let activeCategory = 'all';
let activeFilters  = [];
let currentProduct = null;
let modalQtyCount  = 1;
let selectedSize   = null;
let toastTimeout   = null;


/* ─────────────────────────────────────────────────
   3. INITIALISATION
───────────────────────────────────────────────── */
function init() {
  renderCategories();
  renderFilterChips();
  renderProducts();
}

document.addEventListener('DOMContentLoaded', init);


/* ─────────────────────────────────────────────────
   4. CATEGORIES
───────────────────────────────────────────────── */
function renderCategories() {
  const el = document.getElementById('catsGrid');
  el.innerHTML = categories.map(c => `
    <div class="cat-card ${activeCategory === c.id ? 'active' : ''}"
         onclick="setCategory('${c.id}')">
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
    </div>
  `).join('');
}

function setCategory(id) {
  activeCategory = id;
  renderCategories();
  renderProducts();
  scrollToSection('products');
}


/* ─────────────────────────────────────────────────
   5. FILTER CHIPS
───────────────────────────────────────────────── */
const filterOptions = ['New Arrivals', 'On Sale', 'Under ₹3k', 'Under ₹5k', 'Top Rated'];

function renderFilterChips() {
  document.getElementById('filterChips').innerHTML = filterOptions.map(f => `
    <button class="chip ${activeFilters.includes(f) ? 'active' : ''}"
            onclick="toggleFilter('${f}')">${f}</button>
  `).join('');
}

function toggleFilter(f) {
  activeFilters = activeFilters.includes(f)
    ? activeFilters.filter(x => x !== f)
    : [...activeFilters, f];
  renderFilterChips();
  renderProducts();
}

// Called from promo banner "Shop Sale" button
function setFilter(type) {
  if (type === 'sale') {
    activeFilters = ['On Sale'];
    renderFilterChips();
    renderProducts();
    scrollToSection('products');
  }
}

function clearFilters() {
  activeCategory = 'all';
  activeFilters  = [];
  document.getElementById('searchInput').value = '';
  renderCategories();
  renderFilterChips();
  renderProducts();
}


/* ─────────────────────────────────────────────────
   6. PRODUCTS — FILTER & RENDER
───────────────────────────────────────────────── */
function filterProducts() {
  renderProducts();
}

function getFilteredProducts() {
  const search = document.getElementById('searchInput').value.toLowerCase().trim();
  let list = [...products];

  // Category filter
  if (activeCategory !== 'all') {
    if (activeCategory === 'sale') list = list.filter(p => p.isSale);
    else                            list = list.filter(p => p.category === activeCategory);
  }

  // Chip filters
  if (activeFilters.includes('New Arrivals')) list = list.filter(p => p.isNew);
  if (activeFilters.includes('On Sale'))      list = list.filter(p => p.isSale);
  if (activeFilters.includes('Under ₹3k'))   list = list.filter(p => p.price < 3000);
  if (activeFilters.includes('Under ₹5k'))   list = list.filter(p => p.price < 5000);
  if (activeFilters.includes('Top Rated'))   list = list.filter(p => p.rating >= 4.8);

  // Search
  if (search) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(search)     ||
      p.brand.toLowerCase().includes(search)    ||
      p.category.toLowerCase().includes(search)
    );
  }

  // Sort
  const sort = document.getElementById('sortSelect').value;
  if      (sort === 'price-low')  list.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
  else if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating);
  else if (sort === 'new')        list.sort((a, b) => b.isNew - a.isNew);

  return list;
}

function renderProducts() {
  const list = getFilteredProducts();
  const grid = document.getElementById('productsGrid');

  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div>No products found.</div>
        <button class="btn-ghost" style="margin-top:1rem;padding:.5rem 1.2rem;font-size:.85rem"
                onclick="clearFilters()">Clear Filters</button>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const isWishlisted = wishlist.includes(p.id);
    const starsHTML    = '★'.repeat(Math.floor(p.rating));

    return `
      <div class="product-card fade-up" onclick="openModal(${p.id})">
        <div class="product-img">
          ${p.isNew  ? `<div class="badge badge-new">NEW</div>`  : ''}
          ${p.isSale ? `<div class="badge badge-sale">SALE</div>` : ''}
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}"
                  onclick="event.stopPropagation(); toggleWishlist(${p.id})">
            ${isWishlisted ? '♥' : '♡'}
          </button>
          ${p.emoji}
        </div>
        <div class="product-info">
          <div class="product-brand">${p.brand}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-meta">
            <div class="product-price">
              ₹${p.price.toLocaleString()}
              ${p.original ? `<span class="original">₹${p.original.toLocaleString()}</span>` : ''}
            </div>
            <div style="display:flex;align-items:center">
              <span class="stars">${starsHTML}</span>
              <span class="rating-count">(${p.reviews})</span>
            </div>
          </div>
          <button class="add-cart-btn"
                  onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>`;
  }).join('');
}


/* ─────────────────────────────────────────────────
   7. WISHLIST
───────────────────────────────────────────────── */
function toggleWishlist(id) {
  const wasWishlisted = wishlist.includes(id);
  wishlist = wasWishlisted
    ? wishlist.filter(x => x !== id)
    : [...wishlist, id];
  renderProducts();
  showToast(wishlist.includes(id) ? 'Added to wishlist ♥' : 'Removed from wishlist');
}

function toggleWishlistModal() {
  if (!currentProduct) return;
  toggleWishlist(currentProduct.id);
  const btn = document.getElementById('modalWishlist');
  const isNowWishlisted = wishlist.includes(currentProduct.id);
  btn.textContent = isNowWishlisted ? '♥' : '♡';
  btn.classList.toggle('active', isNowWishlisted);
}


/* ─────────────────────────────────────────────────
   8. PRODUCT MODAL
───────────────────────────────────────────────── */
function openModal(id) {
  currentProduct = products.find(p => p.id === id);
  if (!currentProduct) return;

  modalQtyCount = 1;
  selectedSize  = currentProduct.sizes[0];

  // Populate fields
  document.getElementById('modalImg').innerHTML    = currentProduct.emoji;
  document.getElementById('modalBrand').textContent = currentProduct.brand;
  document.getElementById('modalName').textContent  = currentProduct.name;
  document.getElementById('modalDesc').textContent  = currentProduct.desc;

  document.getElementById('modalPrice').innerHTML =
    `₹${currentProduct.price.toLocaleString()}` +
    (currentProduct.original
      ? ` <span style="color:var(--muted);text-decoration:line-through;font-size:1rem">
           ₹${currentProduct.original.toLocaleString()}
         </span>`
      : '');

  document.getElementById('modalStars').textContent  = '★'.repeat(Math.floor(currentProduct.rating));
  document.getElementById('modalRating').textContent =
    `${currentProduct.rating} (${currentProduct.reviews} reviews)`;

  // Sizes
  document.getElementById('modalSizes').innerHTML = currentProduct.sizes.map(s => `
    <button class="size-opt ${s === selectedSize ? 'active' : ''}"
            onclick="selectSize('${s}')">${s}</button>
  `).join('');

  // Colors
  document.getElementById('modalColors').innerHTML = currentProduct.colors.map((c, i) => `
    <div class="color-opt ${i === 0 ? 'active' : ''}"
         style="background:${c}"
         onclick="selectColor(this)"></div>
  `).join('');

  // Qty
  document.getElementById('modalQtyVal').textContent = 1;

  // Wishlist state
  const wb = document.getElementById('modalWishlist');
  const isWishlisted = wishlist.includes(currentProduct.id);
  wb.textContent = isWishlisted ? '♥' : '♡';
  wb.classList.toggle('active', isWishlisted);

  // Show overlay
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function selectSize(s) {
  selectedSize = s;
  document.querySelectorAll('.size-opt').forEach(el =>
    el.classList.toggle('active', el.textContent.trim() === s)
  );
}

function selectColor(el) {
  document.querySelectorAll('.color-opt').forEach(x => x.classList.remove('active'));
  el.classList.add('active');
}

function modalQty(delta) {
  modalQtyCount = Math.max(1, Math.min(10, modalQtyCount + delta));
  document.getElementById('modalQtyVal').textContent = modalQtyCount;
}

function addFromModal() {
  for (let i = 0; i < modalQtyCount; i++) {
    addToCart(currentProduct.id, true);
  }
  showToast(`${currentProduct.name} added to cart`);
  closeModal(null, true);
}

function closeModal(event, force = false) {
  if (force || !event || event.target === document.getElementById('modalOverlay')) {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
  }
}


/* ─────────────────────────────────────────────────
   9. CART
───────────────────────────────────────────────── */
function addToCart(id, silent = false) {
  const product  = products.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  if (!silent) showToast(`${product.name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCartUI();
}

function updateQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) removeFromCart(id);
  else              updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  document.getElementById('cartCount').textContent = getCartCount();
  renderCartItems();
}

function renderCartItems() {
  const itemsEl  = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  // ── Empty state
  if (!cart.length) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <div>Your cart is empty</div>
        <button class="btn-primary" style="margin-top:.5rem;padding:.65rem 1.5rem;font-size:.85rem"
                onclick="closeCart()">Start Shopping</button>
      </div>`;
    footerEl.innerHTML = '';
    return;
  }

  // ── Items
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span   class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id},  1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');

  // ── Footer summary
  const subtotal = getCartTotal();
  const shipping = subtotal >= 2999 ? 0 : 199;

  footerEl.innerHTML = `
    <div class="cart-summary">
      <div class="summary-row">
        <span>Subtotal</span>
        <span>₹${subtotal.toLocaleString()}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${shipping === 0
          ? '<span class="success-color">FREE</span>'
          : '₹' + shipping}</span>
      </div>
      ${subtotal < 2999
        ? `<div class="summary-row free-ship-note">
             <span>Add ₹${(2999 - subtotal).toLocaleString()} more for free shipping!</span>
           </div>`
        : ''}
      <div class="summary-row total">
        <span>Total</span>
        <span>₹${(subtotal + shipping).toLocaleString()}</span>
      </div>
    </div>
    <button class="checkout-btn" onclick="goToCheckout()">Proceed to Checkout →</button>
    <div class="payment-icons">
      <span class="pay-icon">VISA</span>
      <span class="pay-icon">MC</span>
      <span class="pay-icon">UPI</span>
      <span class="pay-icon">COD</span>
    </div>`;
}

function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('active');
  renderCartItems();
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}


/* ─────────────────────────────────────────────────
   10. CHECKOUT
───────────────────────────────────────────────── */
function goToCheckout() {
  closeCart();
  showPage('checkout');
  renderCheckout();
}

function renderCheckout() {
  // Order items
  document.getElementById('checkoutItems').innerHTML = cart.map(item => `
    <div class="order-item">
      <div class="order-item-img">${item.emoji}</div>
      <div class="order-item-name">${item.name} × ${item.qty}</div>
      <div class="order-item-price">₹${(item.price * item.qty).toLocaleString()}</div>
    </div>
  `).join('');

  // Summary totals
  const subtotal = getCartTotal();
  const shipping = subtotal >= 2999 ? 0 : 199;

  document.getElementById('checkoutSummary').innerHTML = `
    <div class="summary-row">
      <span>Subtotal</span>
      <span>₹${subtotal.toLocaleString()}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>${shipping === 0 ? 'FREE' : '₹' + shipping}</span>
    </div>
    <div class="summary-row total">
      <span>Total</span>
      <span>₹${(subtotal + shipping).toLocaleString()}</span>
    </div>`;
}

function placeOrder() {
  cart = [];
  updateCartUI();
  showPage('success');
}

function resetAndHome() {
  showPage('main');
}


/* ─────────────────────────────────────────────────
   11. PAGE NAVIGATION
───────────────────────────────────────────────── */
function showPage(page) {
  document.getElementById('mainPage').classList.toggle('hidden',  page !== 'main');
  document.getElementById('checkoutPage').classList.toggle('active', page === 'checkout');
  document.getElementById('successPage').classList.toggle('active',  page === 'success');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ─────────────────────────────────────────────────
   12. TOAST NOTIFICATION
───────────────────────────────────────────────── */
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2400);
}


/* ─────────────────────────────────────────────────
   13. SCROLL HELPER
───────────────────────────────────────────────── */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}