import Compilation from "./complation";
import Template from "./jsTemplate";
import { AsyncParallelHook } from "tapable";

export default class Compiler {
  options: any;
  entry: string;
  output: string;
  /**
   * gragh
   * 所有文件的信息
   * 文件名: {
   *  代码，
   *  依赖文件
   * }
   */
  gragh: { [k: string]: any } = {};
  compilation: any;
  template: any;
  hooks: any;
  constructor(options) {
    this.options = options;
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.compilation = new Compilation();
    this.hooks = { beforeRun: new AsyncParallelHook(["compiler"]) };
  }

  /**
   * 生命周期，webpack执行前的插件
   * @returns
   */
  beforeRun() {
    return new Promise((resolve) => {
      this.hooks.beforeRun.callAsync(this, () => {
        resolve(true);
      });
    });
  }

  async run() {
    // 执行生命周期
    await this.beforeRun();
    // 获取入口文件的信息，文件名，代码，依赖项
    const entryModule = this.compilation.getJSModule(this.entry);

    const temp: {
      filePath: string;
      code: string;
      deps: { [k: string]: string };
    }[] = [entryModule];

    // 递归获取所有文件的依赖项
    this.getAllModule(temp, entryModule);
    temp.forEach((item) => {
      this.gragh[item.filePath] = {
        deps: item.deps,
        code: item.code,
      };
    });

    this.emitJSCode();
  }

  /**
   * 获取所有的模块
   * @param temp
   * @param param1
   */
  getAllModule(temp, { deps }) {
    Object.keys(deps).forEach((item) => {
      const depsPath = deps[item];
      const childDep = this.compilation.getJSModule(depsPath);
      temp.push(childDep);
      this.getAllModule(temp, childDep);
    });
  }

  /**
   * 写入js文件
   */
  emitJSCode() {
    new Template(this.options, this.gragh).emit();
  }
}
