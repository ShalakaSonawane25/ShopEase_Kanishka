/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'shopease-cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Validate items have valid id, price, and positive quantity, normalize id to number
          return parsed
            .filter(item => item && item.id !== undefined && item.id !== null && typeof item.price === 'number' && item.quantity > 0)
            .map(item => ({
              ...item,
              id: Number(item.id),
              quantity: parseInt(item.quantity, 10) || 1
            }));
        }
      }
    } catch (err) {
      console.warn('Failed to parse cart from localStorage, initializing empty cart:', err);
    }
    return [];
  });

  // Keep localStorage in sync with cart state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [cart]);

  // Add product to cart with optional quantity; isExact sets the exact quantity if item already exists
  const addToCart = (product, quantityToAdd = 1, isExact = false) => {
    if (!product || product.id === undefined || product.id === null) return;
    const numId = Number(product.id);
    const qty = Math.max(1, parseInt(quantityToAdd, 10) || 1);

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => Number(item.id) === numId);
      if (existingIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: isExact ? qty : item.quantity + qty }
            : item
        );
      }
      return [...prevCart, { ...product, id: numId, quantity: qty }];
    });
  };

  // Update item quantity; removes if <= 0
  const updateQuantity = (productId, newQuantity) => {
    const numId = Number(productId);
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(numId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        Number(item.id) === numId ? { ...item, quantity: qty } : item
      )
    );
  };

  // Remove single product by ID
  const removeFromCart = (productId) => {
    const numId = Number(productId);
    setCart(prevCart => prevCart.filter(item => Number(item.id) !== numId));
  };

  // Clear all items from cart
  const clearCart = () => {
    setCart([]);
  };

  // Get quantity of a product currently in the cart (0 if not in cart)
  const getItemQuantity = (productId) => {
    const numId = Number(productId);
    const item = cart.find(i => Number(i.id) === numId);
    return item ? item.quantity : 0;
  };

  // Calculate total items (sum of quantities)
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Calculate cart total price
  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  // Price formatting helper for INR
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItems,
        cartTotal,
        formatINR
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
