import traverse from "@babel/traverse";
import * as babel from "@babel/core";
import * as parser from "@babel/parser";
import * as fs from "fs";
import * as path from "path";

export default class Parser {
  constructor() {}

  /**
   * 获取入口文件内容，并转换为ast
   * @param path 
   * @returns 
   */
  toAst(path: string) {
    // 获取
    const content = fs.readFileSync(path, "utf-8");
    /**
     * 将代码转换为ast 抽象语法树
     */
    const ast = parser.parse(content, { sourceType: "module" });

    return ast;
  }

  /**
   * 收集依赖项
   * @param ast
   * @param filePath
   * @returns
   */
  getDept(ast, filePath: string) {
    const deps = {};
    /**
     * 获取当前js文件中的依赖文件
     */
    traverse(ast, {
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filePath);
        const absPath = "./" + path.join(dirname, node.source.value);
        deps[node.source.value] = absPath;
      },
    });
    return deps;
  }

  /**
   * 将ast转换为js code
   * @param ast
   * @param filePath
   */
  transToJS(ast) {
    // 将代码转换为esmodule
    const { code } = babel.transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });
    return code;
  }
}
