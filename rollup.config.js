import { babel } from "@rollup/plugin-babel";
import fileSize from "rollup-plugin-filesize";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

const libraryName = "my-project";

export default {
  input: "src/index.ts",
  output: [
    {
      file: `./dist/${libraryName}.cjs.min.js`,
      format: "cjs",
    },
    {
      file: `./dist/${libraryName}.min.js`,
      format: "esm",
    },
    {
      file: `./dist/${libraryName}.esm.min.js`,
      format: "esm",
    },
    {
      file: `./dist/${libraryName}.umd.min.js`,
      format: "umd",
      name: libraryName,
    },
  ],
  plugins: [
    typescript(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"],
    }),
    terser(),
    fileSize(),
  ],
};
