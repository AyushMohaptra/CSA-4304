/**
 * TechSavvy - Common Application Utilities
 * Clean, lightweight design
 */

const App = {
  // Toast Notification
  showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    const symbol = type === "success" ? "[OK]" : (type === "warning" ? "[!]" : "[INFO]");
    toast.innerHTML = `<span class="toast-indicator">${symbol}</span> <span class="toast-text">${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-fadeout");
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  },

  // Cart operations
  addToCart(productId, qty = 1) {
    const product = Storage.getProductById(productId);
    if (!product) {
      App.showToast("Product not found.", "warning");
      return false;
    }

    if (product.stock <= 0) {
      App.showToast(`Product "${product.name}" is currently Out of Stock.`, "warning");
      return false;
    }

    let cart = Storage.getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      if (currentQty + qty > product.stock) {
        App.showToast(`Cannot add more than ${product.stock} available units.`, "warning");
        return false;
      }
      cart[existingIndex].quantity += qty;
    } else {
      if (qty > product.stock) {
        App.showToast(`Only ${product.stock} units available in stock.`, "warning");
        return false;
      }
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        quantity: qty
      });
    }

    Storage.saveCart(cart);
    App.updateNavCounters();
    App.showToast(`Added "${product.name}" to cart.`, "success");
    return true;
  },

  updateCartQuantity(productId, newQty) {
    let cart = Storage.getCart();
    const product = Storage.getProductById(productId);
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex === -1) return;

    if (newQty <= 0) {
      return App.removeFromCart(productId);
    }

    if (product && newQty > product.stock) {
      App.showToast(`Only ${product.stock} units available in stock.`, "warning");
      cart[itemIndex].quantity = product.stock;
    } else {
      cart[itemIndex].quantity = newQty;
    }

    Storage.saveCart(cart);
    App.updateNavCounters();
  },

  removeFromCart(productId) {
    let cart = Storage.getCart();
    const item = cart.find(i => i.id === productId);
    cart = cart.filter(i => i.id !== productId);
    Storage.saveCart(cart);
    App.updateNavCounters();
    if (item) {
      App.showToast(`Removed "${item.name}" from cart.`, "info");
    }
  },

  clearCart() {
    Storage.saveCart([]);
    App.updateNavCounters();
  },

  getCartCount() {
    const cart = Storage.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  getCartSubtotal() {
    const cart = Storage.getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  // Wishlist operations
  toggleWishlist(productId) {
    let wishlist = Storage.getWishlist();
    const index = wishlist.indexOf(productId);
    const product = Storage.getProductById(productId);
    const name = product ? product.name : "Product";

    if (index > -1) {
      wishlist.splice(index, 1);
      App.showToast(`Removed "${name}" from Wishlist.`, "info");
    } else {
      wishlist.push(productId);
      App.showToast(`Saved "${name}" to Wishlist.`, "success");
    }

    Storage.saveWishlist(wishlist);
    App.updateNavCounters();
  },

  isInWishlist(productId) {
    const wishlist = Storage.getWishlist();
    return wishlist.includes(productId);
  },

  // Navbar dynamic updater
  updateNavCounters() {
    const cartBadges = document.querySelectorAll(".cart-count-badge");
    const count = App.getCartCount();
    cartBadges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    });

    const wishlistBadges = document.querySelectorAll(".wishlist-count-badge");
    const wishCount = Storage.getWishlist().length;
    wishlistBadges.forEach(badge => {
      badge.textContent = wishCount;
      badge.style.display = wishCount > 0 ? "inline-flex" : "none";
    });

    // Update user auth profile in navbar if element exists
    const userDisplay = document.getElementById("nav-user-display");
    const authLink = document.getElementById("nav-auth-link");
    const user = Storage.getCurrentUser();

    if (userDisplay && authLink) {
      if (user) {
        userDisplay.innerHTML = `
          <span class="user-pill ${user.role === 'admin' ? 'user-pill-admin' : ''}">
            User: <strong>${user.name}</strong> [${user.role.toUpperCase()}]
          </span>
        `;
        authLink.innerHTML = `<a href="#" onclick="App.handleLogout(event)" class="nav-link btn-nav-logout">Logout</a>`;
      } else {
        userDisplay.innerHTML = `<span class="user-pill-guest">Guest</span>`;
        authLink.innerHTML = `<a href="login.html" class="nav-link btn-nav-login">Login / Register</a>`;
      }
    }
  },

  handleLogout(e) {
    if (e) e.preventDefault();
    if (confirm("Are you sure you want to log out of TechSavvy?")) {
      Storage.setCurrentUser(null);
      App.showToast("Logged out successfully.", "info");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 600);
    }
  },

  // Parse Query Parameters
  getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  // Render Star Ratings (Clean text-based, no emoji)
  renderStars(rating) {
    return `<span class="rating-badge">Rating: ${rating.toFixed(1)} / 5</span>`;
  },

  // Render Availability Badge (Clean text, no emoji)
  renderStockBadge(stock) {
    if (stock > 0) {
      return `<span class="badge badge-success">In Stock (${stock} available)</span>`;
    } else {
      return `<span class="badge badge-danger">Out of Stock</span>`;
    }
  },

  // Standard Product Card Renderer for reuse across catalog, recommendations, etc.
  renderProductCard(product) {
    const isWishlisted = App.isInWishlist(product.id);
    const isAvailable = product.stock > 0;
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return `
      <div class="product-card" id="card-${product.id}">
        <div class="product-card-top">
          <span class="product-badge">${product.badge || (discount > 0 ? discount + '% OFF' : product.category)}</span>
          <button class="btn-wishlist ${isWishlisted ? 'active' : ''}" 
                  onclick="App.toggleWishlist('${product.id}'); this.classList.toggle('active'); this.textContent = App.isInWishlist('${product.id}') ? 'Saved' : 'Save';" 
                  title="${isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}">
            ${isWishlisted ? 'Saved' : 'Save'}
          </button>
        </div>
        
        <div class="product-visual">
          <span class="product-category-tag">${product.category}</span>
          <div class="product-visual-model">${product.subcategory || ''}</div>
        </div>

        <div class="product-card-body">
          <h3 class="product-title">
            <a href="product-detail.html?id=${product.id}">${product.name}</a>
          </h3>
          
          <div class="product-rating">
            ${App.renderStars(product.rating || 4.5)}
            <span class="reviews-count">(${product.reviewsCount || 0} reviews)</span>
          </div>

          <p class="product-snippet">${product.description.substring(0, 85)}...</p>

          <div class="product-stock-wrap">
            ${App.renderStockBadge(product.stock)}
          </div>

          <div class="product-pricing">
            <span class="price-current">${Storage.formatCurrency(product.price)}</span>
            ${product.originalPrice ? `<span class="price-original">${Storage.formatCurrency(product.originalPrice)}</span>` : ''}
          </div>

          <div class="product-card-actions">
            <a href="product-detail.html?id=${product.id}" class="btn btn-outline btn-sm">Details</a>
            <button class="btn btn-primary btn-sm" 
                    ${!isAvailable ? 'disabled title="Out of stock"' : ''}
                    onclick="App.addToCart('${product.id}', 1)">
              ${isAvailable ? '+ Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    `;
  }
};

// Auto-run on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.updateNavCounters();
});
