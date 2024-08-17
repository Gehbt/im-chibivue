// uno.config.ts
import { defineConfig, presetUno, transformerDirectives } from "unocss";

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerDirectives()],
});
