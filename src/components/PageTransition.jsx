import { useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

const PageTransition = ({ children }) => {
  const location = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Simplified version without transition effects
  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default PageTransition;
