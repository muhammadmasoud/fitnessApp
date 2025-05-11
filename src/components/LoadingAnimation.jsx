
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/loading-animation.json';

/**
 * LoadingAnimation component for displaying a loading animation
 *
 * @param {Object} props - Component props
 * @param {number} props.width - Width of the animation (default: 150)
 * @param {number} props.height - Height of the animation (default: 150)
 * @param {string} props.text - Optional text to display below the animation
 * @param {Object} props.style - Additional styles to apply to the container
 */
const LoadingAnimation = ({
  width = 150,
  height = 150,
  text = 'Loading...',
  style = {},
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      <div style={{ width, height }}>
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
      {text && (
        <p style={{
          marginTop: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#007bff'
        }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingAnimation;
