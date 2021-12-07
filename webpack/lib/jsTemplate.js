"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path_1 = require("path");
var Template = /** @class */ (function () {
    function Template(option, module) {
        var entry = option.entry, output = option.output;
        this.output = output;
        this.module = module;
        this.entry = entry;
    }
    Template.prototype.emit = function () {
        var _a = this.output, dir = _a.dir, filename = _a.filename;
        var outputFile = path_1.join(dir, filename);
        /**
         * 创建文件夹
         */
        fs.mkdirSync(dir);
        /**
         * 写入文件
         */
        fs.writeFileSync(outputFile, this.returnTemplate(JSON.stringify(this.module)), "utf-8");
    };
    /**
     * js文件内容模板
     * @param file 出口文件
     * @param gragh
     * @returns
     */
    Template.prototype.returnTemplate = function (gragh) {
        return "\n    (function (gragh){\n      function require(file) {\n        function absRequire(relPath) {\n          return require(gragh[file].deps[relPath])\n        }\n\n        var exports = {};\n        (function (require, exports, code) {\n          eval(code)\n        })(absRequire, exports, gragh[file].code)\n        return exports\n      }\n      require('" + this.entry + "')\n    })(" + gragh + ")\n  ";
    };
    return Template;
}());
exports.default = Template;
