import Parser from "./parser";

export default class Compilation {
  parser: any;
  constructor() {
    this.parser = new Parser();
  }

  /**
   * 获取当前文件的数据
   * @param filePath
   * @returns
   */
  getJSModule(filePath: string) {
    const ast = this.parser.toAst(filePath);
    const deps = this.parser.getDept(ast, filePath);
    const code = this.parser.transToJS(ast);

    return {
      // 代码
      code,
      // js文件路径
      filePath,
      // js中的依赖文件
      deps,
    };
  }
}
