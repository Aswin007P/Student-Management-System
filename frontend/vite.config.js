import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// vite.config.js

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
