import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin: serve public/games/*/index.html for directory requests in dev
const serveGameIndexPlugin = {
  name: 'serve-game-index',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url && /^\/games\/[^/]+\/$/.test(req.url)) {
        req.url = req.url + 'index.html'
      }
      next()
    })
  },
}

export default defineConfig({
  plugins: [react(), serveGameIndexPlugin],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
})
