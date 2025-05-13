import { useEffect, useContext, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './AuthenticatedHome.css';

const AuthenticatedHome = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out'
    });

    // Initialize fitness stats animation
    const animateValue = (obj, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);

        // Create a span with black text color and set its content
        const span = document.createElement('span');
        span.style.color = 'black';
        span.textContent = currentValue;

        // Clear the element and append the span
        obj.innerHTML = '';
        obj.appendChild(span);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Animate stats when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statsElements = document.querySelectorAll('.stat-value');
          statsElements.forEach(el => {
            const finalValue = parseInt(el.getAttribute('data-value'));
            animateValue(el, 0, finalValue, 2000);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="authenticated-home">
      {/* Hero Section with Background Image */}
      <section className="auth-hero-section">
        <div className="auth-hero-overlay"></div>
        <Container fluid className="d-flex justify-content-center align-items-center h-100">
          <div className="auth-hero-content" data-aos="fade-up">
            <h1 className="auth-hero-title">Welcome Back, {currentUser?.fullName || 'Fitness Enthusiast'}!</h1>
            <p className="auth-hero-subtitle">
              Your fitness journey continues. Let's crush those goals together!
            </p>
            <div className="auth-hero-buttons">
              <Link to="/dashboard" className="auth-cta-button">
                <span>Dashboard</span>
                <i className="fas fa-chart-line"></i>
              </Link>
              <Link to="/exercises" className="auth-secondary-button">
                <span>Workout Library</span>
                <i className="fas fa-dumbbell"></i>
              </Link>
            </div>
          </div>
        </Container>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="stats-section" style={{backgroundColor: 'white', padding: '5rem 0', textAlign: 'center'}}>
        <div className="fitness-journey-title animated-title" data-aos="zoom-in">YOUR FITNESS JOURNEY</div>
        <div className="fitness-journey-underline" data-aos="fade-up" data-aos-delay="300"></div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1.5rem', width: '100%', margin: '0 auto', padding: '1rem 0'}}>
          <div style={{background: 'white', borderRadius: '10px', padding: '1.5rem 1rem', textAlign: 'center', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', width: '220px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
              <div style={{fontSize: '2.5rem', color: '#0088ff', marginBottom: '1rem'}}>
                <i className="fas fa-fire"></i>
              </div>
              <div className="stat-value" data-value="1250" style={{fontSize: '3.5rem', fontWeight: 700, color: 'black', marginBottom: '0.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>1250</div>
              <div style={{fontSize: '1rem', color: 'black', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', width: '100%', display: 'block', lineHeight: '1.2', marginTop: '0.5rem', fontWeight: 500}}>CALORIES BURNED</div>
            </div>
          </div>
          <div style={{background: 'white', borderRadius: '10px', padding: '1.5rem 1rem', textAlign: 'center', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', width: '220px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
              <div style={{fontSize: '2.5rem', color: '#0088ff', marginBottom: '1rem'}}>
                <i className="fas fa-running"></i>
              </div>
              <div className="stat-value" data-value="12" style={{fontSize: '3.5rem', fontWeight: 700, color: 'black', marginBottom: '0.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>12</div>
              <div style={{fontSize: '1rem', color: 'black', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', width: '100%', display: 'block', lineHeight: '1.2', marginTop: '0.5rem', fontWeight: 500}}>WORKOUTS COMPLETED</div>
            </div>
          </div>
          <div style={{background: 'white', borderRadius: '10px', padding: '1.5rem 1rem', textAlign: 'center', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', width: '220px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
              <div style={{fontSize: '2.5rem', color: '#0088ff', marginBottom: '1rem'}}>
                <i className="fas fa-stopwatch"></i>
              </div>
              <div className="stat-value" data-value="320" style={{fontSize: '3.5rem', fontWeight: 700, color: 'black', marginBottom: '0.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>320</div>
              <div style={{fontSize: '1rem', color: 'black', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', width: '100%', display: 'block', lineHeight: '1.2', marginTop: '0.5rem', fontWeight: 500}}>MINUTES ACTIVE</div>
            </div>
          </div>
          <div style={{background: 'white', borderRadius: '10px', padding: '1.5rem 1rem', textAlign: 'center', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', width: '220px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
              <div style={{fontSize: '2.5rem', color: '#0088ff', marginBottom: '1rem'}}>
                <i className="fas fa-medal"></i>
              </div>
              <div className="stat-value" data-value="5" style={{fontSize: '3.5rem', fontWeight: 700, color: 'black', marginBottom: '0.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>5</div>
              <div style={{fontSize: '1rem', color: 'black', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', width: '100%', display: 'block', lineHeight: '1.2', marginTop: '0.5rem', fontWeight: 500}}>ACHIEVEMENTS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Workouts Section */}
      <section className="workouts-section" style={{backgroundColor: '#474747', padding: '5rem 0', textAlign: 'center'}}>
        <div className="recommended-title animated-title" data-aos="zoom-in">RECOMMENDED FOR YOU</div>
        <div className="recommended-underline" data-aos="fade-up" data-aos-delay="300"></div>
        <div className="workouts-grid">
          <div className="workout-card" data-aos="flip-left" data-aos-delay="100">
            <div className="workout-card-image workout-1"></div>
            <div className="workout-card-content">
              <h3>HIIT Cardio Blast</h3>
              <p className="workout-details">30 min • High Intensity • 350 cal</p>
              <Link to="/exercises" className="workout-card-button">Start Workout</Link>
            </div>
          </div>
          <div className="workout-card" data-aos="flip-left" data-aos-delay="200">
            <div className="workout-card-image workout-2"></div>
            <div className="workout-card-content">
              <h3>Core Strength</h3>
              <p className="workout-details">25 min • Medium Intensity • 220 cal</p>
              <Link to="/exercises" className="workout-card-button">Start Workout</Link>
            </div>
          </div>
          <div className="workout-card" data-aos="flip-left" data-aos-delay="300">
            <div className="workout-card-image workout-3"></div>
            <div className="workout-card-content">
              <h3>Full Body Power</h3>
              <p className="workout-details">45 min • High Intensity • 450 cal</p>
              <Link to="/exercises" className="workout-card-button">Start Workout</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-modal-overlay">
          <div className="logout-modal" data-aos="zoom-in">
            <h3>Log Out</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-modal-buttons">
              <Button variant="outline-secondary" onClick={cancelLogout}>Cancel</Button>
              <Button variant="danger" onClick={confirmLogout}>Log Out</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticatedHome;