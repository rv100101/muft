import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    host: '127.0.0.1',
    port: 2930,
    proxy: {
         '/places': {
        target: 'http://127.0.0.1:3000/places',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/places/, ''),
      },
 
 
      // Proxy all static assets
      '/_next': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/_next/, '/_next'),
      },
    },
  },
});
