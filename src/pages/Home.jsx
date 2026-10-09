import { useState, useMemo, useRef } from 'react';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const productsSectionRef = useRef(null);

  // Extract distinct categories
  const categories = useMemo(() => {
    const cats = ['All'];
    productsData.forEach((p) => {
      if (p.category && !cats.includes(p.category)) {
        cats.push(p.category);
      }
    });
    return cats;
  }, []);

  // Filter products by search text and category simultaneously
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const scrollToProducts = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isFilteringActive = searchQuery.trim() !== '' || selectedCategory !== 'All';

  return (
    <div className="home-page">
      {/* Editorial Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-eyebrow">Curated Collection 2026</span>
            <h1 id="hero-heading" className="hero-headline">
              Find your next favourite.
            </h1>
            <p className="hero-subtext">
              Thoughtfully designed everyday objects crafted for beauty and durability. Explore our intentional selection across high-performance tech, timeless fashion, and serene home spaces.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="hero-primary-btn"
                onClick={scrollToProducts}
              >
                Explore collection
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-val">100%</span>
                <span className="metric-lbl">Authentic Design</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <span className="metric-val">Free</span>
                <span className="metric-lbl">Express Delivery</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <span className="metric-val">4.8★</span>
                <span className="metric-lbl">Community Loved</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card-composition">
              <div className="hero-ambient-circle" />
              <div className="hero-card hero-card-main">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
                  alt="Aura Studio Wireless Headphones"
                  className="hero-main-img"
                />
                <div className="hero-card-floating-badge">
                  <span className="badge-tag">Editor’s Choice</span>
                  <span className="badge-title">Aura Studio Series</span>
                  <span className="badge-price">₹8,999</span>
                </div>
              </div>
              <div className="hero-card hero-card-secondary">
                <img
                  src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80"
                  alt="Heritage Leather Watch"
                  className="hero-secondary-img"
                />
                <div className="hero-subcard-info">
                  <span className="subcard-title">Heritage Watch</span>
                  <span className="subcard-rating">★ 4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Products Section */}
      <section
        ref={productsSectionRef}
        id="explore"
        className="products-section"
        aria-labelledby="explore-heading"
      >
        <div className="products-container">
          <div className="section-header">
            <div>
              <h2 id="explore-heading" className="section-title">
                Explore products
              </h2>
              <p className="section-count" aria-live="polite">
                Showing{' '}
                <strong>
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </strong>
                {isFilteringActive && ' matching your criteria'}
              </p>
            </div>

            {isFilteringActive && (
              <button
                type="button"
                className="clear-filters-btn"
                onClick={handleClearFilters}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Clear all filters
              </button>
            )}
          </div>

          {/* Controls Bar: Search & Category Filter */}
          <div className="controls-bar">
            {/* Search Input */}
            <div className="search-input-wrapper">
              <svg
                className="search-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="product-search"
                type="search"
                className="search-input"
                placeholder="Search products, categories, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="category-filter-group" role="tablist" aria-label="Product categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="product-grid" role="region" aria-label="Products catalog">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-search-state">
              <div className="empty-search-icon" aria-hidden="true">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
              <h3 className="empty-search-title">No matching products found</h3>
              <p className="empty-search-desc">
                We couldn’t find anything matching "{searchQuery}". Try checking for spelling mistakes or clearing your category filters.
              </p>
              <button
                type="button"
                className="reset-search-btn"
                onClick={handleClearFilters}
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-brand-col">
            <span className="footer-brand">ShopEase</span>
            <p className="footer-tagline">
              Elevated, thoughtful craftsmanship designed for life’s everyday rituals.
            </p>
          </div>
          <div className="footer-meta-col">
            <p className="footer-copy">
              © {new Date().getFullYear()} ShopEase. Built with React & Vite. All rights reserved.
            </p>
            <p className="footer-notice">
              Frontend demo assessment. Currency shown in INR.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
