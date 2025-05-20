import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/authSlice';
import './BMICalculator.css';

const BMICalculator = () => {
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set loaded state after a short delay for animations
    setTimeout(() => {
      setLoaded(true);
    }, 100);
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
    <div className={`bmi-calculator-page ${loaded ? 'loaded' : ''}`}>
      <div className="bmi-background"></div>

      {/* BMI Calculator Header */}
      <div className="bmi-header">
        <h1 className="bmi-title ">BMI Calculator</h1>
        <div className="bmi-breadcrumb  animate__delay-1s">
          <a href="#" onClick={handleHomeClick}>Home</a>
          <span>→</span>
          <span>BMI Calculator</span>
        </div>
      </div>

      <Container className="main-container">
        <div className="bmi-container">
          {/* Left Side - BMI Info */}
          <div className="bmi-info ">
            <div className="bmi-info-content">
              <h3 className="bmi-info-title">What is BMI?</h3>
              <p className="bmi-info-text">
                Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.
                It&apos;s a simple way to determine if you&apos;re at a healthy weight, underweight, overweight, or obese.
              </p>

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
                  For a comprehensive assessment, consult with a healthcare professional.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - BMI Calculator Form */}
          <div className="bmi-form-container ">
            {!showResult ? (
              <Form onSubmit={calculateBMI}>
                <Form.Control
                  type="number"
                  name="height"
                  placeholder="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  isInvalid={!!validationErrors.height}
                  required
                />
                {validationErrors.height && (
                  <div className="invalid-feedback d-block mb-3">{validationErrors.height}</div>
                )}

                <Form.Control
                  type="number"
                  name="weight"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  isInvalid={!!validationErrors.weight}
                  required
                />
                {validationErrors.weight && (
                  <div className="invalid-feedback d-block mb-3">{validationErrors.weight}</div>
                )}

                <div className="bmi-buttons">
                  <Button type="submit" className="calculate-btn">
                    Calculate BMI
                  </Button>
                  <Button type="button" className="reset-btn" onClick={resetCalculator}>
                    Reset
                  </Button>
                </div>
              </Form>
            ) : (
              <div className="bmi-result-container">
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
                <Button type="button" className="reset-btn mt-4" onClick={resetCalculator}>
                  Calculate Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BMICalculator;
