import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import fileSize from "rollup-plugin-filesize";
import typescript from "rollup-plugin-typescript2";
import { readFile } from "fs/promises";

function getConfig(libraryName) {
  return {
    input: "src/index.ts",
    output: [
      {
        file: `./dist/${libraryName}.cjs`,
        format: "cjs",
      },
      {
        file: `./dist/${libraryName}.mjs`,
        format: "esm",
      },
    ],
    plugins: [
      commonjs(),
      nodeResolve(),
      typescript(),
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-env"],
      }),
      fileSize(),
    ],
  };
}

const json = await readFile("./package.json", "utf8");
const libraryName = JSON.parse(json).name;
const config = getConfig(libraryName);

export default config;
