/**
 * Utility functions for working with Lottie animations
 */

/**
 * Get all available animation files from the animations folder
 * @returns {Array} Array of animation objects with name and data properties
 */
export const getAnimations = () => {
  try {
    // Import all animation files dynamically using Vite's import.meta.glob
    const animationModules = import.meta.glob('../assets/animations/*.json', { eager: true });

    return Object.entries(animationModules).map(([path, module]) => {
      // Get the filename without extension
      const filename = path.split('/').pop().replace('.json', '');
      return {
        name: filename,
        data: module.default || module
      };
    });
  } catch (error) {
    console.error('Error loading animations:', error);
    return [];
  }
};

// Import all animations eagerly
const animations = import.meta.glob('../assets/animations/*.json', { eager: true });

/**
 * Get a specific animation by name
 * @param {string} name - The name of the animation file without extension
 * @returns {Object|null} The animation data or null if not found
 */
export const getAnimationByName = (name) => {
  try {
    // Find the animation in the pre-loaded animations
    const animationPath = Object.keys(animations).find(path =>
      path.includes(`/${name}.json`)
    );

    if (!animationPath) {
      throw new Error(`Animation "${name}" not found`);
    }

    return animations[animationPath].default || animations[animationPath];
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
