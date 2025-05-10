import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'animate.css';
import './Contact.css';

const Contact = () => {
  const [loaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set loaded state after a short delay for animations
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    // Show success message or redirect
    alert('Thank you for your message! We will get back to you soon.');
  };

  // Function to handle home link click
  const handleHomeClick = (e) => {
    e.preventDefault();
    // If user is logged in, navigate to authenticated home page
    if (currentUser) {
      navigate('/authenticated-home');
    } else {
      // If not logged in, navigate to regular home page
      navigate('/');
    }
  };

  return (
    <div className={`contact-page ${loaded ? 'loaded' : ''}`}>
      <div className="contact-background"></div>

      {/* Contact Header */}
      <div className="contact-header">
        <h1 className="contact-title animate__animated animate__fadeInDown">Contact Us</h1>
        <div className="contact-breadcrumb animate__animated animate__fadeIn animate__delay-1s">
          <a href="#" onClick={handleHomeClick}>Home</a>
          <span>→</span>
          <span>Contact Us</span>
        </div>
      </div>

      <Container className="main-container">
        <div className="contact-container">
          {/* Left Side - Contact Info */}
          <div className="contact-info animate__animated animate__fadeInLeft">
            <div className="contact-info-items">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-label">Location:</h3>
                  <p className="contact-info-text">A108 Adam Street, New York, NY 635022</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-label">Email:</h3>
                  <p className="contact-info-text">admin@OnlineInstitute.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-label">Call:</h3>
                  <p className="contact-info-text">+1 5589 55488 55</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-container animate__animated animate__fadeInRight">
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Form.Control
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Form.Control
                as="textarea"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="message-textarea"
              />

              <Button type="submit" className="submit-btn">
                Send Message
              </Button>
            </Form>
          </div>
        </div>
      </Container>

      {/* Map Section in a separate container */}
      <Container className="map-wrapper">
        <div className="map-container animate__animated animate__fadeInUp animate__delay-1s">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564562986!5m2!1sen!2s"
            allowFullScreen=""
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </Container>
    </div>
  );
};

export default Contact;