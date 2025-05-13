import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './BMICalculator.css';

const BMICalculator = () => {
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set loaded state after a short delay for animations
    setTimeout(() => {
      setLoaded(true);
    }, 300);
  }, []);

  const calculateBMI = (e) => {
    e.preventDefault();

    // Validate inputs
    const errors = {};
    if (!height) errors.height = 'Height is required';
    if (!weight) errors.weight = 'Weight is required';
    if (height && (height < 50 || height > 300)) errors.height = 'Height must be between 50 and 300 cm';
    if (weight && (weight < 20 || weight > 500)) errors.weight = 'Weight must be between 20 and 500 kg';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Clear any previous validation errors
    setValidationErrors({});

    // Convert height from cm to meters
    const heightInMeters = height / 100;

    // Calculate BMI: weight (kg) / (height (m) * height (m))
    const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(calculatedBMI);

    // Determine BMI category
    if (calculatedBMI < 18.5) {
      setBmiCategory('Underweight');
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
      setBmiCategory('Normal weight');
    } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obesity');
    }

    setShowResult(true);
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setBmiCategory('');
    setShowResult(false);
    setValidationErrors({});
  };

  const getBmiCategoryColor = () => {
    if (bmiCategory === 'Underweight') return '#3498db';
    if (bmiCategory === 'Normal weight') return '#2ecc71';
    if (bmiCategory === 'Overweight') return '#f39c12';
    if (bmiCategory === 'Obesity') return '#e74c3c';
    return '#333';
  };

  return (
    <div className={`bmi-calculator-page ${loaded ? 'loaded' : ''}`}>
      <div className="bmi-hero">
        <div className="bmi-hero-content">
          <h1 className="bmi-title">BMI Calculator</h1>
          <p className="bmi-subtitle">
            Calculate your Body Mass Index to assess your weight relative to your height
          </p>
        </div>
      </div>

      <Container className="bmi-container">
        <Row className="bmi-description-row">
          <Col md={12}>
            <div className="bmi-description">
              <h2>What is BMI?</h2>
              <p>
                Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.
                It{"'"}s a simple way to determine if you{"'"}re at a healthy weight, underweight, overweight, or obese.
                While BMI is not a direct measure of body fat, it can be a useful indicator of health risks associated with weight.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="bmi-calculator-row">
          <Col lg={6} md={12} className="bmi-form-col">
            <Card className="bmi-form-card">
              <Card.Body>
                <h3 className="bmi-form-title">Calculate Your BMI</h3>
                <Form onSubmit={calculateBMI}>
                  <Form.Group className="mb-4">
                    <Form.Label>Height (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      isInvalid={!!validationErrors.height}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.height}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Weight (kg)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      isInvalid={!!validationErrors.weight}
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.weight}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="bmi-buttons">
                    <Button type="submit" className="calculate-btn">Calculate BMI</Button>
                    <Button type="button" className="reset-btn" onClick={resetCalculator}>Reset</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} md={12} className="bmi-result-col">
            {showResult ? (
              <Card className="bmi-result-card">
                <Card.Body>
                  <h3 className="bmi-result-title">Your BMI Result</h3>
                  <div className="bmi-result">
                    <div className="bmi-value">{bmi}</div>
                    <div
                      className="bmi-category"
                      style={{ color: getBmiCategoryColor() }}
                    >
                      {bmiCategory}
                    </div>
                  </div>
                  <div className="bmi-interpretation">
                    <h4>What does this mean?</h4>
                    <p>
                      {bmiCategory === 'Underweight' && 'You are underweight. Consider consulting with a healthcare professional about healthy ways to gain weight.'}
                      {bmiCategory === 'Normal weight' && 'You have a healthy weight. Maintain your current lifestyle with a balanced diet and regular exercise.'}
                      {bmiCategory === 'Overweight' && 'You are overweight. Consider making lifestyle changes such as improving your diet and increasing physical activity.'}
                      {bmiCategory === 'Obesity' && 'You are in the obesity range. It is recommended to consult with a healthcare professional for personalized advice.'}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <Card className="bmi-info-card">
                <Card.Body>
                  <h3 className="bmi-info-title">BMI Categories</h3>
                  <div className="bmi-categories">
                    <div className="bmi-category-item">
                      <div className="category-range">Below 18.5</div>
                      <div className="category-name" style={{ color: '#3498db' }}>Underweight</div>
                    </div>
                    <div className="bmi-category-item">
                      <div className="category-range">18.5 - 24.9</div>
                      <div className="category-name" style={{ color: '#2ecc71' }}>Normal weight</div>
                    </div>
                    <div className="bmi-category-item">
                      <div className="category-range">25.0 - 29.9</div>
                      <div className="category-name" style={{ color: '#f39c12' }}>Overweight</div>
                    </div>
                    <div className="bmi-category-item">
                      <div className="category-range">30.0 and above</div>
                      <div className="category-name" style={{ color: '#e74c3c' }}>Obesity</div>
                    </div>
                  </div>
                  <div className="bmi-disclaimer">
                    <p>
                      <strong>Note:</strong> BMI is a general indicator and does not account for factors like muscle mass, bone density, or body composition.
                      For a more comprehensive assessment, consult with a healthcare professional.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BMICalculator;
