# Lottie Animations

This folder contains Lottie animation files in JSON format that can be used throughout the FITNESS application.

## How to Use Animations

1. **Add new animations:**
   - Download Lottie JSON files from sites like [LottieFiles](https://lottiefiles.com/)
   - Save the JSON file to this folder (`src/assets/animations/`)
   - The animation will automatically appear in the Animation Gallery

2. **View animations:**
   - Go to the Animation Gallery page at `/lottie-demo` or click the "Animation Gallery" link in the footer
   - All animations in this folder will be displayed automatically

3. **Use animations in your components:**

   ```jsx
   // Option 1: Direct import
   import Lottie from 'lottie-react';
   import animationData from '../assets/animations/your-animation.json';

   const MyComponent = () => {
     return (
       <Lottie
         animationData={animationData}
         loop={true}
         autoplay={true}
         style={{ width: 300, height: 300 }}
       />
     );
   };
   ```

   ```jsx
   // Option 2: Using utility function
   import Lottie from 'lottie-react';
   import { getAnimationByName } from '../utils/animationUtils';

   const MyComponent = () => {
     const animationData = getAnimationByName('your-animation');

     return (
       <div style={{ width: 300, height: 300 }}>
         {animationData && (
           <Lottie
             animationData={animationData}
             loop={true}
             autoplay={true}
           />
         )}
       </div>
     );
   };
   ```

4. **Use the LoadingAnimation component:**

   ```jsx
   import LoadingAnimation from '../components/LoadingAnimation';

   const MyComponent = () => {
     const [loading, setLoading] = useState(true);

     // Simulate loading data
     useEffect(() => {
       const timer = setTimeout(() => setLoading(false), 2000);
       return () => clearTimeout(timer);
     }, []);

     if (loading) {
       return <LoadingAnimation width={200} height={200} text="Loading data..." />;
     }

     return <div>Your content here</div>;
   };
   ```

5. **Use the WorkoutAnimation component:**

   ```jsx
   import WorkoutAnimation from '../components/WorkoutAnimation';

   const MyComponent = () => {
     return (
       <div className="workout-complete">
         <h2>Workout Complete!</h2>
         <WorkoutAnimation
           width={300}
           height={300}
           onComplete={() => console.log('Animation finished')}
         />
       </div>
     );
   };
   ```

## Finding Animations

You can find Lottie animations at:

1. [LottieFiles](https://lottiefiles.com/) - The largest platform for Lottie animations
2. [IconScout](https://iconscout.com/lotties) - Many free and premium Lottie animations
3. [Icons8](https://icons8.com/animated-icons) - Animated icons in Lottie format

## Creating Your Own Animations

You can create your own animations using Adobe After Effects and export them as Lottie JSON files using the Bodymovin plugin.

## Current Animations

- `fitness-animation.json` - A fitness-themed animation
- `workout-animation.json` - A workout-themed animation
- `loading-animation.json` - A loading spinner animation
- `fire.json` - A fire animation used in the announcement bar

Add more animations to this folder and they will automatically appear in the Animation Gallery!
