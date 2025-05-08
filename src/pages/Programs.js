import React, { useEffect, useState, useRef } from 'react';
import 'animate.css';
import './Programs.css';

const Programs = () => {
  const [loaded, setLoaded] = useState(false);
  const [clientCount, setClientCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const statsRef = useRef(null);
  const countersStarted = useRef(false);

  useEffect(() => {
    setLoaded(true);

    // Add scroll event listener for animations
    const handleScroll = () => {
      if (statsRef.current && !countersStarted.current) {
        const statsPosition = statsRef.current.getBoundingClientRect();
        // Start counter animation when stats section is in view
        if (statsPosition.top < window.innerHeight && statsPosition.bottom >= 0) {
          startCounters();
          countersStarted.current = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the section is already in view
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const startCounters = () => {
    // Client counter (0 to 20,000)
    const clientDuration = 2000; // 2 seconds
    const clientIncrement = 100;
    const clientTarget = 20000;
    let clientCurrent = 0;
    const clientInterval = setInterval(() => {
      clientCurrent += clientIncrement;
      if (clientCurrent >= clientTarget) {
        clearInterval(clientInterval);
        setClientCount(clientTarget);
      } else {
        setClientCount(clientCurrent);
      }
    }, clientDuration / (clientTarget / clientIncrement));

    // Trainer counter (0 to 30)
    const trainerDuration = 1500; // 1.5 seconds
    const trainerIncrement = 1;
    const trainerTarget = 30;
    let trainerCurrent = 0;
    const trainerInterval = setInterval(() => {
      trainerCurrent += trainerIncrement;
      if (trainerCurrent >= trainerTarget) {
        clearInterval(trainerInterval);
        setTrainerCount(trainerTarget);
      } else {
        setTrainerCount(trainerCurrent);
      }
    }, trainerDuration / trainerTarget);

    // Experience counter (0 to 8,000)
    const expDuration = 1800; // 1.8 seconds
    const expIncrement = 50;
    const expTarget = 8000;
    let expCurrent = 0;
    const expInterval = setInterval(() => {
      expCurrent += expIncrement;
      if (expCurrent >= expTarget) {
        clearInterval(expInterval);
        setExperienceCount(expTarget);
      } else {
        setExperienceCount(expCurrent);
      }
    }, expDuration / (expTarget / expIncrement));
  };

  // Format the numbers for display
  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}k+`;
    }
    return num.toString();
  };

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

      {/* Vision & Mission Section */}
      <section className="vision-section">
        <div className="vision-container">
          <div className="vision-left animate__animated animate__fadeInLeft">
            <h3 className="vision-subtitle">Vision & Mission</h3>
          </div>
          <div className="vision-right animate__animated animate__fadeInRight">
            <p className="vision-text">
              We're on a mission to build stronger, healthier lives through focused,
              intentional fitness. Our vision is to lead a movement where simplicity
              meets strength and transformation begins.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-container">
          <div className="stat-item animate__animated animate__flipInX animate__delay-1s">
            <div className="stat-glow"></div>
            <h2 className="stat-number">{clientCount >= 20000 ? '20k+' : formatNumber(clientCount)}</h2>
            <p className="stat-label">Clients</p>
          </div>

          <div className="stat-item animate__animated animate__flipInX animate__delay-2s">
            <div className="stat-glow"></div>
            <h2 className="stat-number">{trainerCount}</h2>
            <p className="stat-label">Trainers</p>
          </div>

          <div className="stat-item animate__animated animate__flipInX animate__delay-3s">
            <div className="stat-glow"></div>
            <h2 className="stat-number">{experienceCount >= 8000 ? '8k+' : formatNumber(experienceCount)}</h2>
            <p className="stat-label">Experience</p>
          </div>
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
