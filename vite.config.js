import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000, // Match the default CRA port
      open: true, // Automatically open the browser
    },
    build: {
      outDir: 'build', // Match the default CRA output directory
    },
    // Handle environment variables similar to CRA
    define: {
      // Only include specific environment variables
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || mode),
      'process.env.VITE_APP_TITLE': JSON.stringify(env.VITE_APP_TITLE),
    },
  };
});
