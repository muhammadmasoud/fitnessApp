import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Classes.css';

const Classes = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set loaded state after a short delay for animations
    setTimeout(() => {
      setLoaded(true);
    }, 300);
  }, []);

  const classesData = [
    {
      id: 1,
      name: 'Yoga',
      description: 'Find balance and inner peace with our yoga classes designed for all levels.',
      duration: '60 min',
      intensity: 'Low to Medium',
      instructor: 'Sarah Johnson'
    },
    {
      id: 2,
      name: 'HIIT',
      description: 'High-Intensity Interval Training to maximize calorie burn and improve cardiovascular health.',
      duration: '45 min',
      intensity: 'High',
      instructor: 'Mike Thompson'
    },
    {
      id: 3,
      name: 'Pilates',
      description: 'Strengthen your core and improve flexibility with our Pilates classes.',
      duration: '55 min',
      intensity: 'Medium',
      instructor: 'Emma Rodriguez'
    },
    {
      id: 4,
      name: 'Spinning',
      description: 'High-energy indoor cycling classes set to motivating music.',
      duration: '50 min',
      intensity: 'Medium to High',
      instructor: 'David Clark'
    },
    {
      id: 5,
      name: 'Zumba',
      description: "Dance-based fitness class that's fun, energetic, and makes you feel amazing.",
      duration: '60 min',
      intensity: 'Medium',
      instructor: 'Maria Sanchez'
    },
    {
      id: 6,
      name: 'CrossFit',
      description: 'Varied functional movements performed at high intensity to build strength and conditioning.',
      duration: '60 min',
      intensity: 'High',
      instructor: 'James Wilson'
    }
  ];

  return (
    <div className={`classes-page ${loaded ? 'loaded' : ''}`}>
      <div className="classes-hero">
        <div className="classes-hero-content">
          <h1 className="classes-title">Our Classes</h1>
          <p className="classes-subtitle">
            Join our diverse range of fitness classes led by expert instructors
          </p>
        </div>
      </div>

      <Container className="classes-container">
        <Row className="classes-description-row">
          <Col md={12}>
            <div className="classes-description">
              <h2>Find Your Perfect Class</h2>
              <p>
                Whether you&apos;re looking to build strength, improve flexibility, or boost your cardio fitness,
                we have a class that&apos;s perfect for you. Our expert instructors will guide you through each
                session, ensuring proper form and maximum results.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="classes-grid">
          {classesData.map((fitnessClass) => (
            <Col key={fitnessClass.id} lg={4} md={6} sm={12} className="class-col">
              <Card className="class-card">
                <Card.Body>
                  <Card.Title className="class-name">{fitnessClass.name}</Card.Title>
                  <Card.Text className="class-description">{fitnessClass.description}</Card.Text>
                  <div className="class-details">
                    <div className="detail-item">
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">{fitnessClass.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Intensity:</span>
                      <span className="detail-value">{fitnessClass.intensity}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Instructor:</span>
                      <span className="detail-value">{fitnessClass.instructor}</span>
                    </div>
                  </div>
                  <button className="book-class-btn">Book Class</button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Classes;
