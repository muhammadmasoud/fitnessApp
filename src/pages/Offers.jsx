import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import './Offers.css';

const Offers = () => {
  const [loaded, setLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);

    // Add cleanup to reset any animations when component unmounts
    return () => {
      setHoveredCard(null);
    };
  }, []);

  const handleSubscribe = async (offerName, price) => {
    if (!currentUser) {
      // Redirect to signup if not logged in
      navigate('/signup');
      return;
    }

    try {
      // Clear the cart first to ensure only the subscription package is in it
      clearCart();

      // Create a subscription product object
      const subscriptionProduct = {
        id: `offer-${Date.now()}`,
        name: offerName,
        price: price,
        image: '/images/subscription.jpg',
        category: 'Special Offer',
        description: `${offerName} special offer`,
        isSubscription: true
      };

      // Add the subscription to the cart
      addToCart(subscriptionProduct);

      // Show a toast notification
      toast.info(`Adding ${offerName} to cart...`);

      // Redirect to checkout page after a short delay
      setTimeout(() => {
        navigate('/checkout');
      }, 1500);
    } catch (error) {
      toast.error('Failed to process offer. Please try again.');
      console.error('Subscription error:', error);
    }
  };

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className={`offers-page ${loaded ? 'loaded' : ''}`}>
      <ToastContainer />
      <div className="offers-content-wrapper">
        <div className="offers-header">
          <h1 className="offers-title animate__animated animate__fadeInDown">Special Offers</h1>
          <p className="offers-subtitle animate__animated animate__fadeIn animate__delay-1s">
            Exclusive deals to help you achieve your fitness goals
          </p>
        </div>

        <div className="offers-container">
          <div
            className={`special-offer-card ${hoveredCard === 0 ? 'card-hovered' : ''}`}
            onMouseEnter={() => handleCardHover(0)}
            onMouseLeave={handleCardLeave}
          >
            <div className="card-glow"></div>
            <div className="special-offer-badge animate__animated animate__pulse animate__infinite">Limited Time</div>
            <h2 className="special-offer-heading">Summer Body Challenge</h2>
            <p className="special-offer-description">Join our 8-week transformation program and get ready for summer. Includes personalized workout plans and nutrition guidance.</p>
            <div className="special-offer-price">
              <span className="original-price">$299</span>
              <span className="discounted-price price-animation">$199</span>
            </div>
            <button className="special-offer-button" onClick={() => handleSubscribe('Summer Body Challenge', 199)}>
              <span className="button-text">Claim Offer</span>
              <span className="button-shine"></span>
            </button>
          </div>

          <div
            className={`special-offer-card ${hoveredCard === 1 ? 'card-hovered' : ''}`}
            onMouseEnter={() => handleCardHover(1)}
            onMouseLeave={handleCardLeave}
          >
            <div className="card-glow"></div>
            <div className="special-offer-badge animate__animated animate__pulse animate__infinite">Most Popular</div>
            <h2 className="special-offer-heading">Couple's Package</h2>
            <p className="special-offer-description">Train together, achieve together. Special package for couples with shared personal training sessions.</p>
            <div className="special-offer-price">
              <span className="original-price">$399</span>
              <span className="discounted-price price-animation">$299</span>
            </div>
            <button className="special-offer-button" onClick={() => handleSubscribe('Couple\'s Package', 299)}>
              <span className="button-text">Claim Offer</span>
              <span className="button-shine"></span>
            </button>
          </div>

          <div
            className={`special-offer-card ${hoveredCard === 2 ? 'card-hovered' : ''}`}
            onMouseEnter={() => handleCardHover(2)}
            onMouseLeave={handleCardLeave}
          >
            <div className="card-glow"></div>
            <div className="special-offer-badge animate__animated animate__pulse animate__infinite">New Members</div>
            <h2 className="special-offer-heading">First Month Free</h2>
            <p className="special-offer-description">Sign up for a 12-month membership and get your first month absolutely free. Includes all premium facilities.</p>
            <div className="special-offer-price">
              <span className="original-price">$59/month</span>
              <span className="discounted-price price-animation">$49/month</span>
            </div>
            <button className="special-offer-button" onClick={() => handleSubscribe('First Month Free', 49)}>
              <span className="button-text">Claim Offer</span>
              <span className="button-shine"></span>
            </button>
          </div>
        </div>

        <div className="offers-footer animate__animated animate__fadeIn animate__delay-2s">
          <p>All offers are subject to terms and conditions. Limited time only.</p>
        </div>
      </div>
    </div>
  );
};

export default Offers;
