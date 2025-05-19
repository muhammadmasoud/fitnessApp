import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '../src');

// Function to recursively find all CSS files
function findCssFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findCssFiles(filePath, fileList);
    } else if (file.endsWith('.css')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Find all CSS files
const cssFiles = findCssFiles(SRC_DIR);
console.log(`Found ${cssFiles.length} CSS files to optimize`);

// Process each CSS file
let totalOptimizations = 0;

cssFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let fileOptimizations = 0;
  
  // 1. Replace expensive animations with more performant ones
  const animationRegex = /animation\s*:\s*([^;]+)/g;
  content = content.replace(animationRegex, (match, animationValue) => {
    // Check if it's a complex animation
    if (animationValue.includes('infinite') || animationValue.includes('alternate')) {
      fileOptimizations++;
      // Add will-change property to optimize rendering
      return `will-change: transform; ${match}`;
    }
    return match;
  });
  
  // 2. Add will-change property to elements with transitions
  const transitionRegex = /transition\s*:\s*([^;]+)/g;
  content = content.replace(transitionRegex, (match) => {
    fileOptimizations++;
    // Add will-change property to optimize rendering
    return `will-change: transform; ${match}`;
  });
  
  // 3. Optimize box-shadows
  const boxShadowRegex = /box-shadow\s*:\s*([^;]+)/g;
  content = content.replace(boxShadowRegex, (match, shadowValue) => {
    // Check if it's a complex shadow
    if ((shadowValue.match(/,/g) || []).length > 1) {
      fileOptimizations++;
      // Simplify complex shadows
      return 'box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2)';
    }
    return match;
  });
  
  // 4. Replace fixed backgrounds with scroll for better performance
  const backgroundAttachmentRegex = /background-attachment\s*:\s*fixed/g;
  content = content.replace(backgroundAttachmentRegex, () => {
    fileOptimizations++;
    return 'background-attachment: scroll';
  });
  
  // 5. Add transform: translateZ(0) to elements with animations or transitions
  const animatedElementRegex = /(\.[\w-]+)\s*{[^}]*(animation|transition)[^}]*}/g;
  content = content.replace(animatedElementRegex, (match, selector, property) => {
    if (!match.includes('transform: translateZ(0)')) {
      fileOptimizations++;
      return match.replace('{', '{ transform: translateZ(0);');
    }
    return match;
  });
  
  // Only write the file if changes were made
  if (fileOptimizations > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Applied ${fileOptimizations} optimizations to ${path.relative(__dirname, filePath)}`);
    totalOptimizations += fileOptimizations;
  }
});

console.log(`\nTotal optimizations: ${totalOptimizations}`);
console.log('CSS performance optimizations completed successfully!');

// Now optimize JavaScript files for performance
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJsFiles(filePath, fileList);
    } else if (
      (file.endsWith('.js') || file.endsWith('.jsx')) && 
      !file.includes('.config.') &&
      !file.includes('vite-env.d.ts')
    ) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Find all JS files
const jsFiles = findJsFiles(SRC_DIR);
console.log(`\nFound ${jsFiles.length} JS files to check for performance issues`);

// Process each JS file
let totalJsOptimizations = 0;

jsFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let fileOptimizations = 0;
  
  // Check for missing React.memo
  if (
    content.includes('export default') && 
    !content.includes('memo') && 
    content.includes('return (') &&
    content.includes('import React') &&
    !content.includes('class ') // Skip class components
  ) {
    console.log(`⚠️ Component in ${path.relative(__dirname, filePath)} might benefit from React.memo`);
    fileOptimizations++;
  }
  
  // Check for missing useMemo/useCallback
  if (
    content.includes('useState') && 
    content.includes('useEffect') &&
    !content.includes('useMemo') &&
    !content.includes('useCallback') &&
    (content.includes('map(') || content.includes('filter(') || content.includes('reduce('))
  ) {
    console.log(`⚠️ Component in ${path.relative(__dirname, filePath)} might benefit from useMemo/useCallback for array operations`);
    fileOptimizations++;
  }
  
  totalJsOptimizations += fileOptimizations;
});

console.log(`\nFound ${totalJsOptimizations} potential JS optimizations`);
console.log('Performance optimization check completed!');
