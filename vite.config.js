import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves the site from /<repo-name>/; the deploy workflow sets BASE_PATH.
  // Other hosts (and local dev) serve from the root.
  base: process.env.BASE_PATH || '/',
  server: { port: 5180 },
})
