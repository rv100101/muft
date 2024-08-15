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
    host: '127.0.0.1',
    port: 2930,
    proxy: {
      // Change the proxy rule for /places
      '/places': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/places/, '/places'),
      },
    // '/member': {
    //     target: 'http://127.0.0.1:3000/member',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/member/, ''),
    //   },
      // Keep the Next.js assets proxy
      '/_next': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/_next/, '/_next'),
      },
      // Proxy API requests
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});