import React, { useState, useEffect, useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ToastContainer } from 'react-toastify';
import CustomToast from '../components/CustomToast';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import './Cart.css';
import '../styles/toast-custom.css';
import cartBg from '../assets/images/cart-bg.jpg';

const Cart = () => {
  const [loaded, setLoaded] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set loaded state after a short delay for animations
    setTimeout(() => {
      setLoaded(true);
    }, 100);

    // Preload the background image
    const img = new Image();
    img.src = cartBg;
  }, []);

  // Format price to always show 2 decimal places
  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  // Handle remove item
  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    CustomToast.info(`${productName} removed from cart`);
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (cartItems.length > 0) {
      clearCart();
      CustomToast.info('Cart cleared');
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    // Only proceed if there are items in the cart
    if (cartItems.length === 0) {
      CustomToast.error('Your cart is empty');
      return;
    }

    setIsCheckingOut(true);
    setTimeout(() => {
      CustomToast.success('Proceeding to checkout...');
      setTimeout(() => {
        // Use window.location to ensure the browser records this as the referrer
        window.location.href = '/checkout';
      }, 2000);
    }, 500);
  };

  return (
    <div className={`cart-page ${loaded ? 'loaded' : ''}`}>
      <ToastContainer />
      <div className="page-overlay"></div>

      <Container className="cart-container">
        <div className="cart-content">
          <h1 className="cart-title animate__animated animate__fadeInDown">YOUR CART</h1>
          <div className="cart-items-section">

            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <h3 className="cart-empty-title">Your cart is currently empty</h3>
                <p className="cart-empty-text">Looks like you haven't added any products to your cart yet.</p>
                <Link to="/products" className="continue-shopping-btn">
                  <i className="fas fa-arrow-left"></i> Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  <div className="cart-header">
                    <div className="cart-header-product">Product</div>
                    <div className="cart-header-price">Price</div>
                    <div className="cart-header-quantity">Quantity</div>
                    <div className="cart-header-total">Total</div>
                    <div className="cart-header-actions">Actions</div>
                  </div>

                  <div className="cart-items-container">
                    {cartItems.map(item => (
                      <div key={item.id} className="cart-item animate__animated animate__fadeIn">
                        <div className="cart-item-product">
                          <img src={item.image} alt={item.name} className="cart-item-image" />
                          <div className="cart-item-details">
                            <h4 className="cart-item-name">{item.name}</h4>
                            {item.bestSeller && <span className="cart-item-badge">Best Seller</span>}
                          </div>
                        </div>
                        <div className="cart-item-price">${formatPrice(item.price)}</div>
                        <div className="cart-item-quantity">
                          <button
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
                        <div className="cart-item-actions">
                          <button
                            className="remove-btn"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cart-summary">
                  <div className="cart-summary-row">
                    <span>Subtotal:</span>
                    <span>${formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="cart-summary-row total">
                    <span>Total:</span>
                    <span>${formatPrice(getTotalPrice())}</span>
                  </div>

                  <div className="cart-actions">
                    <Button
                      variant="outline-secondary"
                      className="clear-cart-btn"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </Button>
                    <Button
                      variant="primary"
                      className="checkout-btn"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                    </Button>
                  </div>
                </div>

                <div className="continue-shopping">
                  <Link to="/products" className="continue-shopping-link">
                    <i className="fas fa-arrow-left"></i> Continue Shopping
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
