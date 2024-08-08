import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  
  server: {
    host: 'https://muffun-test.vercel.app',
    port: 2930,
    proxy: {
      '/places': {
        target: 'https://muffun-test.vercel.app:3000/places',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/places/, ''),
      },
      // Proxy all Next.js assets
      '/_next': {
        target: 'https://muffun-test.vercel.app:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/_next/, '/_next'),
      },
      // Proxy API requests (if needed)
      '/api': {
        target: 'https://muffun-test.vercel.app/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
