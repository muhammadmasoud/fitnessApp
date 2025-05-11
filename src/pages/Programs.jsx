import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import 'animate.css';
import './Programs.css';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

// Import images normally to avoid issues with lazy loading images
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
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Use setTimeout to delay showing content for smoother loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    // Preload program background images with low quality
    const preloadProgramImages = () => {
      const imageUrls = [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
        'https://images.unsplash.com/photo-1588286840104-8957b019727f',
        'https://images.unsplash.com/photo-1555597673-b21d5c935865',
        'https://images.unsplash.com/photo-1530549387789-4c1017266635',
        'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed'
      ];

      imageUrls.forEach(url => {
        const img = new Image();
        img.src = `${url}?auto=format&fit=crop&w=300&q=40`; // Very low quality for preloading
      });
    };

    // Execute preloading in a non-blocking way
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadProgramImages);
    } else {
      setTimeout(preloadProgramImages, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`programs-page ${loaded ? 'loaded' : ''}`}>
      {/* What We Offer Section */}
      <section className="offer-section">
        <h2 className="section-title">WHAT WE OFFER</h2>

        <div className="offer-grid">
          {/* Removed animate__animated classes to reduce animation load */}
          <div className="offer-card">
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

          <div className="offer-card">
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

          <div className="offer-card">
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

          <div className="offer-card">
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
        <h2 className="trainers-title">EXPERT TRAINERS</h2>

        <div className="trainers-container">
          {loaded ? (
            trainers.map((trainer, index) => (
              <div key={trainer.id} className="trainer-card">
                <div className="trainer-image-container">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="trainer-image"
                    loading="lazy"
                    width="240"
                    height="300"
                  />
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
            ))
          ) : (
            <LoadingPlaceholder type="card" count={5} />
          )}
        </div>
      </section>

      {/* Our Programs Section */}
      <section className="our-programs-section">
        <div className="programs-header">
          <div className="programs-header-left">
            <h2 className="programs-title">OUR PROGRAMS</h2>
          </div>
          <div className="programs-header-right">
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
          {/* Program items with optimized rendering */}
          {[
            { name: "GYM", bgIndex: 1 },
            { name: "YOGA", bgIndex: 2 },
            { name: "KARATE", bgIndex: 3 },
            { name: "SWIMMING", bgIndex: 4 },
            { name: "BOXING", bgIndex: 5 }
          ].map((program, index) => (
            <div key={index} className="program-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="program-overlay">
                <h3 className="program-name">{program.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Programs;
