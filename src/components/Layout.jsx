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
  // Simplified version to rule out layout issues
  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default Layout;
