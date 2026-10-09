import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, formatINR } = useCart();
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1400);
  };

  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-card-link"
        aria-label={`View details for ${product.name}`}
      >
        <div className="product-card-media">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="product-card-img"
            />
          ) : (
            <div className="product-card-img-fallback">
              <svg
                width="36"
                height="36"
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
              <span>{product.name}</span>
            </div>
          )}
          <span className="product-category-pill">{product.category}</span>
        </div>

        <div className="product-card-content">
          <div className="product-card-header">
            <h3 className="product-card-title">{product.name}</h3>
            <div className="product-card-rating" aria-label={`Rating ${product.rating} out of 5 stars`}>
              <span className="star-icon" aria-hidden="true">★</span>
              <span className="rating-num">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="product-card-desc">{product.description}</p>

          <div className="product-card-footer">
            <span className="product-card-price">{formatINR(product.price)}</span>

            <button
              type="button"
              className={`product-card-btn ${justAdded ? 'added' : ''}`}
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
            >
              {justAdded ? (
                <>
                  <svg
                    width="14"
                    height="14"
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
                  <span>Added</span>
                </>
              ) : (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
