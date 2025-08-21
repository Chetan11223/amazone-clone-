# Amazon Clone - HTML/CSS/JavaScript

A simple Amazon clone built with vanilla HTML, CSS, and JavaScript. This is a frontend-only application that uses localStorage for data persistence.

## Features

### Core Functionality
- **User Authentication**: Login/Register with localStorage
- **Product Browsing**: Browse products by categories
- **Search**: Search products by name, description, or brand
- **Shopping Cart**: Add, update, and remove items
- **Product Details**: Detailed product view with images and specifications
- **Order Management**: Place orders and view order history
- **Responsive Design**: Mobile-friendly interface

### Pages
- **Home**: Hero section, categories, and featured products
- **Products**: Product listing with sorting and filtering
- **Product Detail**: Individual product page with full details
- **Shopping Cart**: Cart management and checkout
- **Profile**: User profile information
- **Orders**: Order history and status

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation

1. **Download the files**
   - Download all files to a folder on your computer
   - Ensure all files are in the same directory:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `data.js`

2. **Open the application**
   - Double-click on `index.html` to open in your default browser
   - Or right-click and select "Open with" your preferred browser

### Demo Accounts

The application comes with pre-configured demo accounts:

**Admin Account:**
- Email: `admin@amazonclone.com`
- Password: `admin123`

**User Account:**
- Email: `john@example.com`
- Password: `password123`

You can also create new accounts using the registration form.

## File Structure

```
amazon-clone/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # Main JavaScript functionality
├── data.js             # Mock data and localStorage utilities
└── README-simple.md    # This file
```

## Features Overview

### Home Page
- Hero section with call-to-action
- Category navigation cards
- Featured products showcase

### Product Listing
- Grid layout with product cards
- Category filtering
- Search functionality
- Sorting options (name, price, rating)
- Responsive design

### Product Details
- Large product images
- Detailed descriptions and specifications
- Star ratings and review counts
- Quantity selector
- Add to cart functionality
- Stock information

### Shopping Cart
- Item management (add, update, remove)
- Quantity controls
- Price calculations
- Order summary
- Checkout process

### User System
- Registration and login
- User profile management
- Order history
- Session persistence

## Data Storage

The application uses browser localStorage to persist data:

- **Products**: Pre-loaded mock product data
- **Users**: User accounts and authentication
- **Cart**: Shopping cart items
- **Orders**: Order history
- **Session**: Current user session

## Customization

### Adding Products
Edit the `mockProducts` array in `data.js`:

```javascript
{
    id: 'unique-id',
    name: 'Product Name',
    description: 'Product description',
    price: 99.99,
    originalPrice: 129.99, // Optional
    category: 'electronics',
    brand: 'Brand Name',
    image: 'https://example.com/image.jpg',
    rating: 4.5,
    reviews: 123,
    stock: 50,
    featured: true // Optional
}
```

### Styling
Modify `styles.css` to customize:
- Colors and themes
- Layout and spacing
- Typography
- Responsive breakpoints

### Functionality
Extend `script.js` to add:
- New features
- Enhanced search
- Additional user interactions
- Payment integration

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Limitations

As a frontend-only application:
- Data is stored locally (not shared between devices)
- No real payment processing
- No server-side validation
- No real user authentication security
- Images are loaded from external URLs

## Future Enhancements

Potential improvements:
- Backend integration
- Real payment processing
- User reviews and ratings
- Wishlist functionality
- Advanced filtering
- Product recommendations
- Email notifications
- Admin panel for product management

## Troubleshooting

### Common Issues

1. **Images not loading**
   - Check internet connection
   - Images are loaded from Unsplash CDN

2. **Data not persisting**
   - Ensure localStorage is enabled in browser
   - Check browser privacy settings

3. **Layout issues on mobile**
   - Ensure viewport meta tag is present
   - Check CSS media queries

### Browser Console
Open browser developer tools (F12) to check for JavaScript errors.

## License

This project is for educational purposes. Feel free to use and modify as needed.

## Acknowledgments

- Images from Unsplash
- Icons from Font Awesome
- Inspired by Amazon's user interface