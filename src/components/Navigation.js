import { useState, useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navigation.css';
import '../pages/DarkNavbar.css';
import HoverDropdown from './HoverDropdown';
import UserDropdown from './UserDropdown';
import LogoAnimation from './LogoAnimation';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const pagesWithDarkNav = ['/pricing', '/about', '/gallery', '/services', '/offers', '/programs', '/products', '/contact', '/cart', '/checkout', '/wishlist'];
  const needsDarkNav = pagesWithDarkNav.includes(location.pathname);
  const [expanded, setExpanded] = useState(false);

  const cartCount = getCartCount();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className={`navbar-custom ${needsDarkNav ? 'pricing-navbar' : ''}`} expanded={expanded} onToggle={(e) => setExpanded(e)}>
      <Container>
        <Navbar.Brand as={Link} to={currentUser ? "/authenticated-home" : "/"} className="logo">
          <div className="brand-logo">
            <LogoAnimation width={150} height={150} style={{ marginRight: '10px' }} />
            <span className="brand-text">FITNESS</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="mx-auto">
            <Nav.Link
              as={Link}
              to={currentUser ? "/authenticated-home" : "/"}
              onClick={() => setExpanded(false)}
              className={location.pathname === '/' || location.pathname === '/authenticated-home' ? 'active' : ''}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              onClick={() => setExpanded(false)}
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/gallery"
              onClick={() => setExpanded(false)}
              className={location.pathname === '/gallery' ? 'active' : ''}
            >
              Gallery
            </Nav.Link>
            <div className="nav-item">
              <HoverDropdown
                title="Services"
                isActive={location.pathname === '/offers' || location.pathname === '/programs' || location.pathname === '/services'}
                items={[
                  { label: 'Offers', path: '/offers' },
                  { label: 'Programs', path: '/programs' }
                ]}
              />
            </div>
            <div className="nav-item">
              <HoverDropdown
                title="Shop"
                isActive={location.pathname === '/products' || location.pathname === '/cart' || location.pathname === '/checkout' || location.pathname === '/wishlist'}
                items={[
                  { label: 'Products', path: '/products' },
                  { label: 'Cart', path: '/cart' },
                  { label: 'Wishlist', path: '/wishlist' }
                ]}
              />
            </div>
            <Nav.Link
              as={Link}
              to="/pricing"
              onClick={() => setExpanded(false)}
              className={location.pathname === '/pricing' ? 'active' : ''}
            >
              Pricing
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              onClick={() => setExpanded(false)}
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="nav-actions">
          {currentUser && (
            <div className="cart-icon-container">
              <Link to="/cart" className="cart-icon-link">
                <i className="fas fa-shopping-cart"></i>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
            </div>
          )}

          <div className="auth-buttons">
            {currentUser ? (
              <div className="nav-item">
                <UserDropdown
                  username={currentUser.fullName}
                  items={[
                    { label: 'Dashboard', path: '/dashboard' },
                    { label: 'Profile', path: '/profile' },
                    { label: 'Track Your Order', path: '/order-tracking' }
                  ]}
                  onLogout={handleLogout}
                />
              </div>
            ) : (
              <>
                <Link to="/track-order" className="track-order-link">
                  <i className="fas fa-truck me-1"></i> Track Order
                </Link>
                <Button as={Link} to="/login" className="login-btn">Log in</Button>
                <Button as={Link} to="/signup" className="sign-up-btn">Sign up</Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
