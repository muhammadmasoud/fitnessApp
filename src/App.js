import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import AuthenticatedHome from './pages/AuthenticatedHome';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import Goals from './pages/Goals';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Offers from './pages/Offers';
import Programs from './pages/Programs';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import ToastTest from './components/ToastTest';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import './App.css';
import './styles/navbar-override.css';

function App() {
  const location = useLocation();

  const appStyle = {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative'
  };

  const headerStyle = {
    margin: 0,
    padding: 0,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  };

  const mainStyle = {
    flex: 1,
    margin: 0,
    padding: 0,
    position: 'relative'
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="app" style={appStyle}>
          <header style={headerStyle}>
            <div className="announcement-bar">
              <span className="announcement-email">📧 contact@hfitness.com</span>
              <span className="announcement-promotion">🔥 <span className="rainbow-text">20%</span> OFF all membership plans this MONTH — Sign up today and transform your fitness journey! 🔥</span>
              <div className="social-icons">
                <a href="#" className="social-icon"><i className="fas fa-light fa-bell"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            <Navigation />
          </header>
        <main className="main-content" style={mainStyle}>
          <PageTransition>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/authenticated-home" element={
                <ProtectedRoute>
                  <AuthenticatedHome />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/wishlist" element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              } />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/exercises" element={
                <ProtectedRoute>
                  <Exercises />
                </ProtectedRoute>
              } />
              <Route path="/goals" element={
                <ProtectedRoute>
                  <Goals />
                </ProtectedRoute>
              } />
              <Route path="/progress" element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/toast-test" element={<ToastTest />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
      </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
