import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    plugins: [
      react(),
      eslint({
        include: ['src/**/*.js', 'src/**/*.jsx'],
        cache: false,
        failOnError: false,
        failOnWarning: false,
        lintOnStart: true,
        emitWarning: true,
        emitError: true,
        eslintPath: 'eslint',
      }),
    ],
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
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['react-bootstrap', 'bootstrap'],
          },
        },
      },
    },
    // Handle environment variables similar to CRA
    define: {
      // Only include specific environment variables
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || mode),
      'process.env.VITE_APP_TITLE': JSON.stringify(env.VITE_APP_TITLE),
    },
  };
});
