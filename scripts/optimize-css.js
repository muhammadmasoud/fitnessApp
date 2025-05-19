import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '../src');

console.log('Analyzing CSS performance...');

// Find all CSS files
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

const cssFiles = findCssFiles(SRC_DIR);
console.log(`Found ${cssFiles.length} CSS files to analyze`);

// Performance issues to check for
const issues = {
  complexSelectors: 0,
  deepNesting: 0,
  universalSelectors: 0,
  boxShadows: 0,
  gradients: 0,
  filters: 0,
  animations: 0,
  transforms: 0,
  fixedPositioning: 0,
  largeFiles: 0
};

// Analyze each file
cssFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  
  // Check file size
  const fileSize = fs.statSync(filePath).size / 1024; // Size in KB
  if (fileSize > 30) {
    console.log(`⚠️ Large CSS file: ${fileName} (${fileSize.toFixed(2)} KB)`);
    issues.largeFiles++;
  }
  
  // Check for complex selectors
  const complexSelectorMatches = content.match(/[.#][\w-]+(?:\s+[.#][\w-]+){3,}/g);
  if (complexSelectorMatches && complexSelectorMatches.length > 0) {
    console.log(`⚠️ Complex selectors in ${fileName}: ${complexSelectorMatches.length} occurrences`);
    issues.complexSelectors += complexSelectorMatches.length;
  }
  
  // Check for deep nesting
  const deepNestingMatches = content.match(/[{][^{}]*[{][^{}]*[{][^{}]*[{]/g);
  if (deepNestingMatches && deepNestingMatches.length > 0) {
    console.log(`⚠️ Deep nesting in ${fileName}: ${deepNestingMatches.length} occurrences`);
    issues.deepNesting += deepNestingMatches.length;
  }
  
  // Check for universal selectors
  const universalSelectorMatches = content.match(/\*\s*[{,]/g);
  if (universalSelectorMatches && universalSelectorMatches.length > 0) {
    console.log(`⚠️ Universal selectors in ${fileName}: ${universalSelectorMatches.length} occurrences`);
    issues.universalSelectors += universalSelectorMatches.length;
  }
  
  // Check for complex box shadows
  const boxShadowMatches = content.match(/box-shadow\s*:\s*[^;]*,\s*[^;]*/g);
  if (boxShadowMatches && boxShadowMatches.length > 0) {
    console.log(`⚠️ Complex box shadows in ${fileName}: ${boxShadowMatches.length} occurrences`);
    issues.boxShadows += boxShadowMatches.length;
  }
  
  // Check for gradients
  const gradientMatches = content.match(/gradient\(/g);
  if (gradientMatches && gradientMatches.length > 0) {
    console.log(`⚠️ Gradients in ${fileName}: ${gradientMatches.length} occurrences`);
    issues.gradients += gradientMatches.length;
  }
  
  // Check for filters
  const filterMatches = content.match(/filter\s*:\s*[^;]*/g);
  if (filterMatches && filterMatches.length > 0) {
    console.log(`⚠️ Filters in ${fileName}: ${filterMatches.length} occurrences`);
    issues.filters += filterMatches.length;
  }
  
  // Check for animations
  const animationMatches = content.match(/@keyframes\s+[\w-]+/g);
  if (animationMatches && animationMatches.length > 0) {
    console.log(`⚠️ Animations in ${fileName}: ${animationMatches.length} occurrences`);
    issues.animations += animationMatches.length;
  }
  
  // Check for transforms
  const transformMatches = content.match(/transform\s*:\s*[^;]*/g);
  if (transformMatches && transformMatches.length > 0) {
    console.log(`⚠️ Transforms in ${fileName}: ${transformMatches.length} occurrences`);
    issues.transforms += transformMatches.length;
  }
  
  // Check for fixed positioning
  const fixedPositionMatches = content.match(/position\s*:\s*fixed/g);
  if (fixedPositionMatches && fixedPositionMatches.length > 0) {
    console.log(`⚠️ Fixed positioning in ${fileName}: ${fixedPositionMatches.length} occurrences`);
    issues.fixedPositioning += fixedPositionMatches.length;
  }
  
  // Optimize the CSS file
  let optimizedContent = content;
  
  // Add will-change property to elements with animations
  optimizedContent = optimizedContent.replace(
    /([\w-]+\s*{[^}]*)(animation\s*:[^;]*;)/g,
    '$1will-change: transform; $2'
  );
  
  // Add will-change property to elements with transforms
  optimizedContent = optimizedContent.replace(
    /([\w-]+\s*{[^}]*)(transform\s*:[^;]*;)/g,
    '$1will-change: transform; $2'
  );
  
  // Simplify complex box shadows
  optimizedContent = optimizedContent.replace(
    /box-shadow\s*:\s*[^;]*,\s*[^;]*/g,
    'box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2)'
  );
  
  // Replace fixed backgrounds with scroll for better performance
  optimizedContent = optimizedContent.replace(
    /background-attachment\s*:\s*fixed/g,
    'background-attachment: scroll'
  );
  
  // Write the optimized content back to the file
  if (optimizedContent !== content) {
    fs.writeFileSync(filePath, optimizedContent, 'utf8');
    console.log(`✅ Optimized ${fileName}`);
  }
});

// Print summary
console.log('\nCSS Performance Analysis Summary:');
console.log('-------------------------------');
console.log(`Complex selectors: ${issues.complexSelectors}`);
console.log(`Deep nesting: ${issues.deepNesting}`);
console.log(`Universal selectors: ${issues.universalSelectors}`);
console.log(`Complex box shadows: ${issues.boxShadows}`);
console.log(`Gradients: ${issues.gradients}`);
console.log(`Filters: ${issues.filters}`);
console.log(`Animations: ${issues.animations}`);
console.log(`Transforms: ${issues.transforms}`);
console.log(`Fixed positioning: ${issues.fixedPositioning}`);
console.log(`Large files: ${issues.largeFiles}`);

const totalIssues = Object.values(issues).reduce((sum, count) => sum + count, 0);
console.log(`\nTotal issues found: ${totalIssues}`);

if (totalIssues > 0) {
  console.log('\nRecommendations:');
  console.log('---------------');
  console.log('1. Simplify complex selectors to improve CSS parsing performance');
  console.log('2. Reduce nesting depth to improve CSS specificity and performance');
  console.log('3. Avoid universal selectors (*) as they are performance intensive');
  console.log('4. Simplify box shadows to reduce rendering complexity');
  console.log('5. Use hardware acceleration for animations and transforms with will-change');
  console.log('6. Consider replacing gradients with solid colors for better performance');
  console.log('7. Use filters sparingly as they can be performance intensive');
  console.log('8. Split large CSS files into smaller, more focused files');
}

console.log('\nCSS performance analysis and optimization completed!');
