// Global variables
let currentPage = 'home';
let currentCategory = '';
let currentSort = 'name';
let currentProducts = [];
let cart = [];
let currentUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load user session
    currentUser = getCurrentUser();
    updateUserInterface();
    
    // Load cart
    cart = getCart();
    updateCartCount();
    
    // Show home page
    showHome();
}

// Navigation functions
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId.replace('Page', '');
    }
}

function showHome() {
    showPage('homePage');
    loadFeaturedProducts();
}

function showProducts(category = '') {
    showPage('productsPage');
    currentCategory = category;
    
    // Update page title
    const title = document.getElementById('productsTitle');
    if (category) {
        title.textContent = category.charAt(0).toUpperCase() + category.slice(1) + ' Products';
    } else {
        title.textContent = 'All Products';
    }
    
    loadProducts();
}

function showProductDetail(productId) {
    showPage('productDetailPage');
    loadProductDetail(productId);
}

function showCart() {
    showPage('cartPage');
    loadCart();
}

function showProfile() {
    if (!currentUser) {
        showNotification('Please login first', 'error');
        return;
    }
    showPage('profilePage');
    loadProfile();
}

function showOrders() {
    if (!currentUser) {
        showNotification('Please login first', 'error');
        return;
    }
    showPage('ordersPage');
    loadOrders();
}

// Product loading functions
function loadFeaturedProducts() {
    const products = getProducts();
    const featuredProducts = products.filter(product => product.featured);
    const grid = document.getElementById('featuredProductsGrid');
    grid.innerHTML = '';
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
}

function loadProducts() {
    let products = getProducts();
    
    // Filter by category
    if (currentCategory) {
        products = products.filter(product => product.category === currentCategory);
    }
    
    // Sort products
    products = sortProductsArray(products, currentSort);
    
    currentProducts = products;
    displayProducts(products);
}

function sortProductsArray(products, sortBy) {
    const sorted = [...products];
    
    switch(sortBy) {
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
}

function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="no-products"><h3>No products found</h3><p>Try adjusting your search or filters.</p></div>';
        return;
    }
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => showProductDetail(product.id);
    
    const originalPriceHtml = product.originalPrice ? 
        `<span class="original-price">$${product.originalPrice}</span>` : '';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x250?text=No+Image'">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description.substring(0, 100)}...</p>
            <div class="product-rating">
                <div class="stars">${generateStars(product.rating)}</div>
                <span class="rating-text">(${product.reviews})</span>
            </div>
            <div class="product-price">
                <div>
                    <span class="price">$${product.price}</span>
                    ${originalPriceHtml}
                </div>
            </div>
            <button class="add-to-cart" onclick="event.stopPropagation(); addToCart('${product.id}')">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHtml = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
    }
    
    return starsHtml;
}

function loadProductDetail(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('productDetail').innerHTML = '<h2>Product not found</h2>';
        return;
    }
    
    const originalPriceHtml = product.originalPrice ? 
        `<span class="original-price">$${product.originalPrice}</span>` : '';
    
    const detailHtml = `
        <div class="product-detail-content">
            <div class="product-images">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/500x400?text=No+Image'">
            </div>
            <div class="product-details">
                <h1>${product.name}</h1>
                <p class="description">${product.description}</p>
                <div class="rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span>${product.rating} (${product.reviews} reviews)</span>
                </div>
                <div class="price-section">
                    <span class="price">$${product.price}</span>
                    ${originalPriceHtml}
                </div>
                <div class="stock-info">
                    <p><strong>Brand:</strong> ${product.brand}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>In Stock:</strong> ${product.stock} available</p>
                </div>
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <button onclick="changeQuantity(-1)">-</button>
                    <input type="number" id="quantity" value="1" min="1" max="${product.stock}">
                    <button onclick="changeQuantity(1)">+</button>
                </div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="addToCartWithQuantity('${product.id}')">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn-secondary" onclick="addToWishlist('${product.id}')">
                        <i class="fas fa-heart"></i> Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('productDetail').innerHTML = detailHtml;
}

function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const newValue = currentValue + change;
    const maxValue = parseInt(quantityInput.max);
    
    if (newValue >= 1 && newValue <= maxValue) {
        quantityInput.value = newValue;
    }
}

// Cart functions
function addToCart(productId, quantity = 1) {
    if (!currentUser) {
        showNotification('Please login to add items to cart', 'error');
        return;
    }
    
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showNotification('Product not found', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            price: product.price,
            name: product.name,
            image: product.image
        });
    }
    
    saveCart(cart);
    updateCartCount();
    showNotification('Product added to cart!');
}

function addToCartWithQuantity(productId) {
    const quantity = parseInt(document.getElementById('quantity').value);
    addToCart(productId, quantity);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
    updateCartCount();
    loadCart();
    showNotification('Item removed from cart');
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart(cart);
            updateCartCount();
            loadCart();
        }
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function loadCart() {
    const cartContent = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
                <button class="btn-primary" onclick="showProducts()">Continue Shopping</button>
            </div>
        `;
        return;
    }
    
    let cartHtml = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHtml += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100?text=No+Image'">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                    <p>Subtotal: $${itemTotal.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-selector">
                        <button onclick="updateCartQuantity('${item.productId}', ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity('${item.productId}', parseInt(this.value))">
                        <button onclick="updateCartQuantity('${item.productId}', ${item.quantity + 1})">+</button>
                    </div>
                    <button class="btn-secondary" onclick="removeFromCart('${item.productId}')">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
    });
    
    cartHtml += `
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="total">Total: $${total.toFixed(2)}</div>
            <button class="btn-primary" onclick="checkout()">Proceed to Checkout</button>
            <button class="btn-secondary" onclick="clearCart()">Clear Cart</button>
        </div>
    `;
    
    cartContent.innerHTML = cartHtml;
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart(cart);
        updateCartCount();
        loadCart();
        showNotification('Cart cleared');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    if (!currentUser) {
        showNotification('Please login to checkout', 'error');
        return;
    }
    
    // Create order
    const order = {
        id: Date.now().toString(),
        userId: currentUser.id,
        items: [...cart],
        total: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
        status: 'pending',
        date: new Date().toISOString()
    };
    
    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);
    
    // Clear cart
    cart = [];
    saveCart(cart);
    updateCartCount();
    
    showNotification('Order placed successfully!');
    showOrders();
}

