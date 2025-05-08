import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out'
    });
  }, []);

  return (
    <div className="home">
      <section className="hero-section">
        <Container>
          <div className="hero-content">
            <h1 className="hero-title">TRANSFORM YOUR BODY</h1>
            <p className="hero-subtitle">
              Join our community and achieve your fitness goals with expert trainers and comprehensive programs.
            </p>
            <Link to="/signup" className="cta-button">
              <span>Get Started</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </Container>
      </section>

      <section className="features-section">
        <div className="particles-container">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="section-title-container" data-aos="fade-down">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="title-underline"></div>
        </div>
        <div className="features-grid">
          <div className="feature-card" data-aos="flip-left" data-aos-delay="100">
            <div className="feature-icon-container">
              <i className="fas fa-dumbbell"></i>
            </div>
            <h3>Expert Trainers</h3>
            <p>Our certified trainers are here to guide you through your fitness journey with personalized attention.</p>
            <div className="feature-card-overlay"></div>
          </div>
          <div className="feature-card" data-aos="flip-left" data-aos-delay="300">
            <div className="feature-icon-container">
              <i className="fas fa-heart"></i>
            </div>
            <h3>Proven Results</h3>
            <p>Join thousands of satisfied members who have achieved their fitness goals with our programs.</p>
            <div className="feature-card-overlay"></div>
          </div>
          <div className="feature-card" data-aos="flip-left" data-aos-delay="500">
            <div className="feature-icon-container">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Flexible Schedule</h3>
            <p>Work out on your own time with 24/7 access to our state-of-the-art facilities.</p>
            <div className="feature-card-overlay"></div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-shape shape1"></div>
          <div className="cta-shape shape2"></div>
          <div className="cta-shape shape3"></div>
        </div>
        <Container>
          <div className="cta-content" data-aos="zoom-in">
            <h2 className="animated-heading">Ready to Start Your <span className="highlight">Fitness Journey</span>?</h2>
            <p data-aos="fade-up" data-aos-delay="200">Transform your life with our comprehensive fitness tracking tools</p>
            <Link to="/signup" className="cta-button pulse-button" data-aos="fade-up" data-aos-delay="400">
              <span className="button-text">Start Now</span>
              <span className="button-icon"><i className="fas fa-bolt"></i></span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;