// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/address-form-and-validation/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})