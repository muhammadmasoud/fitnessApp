import React, { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import workoutAnimation from '../assets/animations/workout-animation.json';

/**
 * WorkoutAnimation component for displaying workout-related animations
 * 
 * @param {Object} props - Component props
 * @param {number} props.width - Width of the animation (default: 300)
 * @param {number} props.height - Height of the animation (default: 300)
 * @param {boolean} props.autoplay - Whether the animation should autoplay (default: true)
 * @param {boolean} props.loop - Whether the animation should loop (default: true)
 * @param {Function} props.onComplete - Callback function when animation completes
 * @param {Object} props.style - Additional styles to apply to the container
 */
const WorkoutAnimation = ({
  width = 300,
  height = 300,
  autoplay = true,
  loop = true,
  onComplete,
  style = {},
}) => {
  const lottieRef = useRef(null);

  // Example of controlling the animation with external events
  useEffect(() => {
    // You can access the Lottie instance and control it programmatically
    const lottieInstance = lottieRef.current;
    
    // Example: Pause the animation after 3 seconds if it's not looping
    if (!loop && autoplay) {
      const timer = setTimeout(() => {
        if (lottieInstance) {
          lottieInstance.pause();
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [loop, autoplay]);

  return (
    <div style={{ width, height, ...style }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={workoutAnimation}
        loop={loop}
        autoplay={autoplay}
        onComplete={onComplete}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default WorkoutAnimation;
