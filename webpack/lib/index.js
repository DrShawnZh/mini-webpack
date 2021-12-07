"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compiler_1 = require("./compiler");
// import config from "../webpack.config";
var Webpack = /** @class */ (function () {
    // config: string;
    function Webpack(config) {
        // this.config = config;
        var plugins = config.plugins;
        var compiler = new compiler_1.default(config);
        // 执行所有插件
        for (var _i = 0, plugins_1 = plugins; _i < plugins_1.length; _i++) {
            var plugin = plugins_1[_i];
            plugin.apply(compiler);
        }
        compiler.run();
    }
    return Webpack;
}());
exports.default = Webpack;
