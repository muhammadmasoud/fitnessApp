import React, { useEffect, useState } from 'react';
import 'animate.css';
import './Offers.css';

const Offers = () => {
  const [loaded, setLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setLoaded(true);

    // Add cleanup to reset any animations when component unmounts
    return () => {
      setHoveredCard(null);
    };
  }, []);

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className={`offers-page ${loaded ? 'loaded' : ''}`}>
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
            <button className="special-offer-button">
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
            <button className="special-offer-button">
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
            <button className="special-offer-button">
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
