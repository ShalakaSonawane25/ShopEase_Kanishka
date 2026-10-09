import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalItems, cartTotal, formatINR } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [itemImgErrors, setItemImgErrors] = useState({});

  const handleImageError = (id) => {
    setItemImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const isCartEmpty = cart.length === 0;

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Page Header */}
        <div className="cart-header">
          <div className="cart-header-title-row">
            <h1 className="cart-title">Shopping Cart</h1>
            {!isCartEmpty && (
              <span className="cart-count-badge">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <p className="cart-subtitle">
            Review your chosen items, adjust quantities, and proceed to checkout.
          </p>
        </div>

        {/* Empty Cart State */}
        {isCartEmpty ? (
          <div className="empty-cart-view">
            <div className="empty-cart-icon" aria-hidden="true">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2 className="empty-cart-title">Your shopping cart is empty</h2>
            <p className="empty-cart-text">
              Looks like you haven't added any elevated essentials yet. Explore our latest arrivals and find something you love.
            </p>
            <Link to="/" className="empty-cart-cta">
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
              Start Exploring Products
            </Link>
          </div>
        ) : (
          /* Cart Content Layout: Left items list, Right Order Summary */
          <div className="cart-layout">
            {/* Left: Cart Items Table / List */}
            <div className="cart-items-section">
              <div className="cart-items-header-bar">
                <span className="header-label-product">Product</span>
                <span className="header-label-price">Unit Price</span>
                <span className="header-label-qty">Quantity</span>
                <span className="header-label-total">Total</span>
                <span className="header-label-action"></span>
              </div>

              <div className="cart-items-list" role="list">
                {cart.map((item) => {
                  const lineTotal = (item.price || 0) * (item.quantity || 1);
                  const isImgFailed = itemImgErrors[item.id];

                  return (
                    <article key={item.id} className="cart-item-card" role="listitem">
                      {/* Product Thumbnail & Basic Info */}
                      <div className="cart-item-product-info">
                        <Link to={`/product/${item.id}`} className="cart-item-thumb-link">
                          {!isImgFailed ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="cart-item-thumb"
                              onError={() => handleImageError(item.id)}
                            />
                          ) : (
                            <div className="cart-item-thumb-fallback" aria-hidden="true">
                              <span>{item.name?.slice(0, 2)?.toUpperCase()}</span>
                            </div>
                          )}
                        </Link>
                        <div className="cart-item-details">
                          <span className="cart-item-category">{item.category}</span>
                          <Link to={`/product/${item.id}`} className="cart-item-name">
                            {item.name}
                          </Link>
                          <span className="cart-item-mobile-price">
                            Unit: {formatINR(item.price)}
                          </span>
                        </div>
                      </div>

                      {/* Desktop Unit Price */}
                      <div className="cart-item-unit-price">
                        {formatINR(item.price)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="cart-item-qty-cell">
                        <div className="cart-qty-stepper">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            −
                          </button>
                          <span className="qty-number" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="cart-item-line-total">
                        <span className="line-total-val">{formatINR(lineTotal)}</span>
                      </div>

                      {/* Remove Button */}
                      <div className="cart-item-remove-cell">
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Bottom Actions Row */}
              <div className="cart-footer-actions">
                <Link to="/" className="continue-shopping-btn">
                  <svg
                    width="16"
                    height="16"
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
                  Continue Shopping
                </Link>

                <button
                  type="button"
                  className="clear-cart-link-btn"
                  onClick={clearCart}
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>

            {/* Right: Order Summary */}
            <aside className="order-summary-card" aria-labelledby="summary-heading">
              <h2 id="summary-heading" className="summary-title">
                Order Summary
              </h2>

              <div className="summary-rows">
                <div className="summary-row">
                  <span className="summary-label">Items Subtotal ({totalItems})</span>
                  <span className="summary-value">{formatINR(cartTotal)}</span>
                </div>

                <div className="summary-row">
                  <div className="shipping-label-group">
                    <span className="summary-label">Estimated Delivery</span>
                    <span className="shipping-subnote">Standard pan-India shipping</span>
                  </div>
                  <span className="summary-value free-delivery">FREE</span>
                </div>

                <div className="summary-row">
                  <span className="summary-label">Taxes (GST)</span>
                  <span className="summary-value tax-included">Included</span>
                </div>

                <div className="summary-divider" />

                <div className="summary-row total-row">
                  <div>
                    <span className="total-title">Total Amount</span>
                    <span className="total-sub">Net payable</span>
                  </div>
                  <span className="total-amount">{formatINR(cartTotal)}</span>
                </div>
              </div>

              {/* Frontend Demo Notice Box */}
              <div className="demo-notice-box" role="note">
                <div className="notice-header">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>Internship Assessment Demo</span>
                </div>
                <p className="notice-body">
                  Real payment gateway is intentionally disabled for this frontend evaluation.
                </p>
              </div>

              {/* Checkout Action Button */}
              <button
                type="button"
                className="checkout-btn"
                onClick={() => setShowCheckoutModal(true)}
              >
                Proceed to Checkout
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <div className="security-badges">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Encrypted & Safe Checkout Experience</span>
              </div>
            </aside>
          </div>
        )}

        {/* Frontend Demo Checkout Modal */}
        {showCheckoutModal && (
          <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-content">
              <div className="modal-icon-badge" aria-hidden="true">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#315C43"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>

              <h2 id="modal-title" className="modal-heading">
                Frontend Demo Checkout
              </h2>

              <p className="modal-text">
                Thank you for testing <strong>ShopEase</strong>! As specified in the take-home assessment requirements, payment processing and order fulfillment are disabled for this demonstration.
              </p>

              <div className="modal-order-summary-box">
                <div className="modal-summary-line">
                  <span>Items in Order:</span>
                  <strong>{totalItems} items</strong>
                </div>
                <div className="modal-summary-line">
                  <span>Order Total:</span>
                  <strong className="modal-summary-price">{formatINR(cartTotal)}</strong>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setShowCheckoutModal(false)}
                >
                  Close & Return to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
