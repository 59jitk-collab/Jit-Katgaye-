import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Inject API Key specifically - Vite replaces this string during build
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Define process.env to empty object to prevent "process is not defined" crashes in browser
      'process.env': {} 
    },
    build: {
      outDir: 'dist',
    }
  };
});