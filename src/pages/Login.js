import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'animate.css';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Force the form to be visible immediately
  useEffect(() => {
    console.log("Login component mounted");

    // Force form to be visible with inline style
    if (formRef.current) {
      console.log("Form ref exists, applying styles");
      formRef.current.style.opacity = "1";
      formRef.current.style.transform = "translateY(0)";
      formRef.current.style.visibility = "visible";
    } else {
      console.log("Form ref does not exist yet");
    }

    // Fallback method using querySelector
    const form = document.querySelector('.animated-form');
    if (form) {
      console.log("Form found via querySelector, applying styles");
      form.style.opacity = "1";
      form.style.transform = "translateY(0)";
      form.style.visibility = "visible";
      form.classList.add('form-loaded');
    } else {
      console.log("Form not found via querySelector");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Attempt to login using the AuthContext
      await login(email, password);

      // If successful, redirect to authenticated home page
      navigate('/authenticated-home');
    } catch (error) {
      setError(error.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="particle-container">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className={`particle particle-${index + 1}`}></div>
          ))}
        </div>
      </div>
      <Container>
        <div className="login-container">
          <div className="login-content">
            <div className="login-header animate__animated animate__fadeInDown">
              <h1>Welcome Back</h1>
              <p>Log in to continue your fitness journey</p>
            </div>

            {error && <Alert variant="danger" className="animate__animated animate__shakeX">{error}</Alert>}

            <Form
              ref={formRef}
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="animated-form"
              style={{ opacity: 1, transform: 'translateY(0)', visibility: 'visible' }}>
              <Form.Group className="mb-4 form-item" data-animation-delay="100">
                <div className="input-icon-wrapper">
                  <i className="fas fa-envelope input-icon"></i>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input-animation"
                    style={{ paddingLeft: '45px' }} /* Inline style to ensure padding */
                    id="email-input"
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
                <Form.Label htmlFor="email-input">Email address</Form.Label>
              </Form.Group>

              <Form.Group className="mb-4 form-item" data-animation-delay="200">
                <div className="input-icon-wrapper">
                  <i className="fas fa-lock input-icon"></i>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input-animation"
                    style={{ paddingLeft: '45px' }} /* Inline style to ensure padding */
                    id="password-input"
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Please enter your password.
                </Form.Control.Feedback>
                <Form.Label htmlFor="password-input">Password</Form.Label>
              </Form.Group>

              <div className="login-options mb-4 form-item" data-animation-delay="300">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-animation"
                />
                <button
                  type="button"
                  className="btn btn-link forgot-password p-0"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Forgot password clicked');
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <div className="form-item" data-animation-delay="400">
                <button
                  type="submit"
                  className="btn btn-primary login-btn w-100"
                  disabled={isSubmitting}
                >
                  <span className="btn-text">
                    {isSubmitting ? 'Logging in...' : 'Log In'}
                  </span>
                  <span className="btn-shine"></span>
                </button>
              </div>

              <div className="text-center mt-4 signup-prompt form-item" data-animation-delay="500">
                <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
              </div>

              <div className="social-login form-item" data-animation-delay="600">
                <p className="social-login-text">Or log in with</p>
                <div className="social-login-buttons">
                  <button
                    type="button"
                    className="btn btn-outline-primary social-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Facebook login clicked');
                    }}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger social-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Google login clicked');
                    }}
                  >
                    <i className="fab fa-google"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark social-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Apple login clicked');
                    }}
                  >
                    <i className="fab fa-apple"></i>
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
