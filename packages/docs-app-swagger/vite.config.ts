import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  // Make all URLs relative
  base: "",
  plugins: [react()],
});
