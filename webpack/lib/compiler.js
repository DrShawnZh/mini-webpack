"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var complation_1 = require("./complation");
var jsTemplate_1 = require("./jsTemplate");
var tapable_1 = require("tapable");
var Compiler = /** @class */ (function () {
    function Compiler(options) {
        /**
         * gragh
         * 所有文件的信息
         * 文件名: {
         *  代码，
         *  依赖文件
         * }
         */
        this.gragh = {};
        this.options = options;
        var entry = options.entry, output = options.output;
        this.entry = entry;
        this.output = output;
        this.compilation = new complation_1.default();
        this.hooks = { beforeRun: new tapable_1.AsyncParallelHook(["compiler"]) };
    }
    /**
     * 生命周期，webpack执行前的插件
     * @returns
     */
    Compiler.prototype.beforeRun = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.hooks.beforeRun.callAsync(_this, function () {
                resolve(true);
            });
        });
    };
    Compiler.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entryModule, temp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // 执行生命周期
                    return [4 /*yield*/, this.beforeRun()];
                    case 1:
                        // 执行生命周期
                        _a.sent();
                        entryModule = this.compilation.getJSModule(this.entry);
                        temp = [entryModule];
                        // 递归获取所有文件的依赖项
                        this.getAllModule(temp, entryModule);
                        temp.forEach(function (item) {
                            _this.gragh[item.filePath] = {
                                deps: item.deps,
                                code: item.code,
                            };
                        });
                        this.emitJSCode();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取所有的模块
     * @param temp
     * @param param1
     */
    Compiler.prototype.getAllModule = function (temp, _a) {
        var _this = this;
        var deps = _a.deps;
        Object.keys(deps).forEach(function (item) {
            var depsPath = deps[item];
            var childDep = _this.compilation.getJSModule(depsPath);
            temp.push(childDep);
            _this.getAllModule(temp, childDep);
        });
    };
    /**
     * 写入js文件
     */
    Compiler.prototype.emitJSCode = function () {
        new jsTemplate_1.default(this.options, this.gragh).emit();
    };
    return Compiler;
}());
exports.default = Compiler;
