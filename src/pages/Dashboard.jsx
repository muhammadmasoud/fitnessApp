import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faHeartPulse,
  faPersonWalking,
  faCalendarDays,
  faChevronLeft,
  faChevronRight,
  faEllipsisVertical,
  faRunning,
  faDumbbell,
  faYinYang,
  faPlus,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './Dashboard.css';

// Register Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
  const [currentMonth] = useState('August 2028');
  const [selectedDate] = useState(13); // Default to 13th day

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

  const activityData = {
    labels: ['5 Aug', '6 Aug', '7 Aug', '8 Aug', '9 Aug', '10 Aug', '11 Aug', '12 Aug', '13 Aug'],
    datasets: [{
      label: 'Activity Percentage',
      data: [40, 50, 90, 55, 40, 60, 30, 70, 45],
      backgroundColor: (context) => {
        const index = context.dataIndex;
        return index === 2 ? '#FFD700' : '#87CEFA';
      },
      borderRadius: 8,
      barThickness: 20,
    }]
  };

  // Calendar data
  const calendarDays = [
    { day: 'S', date: 25, month: 'prev' },
    { day: 'M', date: 26, month: 'prev' },
    { day: 'T', date: 27, month: 'prev' },
    { day: 'W', date: 28, month: 'prev' },
    { day: 'T', date: 29, month: 'prev' },
    { day: 'F', date: 30, month: 'prev' },
    { day: 'S', date: 31, month: 'prev' },
    { day: 'S', date: 1 },
    { day: 'M', date: 2 },
    { day: 'T', date: 3 },
    { day: 'W', date: 4 },
    { day: 'T', date: 5 },
    { day: 'F', date: 6 },
    { day: 'S', date: 7 },
    { day: 'S', date: 8 },
    { day: 'M', date: 9 },
    { day: 'T', date: 10 },
    { day: 'W', date: 11 },
    { day: 'T', date: 12 },
    { day: 'F', date: 13, active: true },
    { day: 'S', date: 14 },
    { day: 'S', date: 15 },
    { day: 'M', date: 16 },
    { day: 'T', date: 17 },
    { day: 'W', date: 18 },
    { day: 'T', date: 19 },
    { day: 'F', date: 20 },
    { day: 'S', date: 21 },
    { day: 'S', date: 22, today: true },
    { day: 'M', date: 23 },
    { day: 'T', date: 24 },
    { day: 'W', date: 25 },
    { day: 'T', date: 26 },
    { day: 'F', date: 27 },
    { day: 'S', date: 28 },
    { day: 'S', date: 29 },
    { day: 'M', date: 30 },
    { day: 'T', date: 31 },
    { day: 'W', date: 1, month: 'next' },
    { day: 'T', date: 2, month: 'next' },
    { day: 'F', date: 3, month: 'next' },
    { day: 'S', date: 4, month: 'next' },
    { day: 'S', date: 5, month: 'next' },
  ];

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

  // Dummy data for scheduled activities
  const scheduledActivities = [
    {
      time: '6:30 AM',
      title: 'Morning Cardio Blast',
      description: 'High-Intensity Interval Training (HIIT)',
      type: 'cardio',
      completed: true
    },
    {
      time: '12:00 PM',
      title: 'Strength Circuit',
      description: 'Full-Body Strength Training',
      type: 'strength'
    },
    {
      time: '7:00 PM',
      title: 'Yoga Flow',
      description: 'Flexibility and Relaxation',
      type: 'yoga'
    }
  ];

  // Dummy data for recent activities
  const recentActivities = [
    {
      time: '6:30 AM',
      title: 'Completed Morning Cardio Session',
      type: 'cardio'
    },
    {
      time: '12:00 PM',
      title: 'Completed Strength Training Circuit',
      type: 'strength'
    },
    {
      time: '2:00 PM',
      title: 'Finished Yoga Flow Class',
      description: '20-minute · 100 Cal',
      details: 'Flexibility and mobility session focused on deep stretches',
      type: 'yoga'
    }
  ];

  // Dummy data for classes
  const myClasses = [
    {
      type: 'strength',
      title: 'Strength & Conditioning',
      instructor: 'Jordan Reed',
      videos: 12,
      duration: '30-45 min/session',
      level: 'Intermediate'
    },
    {
      type: 'cardio',
      title: 'Cardio Blast',
      instructor: 'Emily Thompson',
      videos: 10,
      duration: '20-30 min/session',
      level: 'Beginner'
    }
  ];

  // Helper function to get proper icon for activity type
  const getActivityIcon = (type) => {
    switch(type) {
      case 'cardio':
        return faRunning;
      case 'strength':
        return faDumbbell;
      case 'yoga':
        return faYinYang;
      default:
        return faRunning;
    }
  };

  // Helper function to get proper color for activity type
  const getActivityColor = (type) => {
    switch(type) {
      case 'cardio':
        return 'cardio-bg';
      case 'strength':
        return 'strength-bg';
      case 'yoga':
        return 'yoga-bg';
      default:
        return 'cardio-bg';
    }
  };

  return (
    <Container fluid className="dashboard-container">
      {/* Header */}
      <Row className="dashboard-header">
        <Col>
          <h1>Hello, Wingman! 👋</h1>
          <p className="text-muted">Welcome and Let&apos;s do some workout today!</p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <div className="search-container">
            <input type="text" placeholder="Search anything" className="search-input" />
            <span className="search-icon">🔍</span>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="stats-cards">
        <Col md={4} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon">
                <FontAwesomeIcon icon={faFire} />
              </div>
              <div className="stat-data">
                <div className="stat-value">520<span className="stat-unit">kcal</span></div>
                <div className="stat-label">Remaining · 480 kcal</div>
              </div>
              <div className="stat-gauge">
                <div className="stat-gauge-inner" style={{ width: '60%' }}></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
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
        </Col>
        <Col md={4} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon">
                <FontAwesomeIcon icon={faPersonWalking} />
              </div>
              <div className="stat-data">
                <div className="stat-value">1,050<span className="stat-unit">steps</span></div>
                <div className="stat-label">Yesterday · 898 steps</div>
              </div>
              <div className="stat-chart">
                <Line data={stepsData} options={lineChartOptions} height={50} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Progress and Activity */}
        <Col lg={8} className="mb-4">
          <Row>
            {/* Progress */}
            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title">Progress</h5>
                    <div className="dropdown">
                      <Button variant="light" className="time-filter-btn">
                        This Week <FontAwesomeIcon icon={faChevronRight} size="xs" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <h2 className="mb-0">75%</h2>
                    <p className="text-muted">Goal Completion</p>
                  </div>
                  <div className="progress-chart">
                    <div className="goal-progress-circle">
                      <div className="inner-circle">
                        <div className="progress-indicator" style={{ transform: 'rotate(270deg)' }}>
                          <div className="progress-circle-track"></div>
                          <div className="progress-circle-fill" style={{ transform: 'rotate(270deg)' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="training-stats">
                    <div className="training-stat">
                      <div className="d-flex align-items-center">
                        <span className="training-dot cardio-dot"></span>
                        <div className="training-name">Cardio Training</div>
                        <div className="training-percent">85%</div>
                      </div>
                      <div className="training-details">5/6 sets of HIIT session</div>
                    </div>

                    <div className="training-stat">
                      <div className="d-flex align-items-center">
                        <span className="training-dot strength-dot"></span>
                        <div className="training-name">Strength Training</div>
                        <div className="training-percent">75%</div>
                      </div>
                      <div className="training-details">4/5 sets of full-body strength circuit</div>
                    </div>

                    <div className="training-stat">
                      <div className="d-flex align-items-center">
                        <span className="training-dot yoga-dot"></span>
                        <div className="training-name">Flexibility Training</div>
                        <div className="training-percent">65%</div>
                      </div>
                      <div className="training-details">3/4 sets of yoga sessions</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Activity */}
            <Col md={6} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title">Activity</h5>
                    <div className="date-label">Friday</div>
                  </div>

                  <div className="daily-stats">
                    <div className="daily-stat">
                      <div className="daily-stat-label">Progress</div>
                      <div className="daily-stat-value">82%</div>
                    </div>
                    <div className="daily-stat">
                      <div className="daily-stat-label">Calories</div>
                      <div className="daily-stat-value">150 kcal</div>
                    </div>
                  </div>

                  <div className="activity-chart">
                    <Bar data={activityData} options={barChartOptions} height={180} />
                  </div>

                  <div className="date-selector">
                    <div className="d-flex align-items-center">
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
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Today's Activity */}
          <Row>
            <Col md={12} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title">Today&apos;s Activity</h5>
                    <Button variant="light" className="activity-type-btn">
                      <FontAwesomeIcon icon={faRunning} className="me-2" />
                      Running <FontAwesomeIcon icon={faChevronRight} size="xs" />
                    </Button>
                  </div>

                  <div className="activity-details">
                    <div className="map-container">
                      <img src="/api/placeholder/400/320" alt="Running Map" className="activity-map" />
                    </div>

                    <div className="activity-info">
                      <div className="activity-time">
                        <FontAwesomeIcon icon={faClock} className="me-2" />
                        6:30 AM - 7:20 AM
                      </div>
                      <h4 className="activity-title">Park Loop Trail</h4>

                      <div className="activity-stats">
                        <div className="activity-stat">
                          <div className="activity-stat-label">Distance</div>
                          <div className="activity-stat-value">5 miles (8 km)</div>
                        </div>
                        <div className="activity-stat">
                          <div className="activity-stat-label">Total Time</div>
                          <div className="activity-stat-value">50 minutes</div>
                        </div>
                        <div className="activity-stat">
                          <div className="activity-stat-label">Total Steps</div>
                          <div className="activity-stat-value">10,500 steps</div>
                        </div>
                        <div className="activity-stat">
                          <div className="activity-stat-label">Total Calories</div>
                          <div className="activity-stat-value">450 Cal</div>
                        </div>
                        <div className="activity-stat">
                          <div className="activity-stat-label">Average Pace</div>
                          <div className="activity-stat-value">10 minutes/mile</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* My Classes */}
          <Row>
            <Col md={12} className="mb-4">
              <Card className="dashboard-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title">My Classes</h5>
                    <Link to="/classes" className="see-all-link">See All</Link>
                  </div>

                  <div className="class-list">
                    {myClasses.map((classItem, index) => (
                      <div className="class-item" key={index}>
                        <div className="class-icon-container">
                          <div className={`class-icon ${getActivityColor(classItem.type)}`}>
                            <FontAwesomeIcon icon={getActivityIcon(classItem.type)} />
                          </div>
                        </div>

                        <div className="class-info">
                          <div className="class-type">{classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)}</div>
                          <div className="class-title">{classItem.title}</div>
                          <div className="class-instructor">
                            <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
                            {classItem.instructor}
                          </div>
                        </div>

                        <div className="class-details">
                          <div className="class-videos">
                            <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
                            {classItem.videos} videos
                          </div>
                          <div className="class-duration">{classItem.duration}</div>
                        </div>

                        <div className="class-level">
                          <span className={`level-badge ${classItem.level.toLowerCase()}`}>
                            {classItem.level}
                          </span>
                        </div>

                        <div className="class-actions">
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Profile and Schedule */}
        <Col lg={4} className="mb-4">
          {/* Profile Card */}
          <Card className="dashboard-card mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">My Profile</h5>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>

              <div className="profile-container">
                <div className="profile-image-container">
                  <img src="/api/placeholder/100/100" alt="Profile" className="profile-image" />
                </div>
                <div className="profile-info">
                  <h4 className="profile-name">Kalendra Wingman</h4>
                  <div className="profile-level">
                    <span className="level-label">Advanced</span>
                    <span className="profile-points">14,750</span>
                  </div>
                </div>
              </div>

              <div className="profile-stats">
                <div className="profile-stat">
                  <div className="stat-label">Weight</div>
                  <div className="stat-value">75 kg</div>
                </div>
                <div className="profile-stat">
                  <div className="stat-label">Height</div>
                  <div className="stat-value">175 cm</div>
                </div>
                <div className="profile-stat">
                  <div className="stat-label">Age</div>
                  <div className="stat-value">29 yrs</div>
                </div>
              </div>

              {/* Calendar */}
              <div className="calendar-container">
                <div className="calendar-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>{currentMonth}</h5>
                    <div className="calendar-controls">
                      <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                </div>
                <div className="calendar-grid">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`calendar-day ${day.month === 'prev' || day.month === 'next' ? 'other-month' : ''}
                        ${day.date === selectedDate ? 'selected' : ''}
                        ${day.today ? 'today' : ''}`}
                    >
                      <div className="day-label">{day.day}</div>
                      <div className="date-number">{day.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Schedule Card */}
          <Card className="dashboard-card mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">My Schedule</h5>
                <Button variant="light" className="add-schedule-btn">
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>

              <div className="schedule-date">
                Thursday, 13 Aug 28
              </div>

              <div className="schedule-activities">
                {scheduledActivities.map((activity, index) => (
                  <div className="schedule-activity" key={index}>
                    {activity.completed && (
                      <div className="completed-indicator">
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </div>
                    )}

                    <div className={`activity-icon-container ${getActivityColor(activity.type)}`}>
                      <FontAwesomeIcon icon={getActivityIcon(activity.type)} />
                    </div>

                    <div className="activity-content">
                      <div className="activity-time">{activity.time}</div>
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-description">{activity.description}</div>
                    </div>

                    <div className="activity-actions">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Recent Activity Card */}
          <Card className="dashboard-card mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">Recent Activity</h5>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>

              <div className="recent-activities">
                {recentActivities.map((activity, index) => (
                  <div className="recent-activity" key={index}>
                    <div className={`activity-icon-container ${getActivityColor(activity.type)}`}>
                      <FontAwesomeIcon icon={getActivityIcon(activity.type)} />
                    </div>

                    <div className="activity-content">
                      <div className="activity-time">{activity.time}</div>
                      <div className="activity-title">{activity.title}</div>
                      {activity.description && (
                        <div className="activity-description">{activity.description}</div>
                      )}
                      {activity.details && (
                        <div className="activity-details">{activity.details}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;