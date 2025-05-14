import { useState, useEffect, useRef, useContext } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'animate.css';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Force the form to be visible immediately
  useEffect(() => {
    console.log("Signup component mounted");

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

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeTerms' ? checked : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Register the user
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-background">
        <div className="particle-container">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className={`particle particle-${index + 1}`}></div>
          ))}
        </div>
      </div>
      <Container>
        <div className="signup-container">
          <div className="signup-content">
            <div className="signup-header animate__animated animate__fadeInDown">
              <h1>Create Account</h1>
              <p>Join our fitness community and start your journey</p>
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
                  <i className="fas fa-user input-icon"></i>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="form-input-animation"
                    style={{ paddingLeft: '45px' }} /* Inline style to ensure padding */
                    id="fullname-input"
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Please enter your full name.
                </Form.Control.Feedback>
                <Form.Label htmlFor="fullname-input">Full Name</Form.Label>
              </Form.Group>

              <Form.Group className="mb-4 form-item" data-animation-delay="200">
                <div className="input-icon-wrapper">
                  <i className="fas fa-envelope input-icon"></i>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
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
                <br></br>
                <Form.Text className="text-muted">
                  We&apos;ll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-4 form-item" data-animation-delay="300">
                <div className="input-icon-wrapper">
                  <i className="fas fa-lock input-icon"></i>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    className="form-input-animation"
                    style={{ paddingLeft: '45px' }} /* Inline style to ensure padding */
                    id="password-input"
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Password must be at least 6 characters.
                </Form.Control.Feedback>
                <Form.Label htmlFor="password-input">Password</Form.Label>
              </Form.Group>

              <Form.Group className="mb-4 form-item" data-animation-delay="400">
                <div className="input-icon-wrapper">
                  <i className="fas fa-lock input-icon"></i>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="form-input-animation"
                    style={{ paddingLeft: '45px' }} /* Inline style to ensure padding */
                    id="confirm-password-input"
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Please confirm your password.
                </Form.Control.Feedback>
                <Form.Label htmlFor="confirm-password-input">Confirm Password</Form.Label>
              </Form.Group>

              <Form.Group className="mb-4 form-item" data-animation-delay="500">
                <Form.Check
                  type="checkbox"
                  name="agreeTerms"
                  label="I agree to the Terms and Conditions"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                  className="checkbox-animation"
                />
              </Form.Group>

              <div className="form-item" data-animation-delay="600">
                <button
                  type="submit"
                  className="btn btn-primary signup-btn w-100"
                  disabled={isSubmitting}
                >
                  <span className="btn-text">
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </span>
                  <span className="btn-shine"></span>
                </button>
              </div>

              <div className="text-center mt-4 login-prompt form-item" data-animation-delay="700">
                <p>Already have an account? <Link to="/login" className="login-link">Log in</Link></p>
              </div>

              <div className="social-signup form-item" data-animation-delay="800">
                <p className="social-signup-text">Or sign up with</p>
                <div className="social-signup-buttons">
                  <button
                    type="button"
                    className="btn btn-outline-primary social-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Facebook signup clicked');
                    }}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger social-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Google signup clicked');
                    }}
                  >
                    <i className="fab fa-google"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark social-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Apple signup clicked');
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

export default Signup;
