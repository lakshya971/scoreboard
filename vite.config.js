import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

  base: '/scoreboard/',

  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    host: true
  },
  optimizeDeps: {
    include: ['lucide-react']
  }
})