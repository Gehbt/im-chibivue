import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      chibivue: `${process.cwd()}/../../packages`,
    },
  },
  server: {
    cors: true,
    port: 12322,
  },
})
