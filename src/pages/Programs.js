import React, { useEffect, useState, useRef } from 'react';
import 'animate.css';
import './Programs.css';
import swimminginstructor from '../assets/images/swimming-instructor.jpg';
import yogainstructor from '../assets/images/yoga-instructor.jpg';
import crossfit from '../assets/images/crossfit-coach.jpg';
import nutrition from '../assets/images/nutrition-coach.jpg';
import Pilates from '../assets/images/Pilates-Instructor.jpg';

const Programs = () => {
  const [loaded, setLoaded] = useState(false);
  const trainersRef = useRef(null);

  // Trainer data with random images from Unsplash
  const trainers = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Karate Master",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Matt Booze",
      role: "Swimming Instructor",
      image: swimminginstructor
    },
    {
      id: 3,
      name: "Janet McDonald",
      role: "Yoga Instructor",
      image: yogainstructor
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Pilates Instructor",
      image: Pilates
    },
    {
      id: 5,
      name: "Marcus Lee",
      role: "Boxing Coach",
      image: "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      name: "Michael Torres",
      role: "CrossFit Coach",
      image: crossfit
    },
    {
      id: 7,
      name: "Henry Boston",
      role: "Fitness Coach",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 8,
      name: "Emma Rodriguez",
      role: "Nutrition Coach",
      image: nutrition
    }
  ];

  useEffect(() => {
    setLoaded(true);

    // Add scroll event listener for animations
    const handleScroll = () => {
      // Animation logic can be added here if needed
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the section is already in view
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`programs-page ${loaded ? 'loaded' : ''}`}>
      {/* What We Offer Section */}
      <section className="offer-section">
        <h2 className="section-title animate__animated animate__fadeInDown">WHAT WE OFFER</h2>

        <div className="offer-grid">
          <div className="offer-card animate__animated animate__zoomIn animate__delay-1s">
            <div className="card-3d-effect"></div>
            <div className="offer-overlay">
              <h3 className="offer-title">Group Classes</h3>
              <a href="#" className="learn-more">
                <span className="learn-more-circle">
                  <i className="fas fa-arrow-right"></i>
                </span>
                LEARN MORE
              </a>
            </div>
          </div>

          <div className="offer-card animate__animated animate__zoomIn animate__delay-2s">
            <div className="card-3d-effect"></div>
            <div className="offer-overlay">
              <h3 className="offer-title">Personal Training</h3>
              <a href="#" className="learn-more">
                <span className="learn-more-circle">
                  <i className="fas fa-arrow-right"></i>
                </span>
                LEARN MORE
              </a>
            </div>
          </div>

          <div className="offer-card animate__animated animate__zoomIn animate__delay-3s">
            <div className="card-3d-effect"></div>
            <div className="offer-overlay">
              <h3 className="offer-title">Specialized Programs</h3>
              <a href="#" className="learn-more">
                <span className="learn-more-circle">
                  <i className="fas fa-arrow-right"></i>
                </span>
                LEARN MORE
              </a>
            </div>
          </div>

          <div className="offer-card animate__animated animate__zoomIn animate__delay-4s">
            <div className="card-3d-effect"></div>
            <div className="offer-overlay">
              <h3 className="offer-title">Additional Amenities</h3>
              <a href="#" className="learn-more">
                <span className="learn-more-circle">
                  <i className="fas fa-arrow-right"></i>
                </span>
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Trainers Section */}
      <section className="trainers-section" ref={trainersRef}>
        <h2 className="trainers-title animate__animated animate__fadeInDown">EXPERT TRAINERS</h2>

        <div className="trainers-container">
          {trainers.map((trainer, index) => (
            <div key={trainer.id} className={`trainer-card animate__animated animate__fadeInUp animate__delay-${index + 1}s`}>
              <div className="trainer-image-container">
                <img src={trainer.image} alt={trainer.name} className="trainer-image" />
                <div className="trainer-social">
                  <a href="https://www.instagram.com/" className="social-icon"><i className="fab fa-instagram"></i></a>
                  <a href="https://x.com/" className="social-icon"><i className="fa-brands fa-x-twitter"></i></a>
                </div>
              </div>
              <div className="trainer-info">
                <h3 className="trainer-name">{trainer.name}</h3>
                <p className="trainer-role">{trainer.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Programs Section */}
      <section className="our-programs-section">
        <div className="programs-header">
          <div className="programs-header-left">
            <h2 className="programs-title animate__animated animate__fadeInUp">OUR PROGRAMS</h2>
          </div>
          <div className="programs-header-right animate__animated animate__fadeInUp animate__delay-1s">
            <p className="programs-subtitle">
              Discover a range of programs tailored to your goals. Whether you're
              building endurance, learning discipline, or pushing your limits.
            </p>
            <a href="#" className="view-schedule-btn">
              <span className="schedule-circle">
                <i className="fas fa-arrow-right"></i>
              </span>
              View Schedule
            </a>
          </div>
        </div>

        <div className="programs-grid">
          <div className="program-item animate__animated animate__fadeInUp animate__delay-1s">
            <div className="program-shine"></div>
            <div className="program-overlay">
              <h3 className="program-name">GYM</h3>
            </div>
          </div>

          <div className="program-item animate__animated animate__fadeInUp animate__delay-2s">
            <div className="program-shine"></div>
            <div className="program-overlay">
              <h3 className="program-name">YOGA</h3>
            </div>
          </div>

          <div className="program-item animate__animated animate__fadeInUp animate__delay-3s">
            <div className="program-shine"></div>
            <div className="program-overlay">
              <h3 className="program-name">KARATE</h3>
            </div>
          </div>

          <div className="program-item animate__animated animate__fadeInUp animate__delay-4s">
            <div className="program-shine"></div>
            <div className="program-overlay">
              <h3 className="program-name">SWIMMING</h3>
            </div>
          </div>

          <div className="program-item animate__animated animate__fadeInUp animate__delay-5s">
            <div className="program-shine"></div>
            <div className="program-overlay">
              <h3 className="program-name">BOXING</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
