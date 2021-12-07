"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var traverse_1 = require("@babel/traverse");
var babel = require("@babel/core");
var parser = require("@babel/parser");
var fs = require("fs");
var path = require("path");
var Parser = /** @class */ (function () {
    function Parser() {
    }
    /**
     * 获取入口文件内容，并转换为ast
     * @param path
     * @returns
     */
    Parser.prototype.toAst = function (path) {
        // 获取
        var content = fs.readFileSync(path, "utf-8");
        /**
         * 将代码转换为ast 抽象语法树
         */
        var ast = parser.parse(content, { sourceType: "module" });
        return ast;
    };
    /**
     * 收集依赖项
     * @param ast
     * @param filePath
     * @returns
     */
    Parser.prototype.getDept = function (ast, filePath) {
        var deps = {};
        /**
         * 获取当前js文件中的依赖文件
         */
        traverse_1.default(ast, {
            ImportDeclaration: function (_a) {
                var node = _a.node;
                var dirname = path.dirname(filePath);
                var absPath = "./" + path.join(dirname, node.source.value);
                deps[node.source.value] = absPath;
            },
        });
        return deps;
    };
    /**
     * 将ast转换为js code
     * @param ast
     * @param filePath
     */
    Parser.prototype.transToJS = function (ast) {
        // 将代码转换为esmodule
        var code = babel.transformFromAst(ast, null, {
            presets: ["@babel/preset-env"],
        }).code;
        return code;
    };
    return Parser;
}());
exports.default = Parser;
