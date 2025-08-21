// Mock data for the Amazon clone
const mockProducts = [
    {
        id: '1',
        name: "iPhone 15 Pro Max",
        description: "The most advanced iPhone with titanium design, A17 Pro chip, and professional camera system.",
        price: 1199,
        originalPrice: 1299,
        category: "electronics",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 245,
        stock: 50,
        featured: true
    },
    {
        id: '2',
        name: "Samsung Galaxy S24 Ultra",
        description: "Premium Android smartphone with S Pen, advanced AI features, and exceptional camera capabilities.",
        price: 1099,
        category: "electronics",
        brand: "Samsung",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 189,
        stock: 35,
        featured: true
    },
    {
        id: '3',
        name: "MacBook Pro 16-inch M3",
        description: "Powerful laptop with M3 chip, stunning Liquid Retina XDR display, and all-day battery life.",
        price: 2499,
        category: "electronics",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 156,
        stock: 25,
        featured: true
    },
    {
        id: '4',
        name: "Sony WH-1000XM5 Headphones",
        description: "Industry-leading noise canceling wireless headphones with exceptional sound quality.",
        price: 399,
        originalPrice: 449,
        category: "electronics",
        brand: "Sony",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 892,
        stock: 75,
        featured: false
    },
    {
        id: '5',
        name: "Nike Air Max 270",
        description: "Comfortable lifestyle sneakers with Max Air unit for all-day comfort and style.",
        price: 150,
        category: "clothing",
        brand: "Nike",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        rating: 4.4,
        reviews: 567,
        stock: 120,
        featured: false
    },
    {
        id: '6',
        name: "The Great Gatsby",
        description: "Classic American novel by F. Scott Fitzgerald, a masterpiece of 20th-century literature.",
        price: 12.99,
        category: "books",
        brand: "Scribner",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
        rating: 4.3,
        reviews: 1234,
        stock: 200,
        featured: false
    },
    {
        id: '7',
        name: "Instant Pot Duo 7-in-1",
        description: "Multi-functional electric pressure cooker that replaces 7 kitchen appliances.",
        price: 89.99,
        originalPrice: 119.99,
        category: "home",
        brand: "Instant Pot",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
        rating: 4.5,
        reviews: 2156,
        stock: 45,
        featured: true
    },
    {
        id: '8',
        name: "Levi's 501 Original Jeans",
        description: "The original blue jean since 1873. Straight fit with button fly and classic styling.",
        price: 69.50,
        category: "clothing",
        brand: "Levi's",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        rating: 4.2,
        reviews: 445,
        stock: 85,
        featured: false
    },
    {
        id: '9',
        name: "Dell XPS 13 Laptop",
        description: "Ultra-thin laptop with InfinityEdge display and powerful performance for professionals.",
        price: 1299,
        category: "electronics",
        brand: "Dell",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
        rating: 4.5,
        reviews: 324,
        stock: 30,
        featured: false
    },
    {
        id: '10',
        name: "Adidas Ultraboost 22",
        description: "Premium running shoes with responsive Boost midsole and Primeknit upper.",
        price: 180,
        category: "clothing",
        brand: "Adidas",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 678,
        stock: 95,
        featured: false
    },
    {
        id: '11',
        name: "Harry Potter Complete Series",
        description: "Complete collection of all seven Harry Potter books in a beautiful box set.",
        price: 58.99,
        originalPrice: 79.99,
        category: "books",
        brand: "Scholastic",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 2847,
        stock: 150,
        featured: false
    },
    {
        id: '12',
        name: "KitchenAid Stand Mixer",
        description: "Professional-grade stand mixer perfect for baking and cooking enthusiasts.",
        price: 379,
        originalPrice: 429,
        category: "home",
        brand: "KitchenAid",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 1543,
        stock: 40,
        featured: false
    }
];

// Mock users data
const mockUsers = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@amazonclone.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        id: '2',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
    }
];

// Initialize localStorage with mock data if not exists
function initializeData() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(mockProducts));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(mockUsers));
    }
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
}

// Helper functions for localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || mockProducts;
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || mockUsers;
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Initialize data when the script loads
initializeData();