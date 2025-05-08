import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './Checkout.css';
import checkoutBg from '../assets/images/checkout-bg.jpg';

const Checkout = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set loaded state after a short delay for animations
    setTimeout(() => {
      setLoaded(true);
    }, 100);

    // Preload the background image
    const img = new Image();
    img.src = checkoutBg;
  }, []);

  return (
    <div className={`checkout-page ${loaded ? 'loaded' : ''}`}>
      <div className="checkout-hero">
        <div className="checkout-hero-content">
          <h1 className="checkout-title animate__animated animate__fadeInDown">Checkout</h1>
          <p className="checkout-subtitle animate__animated animate__fadeIn animate__delay-1s">
            Complete your purchase securely
          </p>
        </div>
      </div>

      <Container className="checkout-container">
        <div className="checkout-content">
          <div className="checkout-section">
            <h2>Checkout Process</h2>
            <div className="checkout-message">
              <p>Your cart is currently empty.</p>
              <p>Add items to your cart before proceeding to checkout.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
