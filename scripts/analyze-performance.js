import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '../src');

console.log('Analyzing application performance...');

// Find all JS/JSX files
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

const jsFiles = findJsFiles(SRC_DIR);
console.log(`Found ${jsFiles.length} JS/JSX files to analyze`);

// Performance issues to check for
const issues = {
  missingMemo: 0,
  missingUseMemo: 0,
  missingUseCallback: 0,
  inlineObjectCreation: 0,
  inlineStyleCreation: 0,
  unnecessaryReRenders: 0,
  largeComponentFiles: 0,
  expensiveOperations: 0
};

// Analyze each file
jsFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  
  // Check file size
  const fileSize = fs.statSync(filePath).size / 1024; // Size in KB
  if (fileSize > 30) {
    console.log(`⚠️ Large component file: ${fileName} (${fileSize.toFixed(2)} KB)`);
    issues.largeComponentFiles++;
  }
  
  // Check for missing React.memo
  if (
    content.includes('export default') && 
    !content.includes('memo') && 
    content.includes('return (') &&
    !content.includes('class ') // Skip class components
  ) {
    console.log(`⚠️ Component in ${fileName} might benefit from React.memo`);
    issues.missingMemo++;
  }
  
  // Check for missing useMemo
  if (
    content.includes('useState') && 
    content.includes('useEffect') &&
    !content.includes('useMemo') &&
    (content.includes('map(') || content.includes('filter(') || content.includes('reduce('))
  ) {
    console.log(`⚠️ Component in ${fileName} might benefit from useMemo for array operations`);
    issues.missingUseMemo++;
  }
  
  // Check for missing useCallback
  if (
    content.includes('useState') && 
    content.includes('useEffect') &&
    !content.includes('useCallback') &&
    (content.includes('function handle') || content.includes('const handle') || content.includes('=> {'))
  ) {
    console.log(`⚠️ Component in ${fileName} might benefit from useCallback for event handlers`);
    issues.missingUseCallback++;
  }
  
  // Check for inline object creation in render
  const inlineObjectMatches = content.match(/return\s*\(\s*[\s\S]*?{\s*[\s\S]*?:\s*[\s\S]*?}/g);
  if (inlineObjectMatches && inlineObjectMatches.length > 0) {
    console.log(`⚠️ Component in ${fileName} creates objects inline in render`);
    issues.inlineObjectCreation++;
  }
  
  // Check for inline style creation
  const inlineStyleMatches = content.match(/style\s*=\s*{\s*{/g);
  if (inlineStyleMatches && inlineStyleMatches.length > 0) {
    console.log(`⚠️ Component in ${fileName} creates styles inline in render`);
    issues.inlineStyleCreation++;
  }
  
  // Check for expensive operations in render
  const expensiveOperations = [
    /\.sort\(/g,
    /\.filter\(/g,
    /\.map\(/g,
    /\.reduce\(/g,
    /\.forEach\(/g,
    /new RegExp/g,
    /Math\.(floor|ceil|round|sqrt|pow)/g
  ];
  
  let hasExpensiveOperation = false;
  expensiveOperations.forEach(regex => {
    if (regex.test(content) && !content.includes('useMemo') && !content.includes('useCallback')) {
      hasExpensiveOperation = true;
    }
  });
  
  if (hasExpensiveOperation) {
    console.log(`⚠️ Component in ${fileName} performs expensive operations in render`);
    issues.expensiveOperations++;
  }
});

// Print summary
console.log('\nPerformance Analysis Summary:');
console.log('----------------------------');
console.log(`Missing React.memo: ${issues.missingMemo}`);
console.log(`Missing useMemo: ${issues.missingUseMemo}`);
console.log(`Missing useCallback: ${issues.missingUseCallback}`);
console.log(`Inline object creation: ${issues.inlineObjectCreation}`);
console.log(`Inline style creation: ${issues.inlineStyleCreation}`);
console.log(`Large component files: ${issues.largeComponentFiles}`);
console.log(`Expensive operations in render: ${issues.expensiveOperations}`);

const totalIssues = Object.values(issues).reduce((sum, count) => sum + count, 0);
console.log(`\nTotal issues found: ${totalIssues}`);

if (totalIssues > 0) {
  console.log('\nRecommendations:');
  console.log('---------------');
  console.log('1. Add React.memo to functional components to prevent unnecessary re-renders');
  console.log('2. Use useMemo for expensive calculations and derived data');
  console.log('3. Use useCallback for event handlers and functions passed to child components');
  console.log('4. Move object and style definitions outside of render functions');
  console.log('5. Split large components into smaller, focused components');
  console.log('6. Move expensive operations out of render with useMemo or useCallback');
}

console.log('\nPerformance analysis completed!');
