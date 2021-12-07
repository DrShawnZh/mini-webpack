import * as fs from "fs";
import { join } from "path";

export default class Template {
  output: { dir: string; filename: string }; // 输出地址
  module: any;
  entry: string; // 入口地址

  constructor(option, module) {
    const { entry, output } = option;
    this.output = output;
    this.module = module;
    this.entry = entry;
  }

  emit() {
    const { dir, filename } = this.output;

    const outputFile = join(dir, filename);
    /**
     * 创建文件夹
     */
    fs.mkdirSync(dir);
    /**
     * 写入文件
     */
    fs.writeFileSync(
      outputFile,
      this.returnTemplate(JSON.stringify(this.module)),
      "utf-8"
    );
  }

  /**
   * js文件内容模板
   * @param file 出口文件
   * @param gragh
   * @returns
   */
  returnTemplate(gragh: string) {
    return `
    (function (gragh){
      function require(file) {
        function absRequire(relPath) {
          return require(gragh[file].deps[relPath])
        }

        var exports = {};
        (function (require, exports, code) {
          eval(code)
        })(absRequire, exports, gragh[file].code)
        return exports
      }
      require('${this.entry}')
    })(${gragh})
  `;
  }
}
