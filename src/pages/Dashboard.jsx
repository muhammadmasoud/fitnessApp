import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faHeartPulse,
  faPersonWalking,
  faCalendarDays,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import DynamicBackground from '../components/DynamicBackground';
import dashboardBg from '../assets/images/dashboard.jpg';
import 'animate.css';
import './Dashboard.css';

// Register Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
  const currentUser = useSelector(selectCurrentUser);

  // Dummy data for charts
  const heartRateData = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [{
      label: 'Heart Rate',
      data: [80, 110, 95, 120, 85, 110, 90],
      fill: false,
      borderColor: '#FFD700',
      tension: 0.4
    }]
  };

  const stepsData = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [{
      label: 'Steps',
      data: [7000, 8500, 10000, 9000, 11000, 8000, 9500],
      fill: false,
      borderColor: '#90EE90',
      tension: 0.4
    }]
  };

  // Activity data for weekly overview
  const activityData = {
    labels: ['5 Aug', '6 Aug', '7 Aug', '8 Aug', '9 Aug', '10 Aug', '11 Aug', '12 Aug', '13 Aug'],
    datasets: [{
      label: 'Activity Percentage',
      data: [40, 50, 90, 55, 40, 60, 30, 70, 100],
      backgroundColor: (context) => {
        const index = context.dataIndex;
        return index === 8 ? '#FFD700' : '#87CEFA';
      },
      borderRadius: 8,
      barThickness: 20,
    }]
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    },
  };

  return (
    <DynamicBackground
      imageUrl={dashboardBg}
      className="dashboard-page"
      style={{ paddingTop: '120px', paddingBottom: '100px' }}
    >
      <Container fluid className="dashboard-container">
        <div className="dashboard-header">
          <h1>Hello, {currentUser?.fullName || 'Wingman'}! 👋</h1>
          <p>Welcome and let's do some workout today!</p>
        </div>

        <div className="dashboard-grid">
          {/* Welcome & Quick Stats Section */}
          <div className="grid-section welcome-stats-section">
            <div className="section-container compact-container">
              <h1 className="cart-title animate__animated animate__fadeInDown">QUICK STATS</h1>
              <div className="section-content">
                <div className="compact-stats-cards">
                  <Card className="calories-card">
                    <div className="calories-header">
                      <div className="calories-title">Today</div>
                      <div className="calories-date">17, July</div>
                    </div>
                    <div className="calories-circle-container">
                      <svg className="calories-circle-progress" viewBox="0 0 100 100">
                        <circle className="calories-circle-bg" cx="50" cy="50" r="44" />
                        <circle
                          className="calories-circle-value"
                          cx="50"
                          cy="50"
                          r="44"
                          strokeDasharray="276.5"
                          strokeDashoffset="96.8" // 276.5 * (1 - 0.65) for 65% progress
                        />
                      </svg>
                      <div className="calories-circle-text">
                        <p className="calories-value">1450</p>
                        <p className="calories-label">calories</p>
                      </div>
                    </div>
                    <div className="nutrition-bars">
                      <div className="nutrition-item">
                        <div className="nutrition-label">
                          F <span className="nutrition-value">-9/11g</span>
                        </div>
                        <div className="nutrition-progress">
                          <div className="nutrition-progress-value" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      <div className="nutrition-item">
                        <div className="nutrition-label">
                          P <span className="nutrition-value">-15/17g</span>
                        </div>
                        <div className="nutrition-progress">
                          <div className="nutrition-progress-value" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                      <div className="nutrition-item">
                        <div className="nutrition-label">
                          C <span className="nutrition-value">-6/7g</span>
                        </div>
                        <div className="nutrition-progress">
                          <div className="nutrition-progress-value" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="stat-card">
                    <Card.Body>
                      <div className="stat-icon">
                        <FontAwesomeIcon icon={faHeartPulse} />
                      </div>
                      <div className="stat-data">
                        <div className="stat-value">110<span className="stat-unit">bpm</span></div>
                        <div className="stat-label">Yesterday · 108 bpm</div>
                      </div>
                      <div className="stat-chart">
                        <Line data={heartRateData} options={lineChartOptions} height={50} />
                      </div>
                    </Card.Body>
                  </Card>
                  <Card className="stat-card">
                    <Card.Body>
                      <div className="stat-icon">
                        <FontAwesomeIcon icon={faPersonWalking} />
                      </div>
                      <div className="stat-data">
                        <div className="stat-value">10,050<span className="stat-unit">steps</span></div>
                        <div className="stat-label">Yesterday · 976 steps</div>
                      </div>
                      <div className="stat-chart">
                        <Line data={stepsData} options={lineChartOptions} height={50} />
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Progress Section */}
          <div className="grid-section activity-progress-section">
            <div className="section-container">
              <h1 className="cart-title animate__animated animate__fadeInDown">ACTIVITY PROGRESS</h1>
              <div className="section-content">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title">Activity</h5>
                  <div className="date-label">Friday</div>
                </div>

                <div className="daily-stats">
                  <div className="daily-stat">
                    <div className="daily-stat-label">Progress</div>
                    <div className="daily-stat-value">100%</div>
                    <div className="progress-bar-container">
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="daily-stat">
                    <div className="daily-stat-label">Calories</div>
                    <div className="daily-stat-value">82% (150 kcal)</div>
                    <div className="progress-bar-container">
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="activity-chart">
                  <Bar data={activityData} options={barChartOptions} height={180} />
                </div>

                <div className="date-selector">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="date-range">
                      <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
                      5 - 13 August 2028
                    </div>
                    <div className="date-arrows">
                      <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </DynamicBackground>
  );
};

export default Dashboard;
