#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var index_1 = require("../lib/index");
var path_1 = require("path");
commander_1.program
    .version("1.0.0")
    .option("-c, --config <path>", "webpack.config.js")
    .parse(process.argv);
var options = commander_1.program.opts();
if (options.config) {
    var pathData = path_1.parse(options.config);
    var configPath = path_1.resolve(__dirname, "../" + pathData.name);
    console.log(configPath);
    var config = require(configPath);
    new index_1.default(config.default);
}
else {
    console.log("please provide config file");
}
