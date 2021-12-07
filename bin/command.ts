#!/usr/bin/env node
import { program } from "commander";
import webpack from "../src/index";
import { resolve, parse } from "path";

program
  .version("0.0.1")
  .option('-v, -version', 'show version')
  .option("-c, --config <path>", "webpack.config.js")
  .parse(process.argv);

const options = program.opts();

if (options.config) {
  const pathData = parse(options.config);
  const configPath = resolve(__dirname, "../" + pathData.name);
  console.log(configPath);
  const config = require(configPath);
  new webpack(config.default);
} else {
  console.log("please provide config file");
}
