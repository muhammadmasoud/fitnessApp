import { Fragment } from 'react';
import './Layout.css';

/**
 * Layout component that wraps the page content
 * This component is separate from the footer to prevent page content changes
 * from affecting the footer
 *
 * Uses Fragment when possible to reduce DOM nesting
 */
const Layout = ({ children }) => {
  // If we need the wrapper div for styling, use it
  // Otherwise, just return the children in a Fragment
  return (
    <div className="page-content-wrapper">
      <Fragment>
        {children}
      </Fragment>
    </div>
  );
};

export default Layout;
