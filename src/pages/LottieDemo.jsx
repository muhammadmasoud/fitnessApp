import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { useLottie } from 'lottie-react';
import './LottieDemo.css';

// Import all animation files dynamically using Vite's import.meta.glob
// This will automatically include any JSON files in the animations folder
const animationModules = import.meta.glob('../assets/animations/*.json', { eager: true });
const animationFiles = Object.entries(animationModules).map(([path, module]) => {
  // Get the filename without extension
  const filename = path.split('/').pop().replace('.json', '');
  return {
    name: filename,
    data: module.default || module
  };
});

const LottieDemo = () => {
  const [selectedAnimation, setSelectedAnimation] = useState(animationFiles[0]?.name || '');
  const [animationData, setAnimationData] = useState(animationFiles[0]?.data || null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [loop, setLoop] = useState(true);

  // Update animation data when selected animation changes
  useEffect(() => {
    const selected = animationFiles.find(anim => anim.name === selectedAnimation);
    if (selected) {
      setAnimationData(selected.data);
    }
  }, [selectedAnimation]);

  // Hook approach options
  const options = {
    animationData,
    loop,
    autoplay: isPlaying,
  };

  const { View, play, setSpeed, pause } = useLottie(options);

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  // Toggle loop
  const toggleLoop = () => {
    setLoop(!loop);
  };

  // Change animation speed
  const changeSpeed = (newSpeed) => {
    setSpeed(newSpeed);
    setCurrentSpeed(newSpeed);
  };

  // Handle animation selection
  const handleAnimationSelect = (name) => {
    setSelectedAnimation(name);
  };

  return (
    <div className="animation-gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <h1 className="gallery-title">Animation Gallery</h1>
          <p className="gallery-description">
            This gallery automatically displays all JSON animation files from the assets/animations folder.
            Add new animation files to that folder and they will appear here automatically.
          </p>
        </div>

        {/* Animation selection */}
        <div className="animation-selection">
          <h2 className="selection-title">Available Animations</h2>
          <div className="animation-buttons">
            {animationFiles.map(anim => (
              <button
                key={anim.name}
                className={`animation-button ${selectedAnimation === anim.name ? 'active' : ''}`}
                onClick={() => handleAnimationSelect(anim.name)}
              >
                {anim.name}
              </button>
            ))}
            {animationFiles.length === 0 && (
              <p>No animations found. Add JSON files to the animations folder.</p>
            )}
          </div>
        </div>

        {/* Animation display */}
        <div className="animation-display">
          <h2 className="display-title">
            {selectedAnimation || 'No animation selected'}
          </h2>

          {animationData ? (
            <div className="animation-container">
              <div className="animation-wrapper">
                {View}
              </div>
            </div>
          ) : (
            <div className="no-animation">
              No animation selected or animation could not be loaded
            </div>
          )}

          {/* Animation controls */}
          <div className="animation-controls">
            <button
              className="control-button play-pause"
              onClick={togglePlay}
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              className={`control-button loop ${loop ? 'active' : ''}`}
              onClick={toggleLoop}
            >
              <i className="fas fa-sync-alt"></i>
              Loop: {loop ? 'On' : 'Off'}
            </button>
            <button
              className={`control-button speed ${currentSpeed === 0.5 ? 'active' : ''}`}
              onClick={() => changeSpeed(0.5)}
            >
              <i className="fas fa-tachometer-alt"></i>
              0.5x
            </button>
            <button
              className={`control-button speed ${currentSpeed === 1 ? 'active' : ''}`}
              onClick={() => changeSpeed(1)}
            >
              <i className="fas fa-tachometer-alt"></i>
              1x
            </button>
            <button
              className={`control-button speed ${currentSpeed === 2 ? 'active' : ''}`}
              onClick={() => changeSpeed(2)}
            >
              <i className="fas fa-tachometer-alt"></i>
              2x
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="usage-instructions">
          <h2 className="instructions-title">How to Add New Animations</h2>
          <ol className="instructions-list">
            <li>Download Lottie JSON files from sites like <a href="https://lottiefiles.com/" target="_blank" rel="noopener noreferrer">LottieFiles</a></li>
            <li>Save the JSON file to the <code>src/assets/animations</code> folder</li>
            <li>The animation will automatically appear on this page</li>
            <li>You can then use it in your components with the Lottie component</li>
          </ol>

          <h3 className="code-title">Example Code</h3>
          <pre className="code-example">
{`import Lottie from 'lottie-react';
import animationData from '../assets/animations/${selectedAnimation || 'your-animation'}.json';

const MyComponent = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: 300, height: 300 }}
    />
  );
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LottieDemo;
