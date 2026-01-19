import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/wine-guide/', // For GitHub Pages deployment
  build: {
    outDir: 'dist',
  },
});
