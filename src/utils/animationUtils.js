/**
 * Utility functions for working with Lottie animations
 */

/**
 * Get all available animation files from the animations folder
 * @returns {Array} Array of animation objects with name and data properties
 */
export const getAnimations = () => {
  try {
    // Import all animation files dynamically
    const animationContext = require.context('../assets/animations', false, /\.json$/);
    
    return animationContext.keys().map(key => {
      // Get the filename without extension
      const filename = key.replace('./', '').replace('.json', '');
      return {
        name: filename,
        data: animationContext(key)
      };
    });
  } catch (error) {
    console.error('Error loading animations:', error);
    return [];
  }
};

/**
 * Get a specific animation by name
 * @param {string} name - The name of the animation file without extension
 * @returns {Object|null} The animation data or null if not found
 */
export const getAnimationByName = (name) => {
  try {
    // Try to import the specific animation
    return require(`../assets/animations/${name}.json`);
  } catch (error) {
    console.error(`Animation "${name}" not found:`, error);
    return null;
  }
};

/**
 * Example of how to use Lottie animations in your components
 * 
 * Import the component:
 * ```jsx
 * import Lottie from 'lottie-react';
 * import { getAnimationByName } from '../utils/animationUtils';
 * 
 * const MyComponent = () => {
 *   const animationData = getAnimationByName('loading-animation');
 *   
 *   return (
 *     <div style={{ width: 200, height: 200 }}>
 *       {animationData && (
 *         <Lottie 
 *           animationData={animationData}
 *           loop={true}
 *           autoplay={true}
 *         />
 *       )}
 *     </div>
 *   );
 * };
 * ```
 */
