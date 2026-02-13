import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import unoCSS from "unocss/vite";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// @ts-ignore - ignore tsconfig not include
import { defineGlobal } from "./src/define";

const path = process.getBuiltinModule("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), unoCSS(), vueDevTools()],
  resolve: {
    alias: {
      "@": path.join(import.meta.dirname, "./src"),
    },
  },
  define: {
    WJ_DEBUG: "/* WJ_DEBUG */ true",
  },
  build: {
    minify: false,
  },
  server: {
    cors: true,
    port: 12321,
  },
});
