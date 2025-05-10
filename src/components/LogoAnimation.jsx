
import Lottie from 'lottie-react';
import { getAnimationByName } from '../utils/animationUtils';

/**
 * LogoAnimation component that displays the logo.json Lottie animation
 * @param {Object} props - Component props
 * @param {number} props.width - Width of the animation container
 * @param {number} props.height - Height of the animation container
 * @param {boolean} props.loop - Whether the animation should loop
 * @param {boolean} props.autoplay - Whether the animation should autoplay
 * @param {Object} props.style - Additional styles to apply to the container
 * @returns {JSX.Element} - The rendered component
 */
const LogoAnimation = ({
  width = 150,
  height = 150,
  loop = true,
  autoplay = true,
  style = {}
}) => {
  const animationData = getAnimationByName('logo');

  return (
    <div className="logo-animation-container" style={{ width, height, ...style }}>
      {animationData && (
        <Lottie
          animationData={animationData}
          loop={loop}
          autoplay={autoplay}
          className="logo-animation"
        />
      )}
    </div>
  );
};

export default LogoAnimation;
