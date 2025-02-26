import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path"
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Allow ngrok URLs
    allowedHosts: ['62a7-193-224-74-5.ngrok-free.app', 'localhost'],
  },
});
