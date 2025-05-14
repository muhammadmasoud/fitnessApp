import { Fragment, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PageTransition from './components/PageTransition.jsx';
import Layout from './components/Layout.jsx';
import ScrollHandler from './components/ScrollHandler.jsx';
import FireAnimation from './components/FireAnimation.jsx';
import Home from './pages/Home.jsx';
import AuthenticatedHome from './pages/AuthenticatedHome.jsx';
import About from './pages/About.jsx';
import Trainers from './pages/Trainers.jsx';
import Pricing from './pages/Pricing.jsx';
import Contact from './pages/Contact.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Exercises from './pages/Exercises.jsx';
import Classes from './pages/Classes.jsx';
import Schedule from './pages/Schedule.jsx';
import Nutrition from './pages/Nutrition.jsx';
import BMICalculator from './pages/BMICalculator.jsx';
import Goals from './pages/Goals.jsx';
import Progress from './pages/Progress.jsx';
import Profile from './pages/Profile.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Offers from './pages/Offers.jsx';
import Programs from './pages/Programs.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderTracking from './pages/OrderTracking.jsx';
import TrackOrderPublic from './pages/TrackOrderPublic.jsx';
import Wishlist from './pages/Wishlist.jsx';

import ToastTest from './components/ToastTest.jsx';
import { AuthProvider, AuthContext } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import './App.css';
import './styles/navbar-override.css';

function App() {
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
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'transform 0.3s ease'
  };

  const mainStyle = {
    flex: 1,
    margin: 0,
    padding: '100px 0 0 0', // Add padding to account for fixed header
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };

  const footerStyle = {
    width: '100%',
    position: 'relative',
    zIndex: 10
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent
            appStyle={appStyle}
            headerStyle={headerStyle}
            mainStyle={mainStyle}
            footerStyle={footerStyle}
          />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

// Create a component that will use the AuthContext
const AppContent = ({ appStyle, headerStyle, mainStyle, footerStyle }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="app" style={appStyle}>
      <ScrollHandler />
      <header style={headerStyle}>
        {/* Only show announcement bar when user is not logged in */}
        {!currentUser && (
          <div className="announcement-bar">
            <Fragment>
              <span className="announcement-email">📧 contact@fitness.com</span>
              <span className="announcement-promotion">
                <FireAnimation width={35} height={40} />
                <span className="rainbow-text">20%</span> OFF for all new members this MONTH — Sign up today and transform your fitness journey!
                <FireAnimation width={35} height={40} />
              </span>
            </Fragment>
            <div className="announcement-social-icons">
              <Fragment>
                <a href="https://www.facebook.com/" className="announcement-social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/" className="announcement-social-icon"><i className="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/" className="announcement-social-icon"><i className="fab fa-youtube"></i></a>
                <a href="https://www.x.com/" className="announcement-social-icon"><i className="fa-brands fa-x-twitter"></i></a>
              </Fragment>
            </div>
          </div>
        )}
        <Navigation />
      </header>
      <main className="main-content" style={mainStyle}>
        <Layout>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/authenticated-home" element={
                <ProtectedRoute>
                  <AuthenticatedHome />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/trainers" element={<Trainers />} />
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
              <Route path="/order-tracking" element={
                <ProtectedRoute>
                  <OrderTracking />
                </ProtectedRoute>
              } />
              <Route path="/track-order" element={<TrackOrderPublic />} />
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
              <Route path="/classes" element={
                <ProtectedRoute>
                  <Classes />
                </ProtectedRoute>
              } />
              <Route path="/schedule" element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              } />
              <Route path="/nutrition" element={
                <ProtectedRoute>
                  <Nutrition />
                </ProtectedRoute>
              } />
              <Route path="/bmi-calculator" element={
                <ProtectedRoute>
                  <BMICalculator />
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
        </Layout>
      </main>
      <footer style={footerStyle}>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
