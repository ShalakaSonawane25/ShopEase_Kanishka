# ShopEase — Mini E-Commerce Storefront

A responsive, editorial-grade Mini E-Commerce storefront built with React, Vite, React Router DOM, and React Context API. Built as part of the React Developer Intern take-home assessment.

---

## 🛍️ Project Overview

**ShopEase** is an intentional, lifestyle-focused shopping application showcasing curated products across Electronics, Fashion, and Home essentials. It provides a fluid, unified user experience featuring real-time client-side search and category filtering, rich product detail views, dynamic cart management with quantity adjustments, and resilient local storage persistence.

---

## ✨ Features

- **Warm Editorial UI/UX**: Designed around a warm minimalist palette (`#FAF9F6` background, `#315C43` primary forest green, Manrope and DM Sans typography, and clean 8px spacing scale).
- **Sticky Header & Brand Identity**: Persistent navigation header with active route indication and real-time badge count for cart items.
- **Product Catalog & Search/Filter**:
  - Live search by product name, category, or description keywords.
  - Category pill filter tabs (All, Electronics, Fashion, Home).
  - Search and category filters operate concurrently.
  - Active matching count and convenient "Clear all filters" trigger.
  - Thoughtfully designed empty search state.
- **Responsive 4/3/2/1 Column Grid**:
  - Desktop: 4 columns
  - Tablet: 3 columns
  - Mobile: 2 columns
  - Narrow mobile: 1 column
- **Product Details Page (`/product/:id`)**:
  - Two-column editorial layout on desktop, stacked cleanly on mobile.
  - Image failure fallback handling.
  - Star ratings, pricing in INR, feature assurances (Free shipping, warranty, returns).
  - Quantity selector stepper before adding to cart.
  - Dedicated "Product Not Found" state for invalid route IDs with return link.
- **Full Shopping Cart System (`/cart`)**:
  - Product thumbnails, unit prices, line totals, and item counts.
  - Quantity increase/decrease controls with automatic removal when reduced to zero.
  - Explicit item removal and "Clear Entire Cart" capability.
  - Order summary sidebar with subtotal, tax inclusion notice, free pan-India delivery, and highlighted net total.
  - Empty cart state with quick "Start Exploring" CTA.
  - Checkout demo modal with assessment disclaimer.
- **Robust Persistence**:
  - Cart state persists across page refreshes via `localStorage` (`shopease-cart`).
  - Safe parsing with error boundary protection against corrupted or malformed saved data.

---

## 🛠️ Technology Stack

- **Core**: React 19, JavaScript (ES6+), JSX
- **Build Tool**: Vite 8
- **Routing**: React Router DOM (v7)
- **State Management**: React Context API (`CartContext`) + React Hooks (`useState`, `useMemo`, `useRef`, `useContext`, `useEffect`)
- **Styling**: Plain Vanilla CSS (Custom design system tokens, responsive grid, zero external UI/CSS libraries)
- **Data**: Local JSON dataset (`src/data/products.json`)
- **Storage**: Browser `localStorage`

---

## 📁 Folder Structure

```
ShopEase/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky header with branding, navigation & cart badge
│   │   └── ProductCard.jsx     # Responsive card with image fallback & add-to-cart action
│   ├── context/
│   │   └── CartContext.jsx     # Cart provider, custom useCart hook & localStorage sync
│   ├── data/
│   │   └── products.json       # 12 curated products across Electronics, Fashion, Home
│   ├── pages/
│   │   ├── Cart.jsx            # Cart management, item table & order summary
│   │   ├── Home.jsx            # Editorial hero, live search & category filter grid
│   │   └── ProductDetails.jsx  # Two-column product showcase & not-found state
│   ├── App.jsx                 # App shell, routing setup & 404 fallback route
│   ├── index.css               # Design tokens, typography, layout & responsive CSS
│   └── main.jsx                # Application root mounting with StrictMode
├── index.html                  # HTML entry point with Google Fonts preconnections
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

### Development Server
Start the local development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
Compile and bundle the application for production:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

### Code Quality / Linting
Run ESLint:
```bash
npm run lint
```

---

## 💾 Cart Persistence

The cart state is synchronized to `localStorage` under the key:
```
shopease-cart
```
- **Serialization**: Upon any state change (adding items, incrementing/decrementing quantity, removing items), the updated cart array is saved as a JSON string.
- **Hydration**: When the application loads, `CartContext` retrieves and parses this key.
- **Resilience**: The initialization step wraps `JSON.parse` in a `try/catch` block and validates the shape of each item (verifying positive integers for quantity and valid numeric prices). If corrupted or invalid JSON is encountered, it gracefully defaults to an empty cart without crashing the application.

---

## ⚠️ Known Limitations

1. **Frontend-Only Demo**: This application is a frontend demonstration. Checkout displays an informative modal and does not connect to a real payment gateway (Stripe, Razorpay, etc.).
2. **Local Mock Data**: Product data is bundled in `src/data/products.json` rather than retrieved from a live database or REST API.
3. **No User Authentication**: Cart is associated with the local browser session rather than an authenticated user profile.
