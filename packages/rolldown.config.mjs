// @ts-check
import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

const path = process.getBuiltinModule("node:path");
/**
 * @power ms-vscode.ts-file-path-support
 * @template TBaseDir
 * @typedef {string & { baseDir?: TBaseDir }} RelativeFilePath
 */
/**
 * @param {RelativeFilePath<'$dir'>} p
 * @returns
 */
const p2 = (p = ".") => path.join(import.meta.dirname, ".", p);

export default defineConfig({
  cwd: p2("."),
  input: {
    "im-chibivue": p2("./index.ts"),
  },
  output: {
    cleanDir: true,
    format: "es",
    dir: p2("./dist"),
    // entryFileNames: "im-chibivue.js",
    // chunkFileNames: "chunks/chunk-[contenthash:8].js",
    exports: "named",
    sourcemap: true,
  },
  tsconfig: p2("./tsconfig.json"),
  plugins: [
    dts({
      tsconfig: p2("./tsconfig.json"),
      compilerOptions: {
        sourceMap: true,
        declaration: true,
        declarationMap: true,
      },
    }),
  ],
  platform: "browser",
  treeshake: true,
  resolve: {},
});
