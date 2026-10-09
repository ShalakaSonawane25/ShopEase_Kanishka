import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const numericId = Number(id);
  const { cart, addToCart, formatINR } = useCart();
  const [imgError, setImgError] = useState(false);
  const [addedAlert, setAddedAlert] = useState(false);

  // Look up product by numeric id
  const product = useMemo(() => {
    if (isNaN(numericId)) return null;
    return productsData.find((p) => Number(p.id) === numericId);
  }, [numericId]);

  // Track previous ID to reset quantity when route param changes
  const [prevId, setPrevId] = useState(numericId);

  // Initialize quantity from existing cart item if available, otherwise default to 1
  const [quantity, setQuantity] = useState(() => {
    const itemInCart = cart.find((item) => Number(item.id) === numericId);
    return itemInCart ? itemInCart.quantity : 1;
  });

  // Adjust state during render when product ID changes (React recommended pattern)
  if (prevId !== numericId) {
    setPrevId(numericId);
    const itemInCart = cart.find((item) => Number(item.id) === numericId);
    setQuantity(itemInCart ? itemInCart.quantity : 1);
  }

  // Handle Invalid Product ID State
  if (!product) {
    return (
      <div className="product-details-page">
        <div className="not-found-container">
          <div className="not-found-icon">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="not-found-title">Product Not Found</h1>
          <p className="not-found-text">
            We couldn't locate the product you were looking for (ID: {id}). It may have been removed or the link is incorrect.
          </p>
          <Link to="/" className="not-found-btn">
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
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Shop Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    // Add to cart with isExact = true to set the exact selected quantity
    addToCart(product, quantity, true);
    setAddedAlert(true);
    setTimeout(() => {
      setAddedAlert(false);
    }, 2000);
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        {/* Navigation Breadcrumb */}
        <nav className="details-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-back-link">
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
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Shop</span>
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-category">{product.category}</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Two-Column Desktop / Stacked Mobile Layout */}
        <div className="details-layout">
          {/* Left Column: Product Image */}
          <div className="details-media-col">
            <div className="details-img-wrapper">
              {!imgError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="details-img"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="details-img-fallback">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <p>{product.name}</p>
                </div>
              )}
              <span className="details-category-pill">{product.category}</span>
            </div>
          </div>

          {/* Right Column: Product Information & Purchase Actions */}
          <div className="details-info-col">
            <div className="details-header">
              <span className="details-eyebrow">{product.category} Collection</span>
              <h1 className="details-title">{product.name}</h1>

              {/* Rating and Reviews */}
              <div className="details-rating-row">
                <div className="rating-pill">
                  <span className="star-icon" aria-hidden="true">★</span>
                  <span className="rating-score">{product.rating.toFixed(1)}</span>
                </div>
                <span className="rating-count">Based on 120+ verified community ratings</span>
              </div>
            </div>

            {/* Price */}
            <div className="details-price-box">
              <span className="details-price">{formatINR(product.price)}</span>
              <span className="details-tax-label">Inclusive of all taxes</span>
            </div>

            {/* Description */}
            <div className="details-description">
              <h2 className="desc-heading">Overview</h2>
              <p className="desc-text">{product.description}</p>
            </div>

            {/* Key Assurance Badges */}
            <div className="details-features-grid">
              <div className="feature-item">
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
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <span>Free Express Shipping</span>
              </div>
              <div className="feature-item">
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
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
                <span>1-Year Official Warranty</span>
              </div>
              <div className="feature-item">
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
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>30-Day Hassle-free Returns</span>
              </div>
            </div>

            {/* Purchase Controls */}
            <div className="details-actions-wrapper">
              <div className="quantity-control-group">
                <label htmlFor="details-quantity" className="quantity-label">
                  Quantity
                </label>
                <div className="quantity-stepper">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span id="details-quantity" className="stepper-val" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className={`details-add-btn ${addedAlert ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {addedAlert ? (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Added {quantity} to Cart!</span>
                  </>
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <span>Add to Cart • {formatINR(product.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Link to Cart if added */}
            {addedAlert && (
              <div className="cart-feedback-banner" role="alert">
                <span>Item successfully added!</span>
                <Link to="/cart" className="view-cart-link">
                  View Shopping Cart →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
