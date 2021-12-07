import path from "path";
import CleanPlugin from "./src/plugins";

export default {
  entry: "./test/index.js",
  output: {
    dir: "./dist",
    filename: "bundle.js",
  },
  plugins: [new CleanPlugin()],
};
