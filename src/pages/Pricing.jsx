import { useEffect, useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Pricing.css';

const Pricing = () => {
  const { currentUser, updateProfile } = useContext(AuthContext);
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Add animation class to pricing title
    const titleElement = document.querySelector('.pricing-title');
    if (titleElement) {
      setTimeout(() => {
        titleElement.classList.add('animated');
      }, 10);
    }
  }, []);

  const handleSubscribe = async (packageName, price) => {
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
        id: `subscription-${Date.now()}`,
        name: packageName,
        price: price,
        image: '/images/subscription.jpg',
        category: 'Subscription',
        description: `${packageName} subscription package`,
        isSubscription: true
      };

      // Add the subscription to the cart
      addToCart(subscriptionProduct);

      // Show a toast notification
      toast.info(`Adding ${packageName} to cart...`);

      // Redirect to checkout page after a short delay
      setTimeout(() => {
        navigate('/checkout');
      }, 1500);
    } catch (error) {
      toast.error('Failed to process subscription. Please try again.');
      console.error('Subscription error:', error);
    }
  };

  return (
    <section className="pricing-section">
      <ToastContainer />
      <Container>
        <div className="pricing-header">
          <h1 className="pricing-title">PRICING</h1>
        </div>

        <div className="pricing-container">
          {/* Basic Package */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3 className="package-name">Basic Package</h3>
              <span className="price">$24/month</span>
            </div>
            <div className="pricing-card-body">
              <ul className="features-list">
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Access to Gym Facilities</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Group Fitness Classes</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Initial Fitness Assessment</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faTimes} className="feature-icon unavailable" />
                  <span>Locker Room and Showers</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faTimes} className="feature-icon unavailable" />
                  <span>Free Wi-Fi</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faTimes} className="feature-icon unavailable" />
                  <span>Member Support</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faTimes} className="feature-icon unavailable" />
                  <span>Nutritional Counseling</span>
                </li>
              </ul>
              <Button onClick={() => handleSubscribe('Basic Package', 24)} className="pricing-btn">Subscribe Now</Button>
            </div>
          </div>

          {/* Standard Package */}
          <div className="pricing-card featured">
            <div className="pricing-card-header">
              <h3 className="package-name">Standard Package</h3>
              <span className="price">$48/month</span>
            </div>
            <div className="pricing-card-body">
              <ul className="features-list">
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Access to Gym Facilities</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Group Fitness Classes</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Initial Fitness Assessment</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Locker Room and Showers</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Free Wi-Fi</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faTimes} className="feature-icon unavailable" />
                  <span>Member Support</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faTimes} className="feature-icon unavailable" />
                  <span>Nutritional Counseling</span>
                </li>
              </ul>
              <Button onClick={() => handleSubscribe('Standard Package', 48)} className="pricing-btn">Subscribe Now</Button>
            </div>
          </div>

          {/* Premium Package */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3 className="package-name">Premium Package</h3>
              <span className="price">$56/month</span>
            </div>
            <div className="pricing-card-body">
              <ul className="features-list">
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Access to Gym Facilities</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Group Fitness Classes</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Initial Fitness Assessment</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Locker Room and Showers</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Free Wi-Fi</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Member Support</span>
                </li>
                <li className="feature-item">
                  <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                  <span>Nutritional Counseling</span>
                </li>
              </ul>
              <Button onClick={() => handleSubscribe('Premium Package', 56)} className="pricing-btn">Subscribe Now</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Pricing;