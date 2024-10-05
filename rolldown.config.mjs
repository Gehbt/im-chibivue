import { defineConfig } from "rolldown";
export default defineConfig({
  input: "./packages/index.ts",
  plugins: [],
  output: {
    banner: "// @ts-nocheck",
    format: "esm",
    dir: "dist",
    entryFileNames: "entry-[name].js",
    chunkFileNames: "chunk-[contenthash:8].js",
    exports: "named",
  },
  cwd: import.meta.dirname,
  treeshake: true,
});
