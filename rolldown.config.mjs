import path from "path";
import { defineConfig } from "rolldown";
/**
 * @param  {...string} src
 * @returns
 */
const p2 = (...src) => path.resolve(import.meta.dirname, ...src);

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
  cwd: p2(),
  treeshake: true,
});
