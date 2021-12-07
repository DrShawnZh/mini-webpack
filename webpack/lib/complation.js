"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./parser");
var Compilation = /** @class */ (function () {
    function Compilation() {
        this.parser = new parser_1.default();
    }
    /**
     * 获取当前文件的数据
     * @param filePath
     * @returns
     */
    Compilation.prototype.getJSModule = function (filePath) {
        var ast = this.parser.toAst(filePath);
        var deps = this.parser.getDept(ast, filePath);
        var code = this.parser.transToJS(ast);
        return {
            // 代码
            code: code,
            // js文件路径
            filePath: filePath,
            // js中的依赖文件
            deps: deps,
        };
    };
    return Compilation;
}());
exports.default = Compilation;
