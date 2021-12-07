import * as path from "path";
import { exec } from "child_process";

export default class SelfPlugin {
  options: any;
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const pluginName = SelfPlugin.name;
    const that = this;
    compiler.hooks.beforeRun.tapAsync(pluginName, (compilation, callback) => {
      console.log(pluginName, "   teta");
      const ls = exec(`rm -rf ${compilation.options.output.dir}`);
      ls.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
      });

      /**
       * 进程执行过快，延迟1s使插件作用明显
       */
      setTimeout(() => {
        callback();
      }, 1000);
    });
  }
}
