"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugins_1 = require("./lib/plugins");
exports.default = {
    entry: "./test/index.js",
    output: {
        dir: "./dist",
        filename: "bundle.js",
    },
    plugins: [new plugins_1.default()],
};
