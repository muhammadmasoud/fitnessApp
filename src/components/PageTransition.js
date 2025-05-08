import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const scrollPositions = useRef({});
  const prevPathname = useRef(location.pathname);

  // Save scroll position when location changes
  useEffect(() => {
    scrollPositions.current[prevPathname.current] = window.scrollY;
    prevPathname.current = location.pathname;
  }, [location]);

  // Handle location changes
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      // Start fade out transition
      setTransitionStage("fadeOut");

      // Prevent scrolling during transition
      document.body.style.overflow = 'hidden';
    }
  }, [location, displayLocation]);

  // Handle animation end
  const handleAnimationEnd = () => {
    if (transitionStage === "fadeOut") {
      // Update to new location after fade out
      setTransitionStage("fadeIn");
      setDisplayLocation(location);

      // Scroll to top for new page (or to saved position if navigating back)
      window.scrollTo(0, 0);

      // Re-enable scrolling
      document.body.style.overflow = '';
    }
  };

  return (
    <div className="transition-container">
      <div
        className={`page-transition ${transitionStage}`}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
