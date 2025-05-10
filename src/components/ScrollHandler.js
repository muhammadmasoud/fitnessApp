import { useEffect, useState } from 'react';

/**
 * Component to handle scroll behavior for the header
 * Hides the header when scrolling down and shows it when scrolling up
 */
const ScrollHandler = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const header = document.querySelector('header');
      
      if (!header) return;
      
      // If we're at the top of the page, always show the header
      if (currentScrollPos <= 50) {
        header.style.transform = 'translateY(0)';
        return;
      }
      
      // Hide header when scrolling down, show when scrolling up
      if (prevScrollPos > currentScrollPos) {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      } else {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      }
      
      setPrevScrollPos(currentScrollPos);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);
  
  // This component doesn't render anything
  return null;
};

export default ScrollHandler;
