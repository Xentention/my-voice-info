import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/my-voice-info/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        en: resolve(__dirname, 'index.html'),
        ru: resolve(__dirname, 'ru/index.html'),
      },
    },
  },
});
