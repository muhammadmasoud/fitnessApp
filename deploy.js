// Simple deployment script to help with Vercel deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure build directory exists
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  console.error('Build directory does not exist. Run npm run build first.');
  process.exit(1);
}

// Files to copy from public to build
const filesToCopy = [
  '_redirects',
  '404.html',
  'favicon.ico',
  'logo192.png',
  'logo512.png',
  'manifest.json'
];

// Copy each file
filesToCopy.forEach(file => {
  const source = path.join(__dirname, 'public', file);
  const target = path.join(buildDir, file);

  try {
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, target);
      console.log(`Successfully copied ${file} to build directory`);
    } else {
      console.warn(`Warning: ${file} does not exist in public directory`);
    }
  } catch (err) {
    console.error(`Error copying ${file}:`, err);
  }
});

console.log('Deployment preparation complete. You can now deploy the build directory to Vercel.');
