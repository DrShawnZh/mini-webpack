"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var SelfPlugin = /** @class */ (function () {
    function SelfPlugin(options) {
        this.options = options;
    }
    SelfPlugin.prototype.apply = function (compiler) {
        var pluginName = SelfPlugin.name;
        var that = this;
        compiler.hooks.beforeRun.tapAsync(pluginName, function (compilation, callback) {
            console.log(pluginName, "   teta");
            var ls = child_process_1.exec("rm -rf " + compilation.options.output.dir);
            ls.on("close", function (code) {
                console.log("child process exited with code " + code);
            });
            /**
             * 进程执行过快，延迟1s使插件作用明显
             */
            setTimeout(function () {
                callback();
            }, 1000);
        });
    };
    return SelfPlugin;
}());
exports.default = SelfPlugin;
