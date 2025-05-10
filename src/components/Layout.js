import React from 'react';
import './Layout.css';

/**
 * Layout component that wraps the page content
 * This component is separate from the footer to prevent page content changes
 * from affecting the footer
 */
const Layout = ({ children }) => {
  return (
    <div className="page-content-wrapper">
      {children}
    </div>
  );
};

export default Layout;
