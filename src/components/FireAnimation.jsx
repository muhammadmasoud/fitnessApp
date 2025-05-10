import React from 'react';
import Lottie from 'lottie-react';
import { getAnimationByName } from '../utils/animationUtils';
import './FireAnimation.css';

/**
 * FireAnimation component that displays the fire.json Lottie animation
 * @param {Object} props - Component props
 * @param {number} props.width - Width of the animation container
 * @param {number} props.height - Height of the animation container
 * @returns {JSX.Element} - The rendered component
 */
const FireAnimation = ({ width = 40, height = 40 }) => {
  const animationData = getAnimationByName('fire');

  return (
    <div className="fire-animation-container" style={{ width, height }}>
      {animationData && (
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          className="fire-animation"
        />
      )}
    </div>
  );
};

export default FireAnimation;