// Search functions
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const category = document.querySelector('.search-category').value;
    
    if (!searchTerm && !category) {
        showProducts();
        return;
    }
    
    let products = getProducts();
    
    if (searchTerm) {
        products = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
    }
    
    if (category) {
        products = products.filter(product => product.category === category);
    }
    
    currentProducts = products;
    showPage('productsPage');
    
    const title = document.getElementById('productsTitle');
    title.textContent = `Search Results${searchTerm ? ` for "${searchTerm}"` : ''}`;
    
    displayProducts(products);
}

function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    currentSort = sortSelect.value;
    
    if (currentProducts.length > 0) {
        const sortedProducts = sortProductsArray(currentProducts, currentSort);
        displayProducts(sortedProducts);
    }
}

// User authentication functions
function showLoginModal() {
    closeModal('registerModal');
    document.getElementById('loginModal').classList.add('show');
}

function showRegisterModal() {
    closeModal('loginModal');
    document.getElementById('registerModal').classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = { id: user.id, name: user.name, email: user.email, role: user.role };
        setCurrentUser(currentUser);
        updateUserInterface();
        closeModal('loginModal');
        showNotification(`Welcome back, ${user.name}!`);
        
        // Reset form
        document.getElementById('loginForm').reset();
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function register(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    const users = getUsers();
    
    if (users.find(u => u.email === email)) {
        showNotification('Email already exists', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        role: 'user'
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    setCurrentUser(currentUser);
    updateUserInterface();
    closeModal('registerModal');
    showNotification(`Welcome, ${name}!`);
    
    // Reset form
    document.getElementById('registerForm').reset();
}

function logout() {
    currentUser = null;
    clearCurrentUser();
    updateUserInterface();
    
    // Clear cart
    cart = [];
    saveCart(cart);
    updateCartCount();
    
    showNotification('Logged out successfully');
    showHome();
}

function updateUserInterface() {
    const userGreeting = document.getElementById('userGreeting');
    const loginSection = document.getElementById('loginSection');
    const userSection = document.getElementById('userSection');
    
    if (currentUser) {
        userGreeting.textContent = `Hello, ${currentUser.name}`;
        loginSection.style.display = 'none';
        userSection.style.display = 'block';
    } else {
        userGreeting.textContent = 'Sign In';
        loginSection.style.display = 'block';
        userSection.style.display = 'none';
    }
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

// Profile and Orders functions
function loadProfile() {
    if (!currentUser) return;
    
    const profileContent = document.getElementById('profileContent');
    profileContent.innerHTML = `
        <div class="profile-info">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> ${currentUser.name}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Role:</strong> ${currentUser.role}</p>
        </div>
    `;
}

function loadOrders() {
    if (!currentUser) return;
    
    const orders = getOrders().filter(order => order.userId === currentUser.id);
    const ordersContent = document.getElementById('ordersContent');
    
    if (orders.length === 0) {
        ordersContent.innerHTML = `
            <div class="empty-orders">
                <h3>No orders yet</h3>
                <p>Start shopping to see your orders here!</p>
                <button class="btn-primary" onclick="showProducts()">Start Shopping</button>
            </div>
        `;
        return;
    }
    
    let ordersHtml = '';
    orders.reverse().forEach(order => {
        const orderDate = new Date(order.date).toLocaleDateString();
        ordersHtml += `
            <div class="order-item">
                <div class="order-header">
                    <h3>Order #${order.id}</h3>
                    <span class="order-status">${order.status}</span>
                </div>
                <p>Date: ${orderDate}</p>
                <p>Total: $${order.total.toFixed(2)}</p>
                <p>Items: ${order.items.length}</p>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item-detail">
                            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                            <span>${item.name} (x${item.quantity})</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    ordersContent.innerHTML = ordersHtml;
}

// Utility functions
function addToWishlist(productId) {
    showNotification('Added to wishlist! (Feature coming soon)');
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notificationMessage');
    
    messageElement.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function closeNotification() {
    document.getElementById('notification').classList.remove('show');
}

// Event listeners
document.addEventListener('click', function(event) {
    // Close user dropdown when clicking outside
    const userMenu = document.querySelector('.user-menu');
    const userDropdown = document.getElementById('userDropdown');
    
    if (!userMenu.contains(event.target)) {
        userDropdown.classList.remove('show');
    }
    
    // Close modals when clicking outside
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
});

// Search on Enter key
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});