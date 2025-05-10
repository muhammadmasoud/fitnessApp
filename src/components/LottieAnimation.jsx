import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import fitnessAnimation from '../assets/animations/fitness-animation.json';
import workoutAnimation from '../assets/animations/workout-animation.json';
import loadingAnimation from '../assets/animations/loading-animation.json';

// Animation types for easy reference
export const ANIMATIONS = {
  FITNESS: 'fitness',
  WORKOUT: 'workout',
  LOADING: 'loading',
  FIRE: 'fire'
};

/**
 * LottieAnimation component for displaying Lottie animations
 *
 * @param {Object} props - Component props
 * @param {string} props.animationType - Type of animation to display (from ANIMATIONS object)
 * @param {number} props.width - Width of the animation (default: 200)
 * @param {number} props.height - Height of the animation (default: 200)
 * @param {boolean} props.loop - Whether the animation should loop (default: true)
 * @param {boolean} props.autoplay - Whether the animation should autoplay (default: true)
 * @param {Object} props.style - Additional styles to apply to the animation container
 * @param {Function} props.onComplete - Callback function when animation completes
 */
const LottieAnimation = ({
  animationType = ANIMATIONS.FITNESS,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  style = {},
  onComplete,
  ...props
}) => {
  const lottieRef = useRef(null);

  // Select the animation data based on the animationType
  const getAnimationData = () => {
    switch (animationType) {
      case ANIMATIONS.FITNESS:
        return fitnessAnimation;
      case ANIMATIONS.WORKOUT:
        return workoutAnimation;
      case ANIMATIONS.LOADING:
        return loadingAnimation;
      default:
        return fitnessAnimation;
    }
  };

  return (
    <div style={{ width, height, ...style }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={getAnimationData()}
        loop={loop}
        autoplay={autoplay}
        onComplete={onComplete}
        {...props}
      />
    </div>
  );
};

export default LottieAnimation;
