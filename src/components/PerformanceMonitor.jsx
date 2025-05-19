// PerformanceMonitor.jsx
import { useState, useEffect, memo } from 'react';
import './PerformanceMonitor.css';

/**
 * Component to monitor and display performance metrics
 * Only visible in development mode
 */
const PerformanceMonitor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    cpu: 0,
    loadTime: 0,
    renderCount: 0
  });

  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  // Calculate FPS
  useEffect(() => {
    if (!isVisible) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let rafId;

    const countFrames = (time) => {
      frameCount++;

      // Update FPS every second
      if (time - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: frameCount
        }));

        frameCount = 0;
        lastTime = time;
      }

      rafId = requestAnimationFrame(countFrames);
    };

    rafId = requestAnimationFrame(countFrames);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  // Monitor memory usage
  useEffect(() => {
    if (!isVisible) return;

    const memoryInterval = setInterval(() => {
      // Check if performance.memory is available (Chrome only)
      if (window.performance && window.performance.memory) {
        const usedMemory = Math.round(window.performance.memory.usedJSHeapSize / (1024 * 1024));
        setMetrics(prev => ({
          ...prev,
          memory: usedMemory
        }));
      }
    }, 1000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, [isVisible]);

  // Calculate page load time
  useEffect(() => {
    if (!isVisible) return;

    // Use modern Performance API to get page load time
    if (window.performance) {
      // Get navigation timing entries
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries && navEntries.length > 0) {
        // Use the first navigation entry
        const navEntry = navEntries[0];
        const loadTime = Math.round(navEntry.loadEventEnd - navEntry.startTime);
        setMetrics(prev => ({
          ...prev,
          loadTime: loadTime
        }));
      } else {
        // Fallback for browsers that don't support getEntriesByType
        const loadTime = Math.round(performance.now());
        setMetrics(prev => ({
          ...prev,
          loadTime: loadTime
        }));
      }
    }
  }, [isVisible]);

  // Increment render count on each render
  useEffect(() => {
    if (isVisible) {
      setMetrics(prev => ({
        ...prev,
        renderCount: prev.renderCount + 1
      }));
    }
  }, [isVisible, metrics.fps, metrics.memory]);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <button
        className="performance-monitor-toggle"
        onClick={toggleVisibility}
      >
        {isVisible ? 'Hide Metrics' : 'Show Metrics'}
      </button>

      {isVisible && (
        <div className="performance-monitor">
          <h3>Performance Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-label">FPS</span>
              <span className="metric-value">{metrics.fps}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Memory</span>
              <span className="metric-value">{metrics.memory} MB</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Load Time</span>
              <span className="metric-value">{metrics.loadTime} ms</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Renders</span>
              <span className="metric-value">{metrics.renderCount}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(PerformanceMonitor);
