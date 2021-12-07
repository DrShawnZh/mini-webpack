import Compiler from "./compiler";
// import config from "../webpack.config";

export default class Webpack {
  // config: string;
  constructor(config) {
    // this.config = config;
    const { plugins } = config;
    const compiler = new Compiler(config);

    // 执行所有插件
    for (let plugin of plugins) {
      plugin.apply(compiler);
    }

    compiler.run();
  }
}
