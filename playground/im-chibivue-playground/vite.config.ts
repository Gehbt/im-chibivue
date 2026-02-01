import { defineConfig } from "vite";
import inspect from "vite-plugin-inspect";

export default defineConfig({
  plugins: [inspect()],
  resolve: {},
  server: {
    cors: true,
    port: 12322,
  },
});
