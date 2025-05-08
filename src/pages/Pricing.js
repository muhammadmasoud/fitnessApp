import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Pricing.css';

const Pricing = () => {
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

  return (
    <section className="pricing-section">
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
              <Button as="a" href="/signup" className="pricing-btn">Get started</Button>
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
              <Button as="a" href="/signup" className="pricing-btn">Get started</Button>
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
              <Button as="a" href="/signup" className="pricing-btn">Get started</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Pricing;