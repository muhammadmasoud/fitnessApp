import { useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

const PageTransition = ({ children }) => {
  const location = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="transition-container">
      <div className="page-transition">
        <Fragment>
          {children}
        </Fragment>
      </div>
    </div>
  );
};

export default PageTransition;
