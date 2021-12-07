const fs = require("fs");
const path = require("path");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
const parser = require("@babel/parser");

/**
 * 模块分析
 * @param {*} file
 */
function getModuleInfo(file) {
  // 读取文件
  const body = fs.readFileSync(file, "utf-8");

  // 转换AST语法树
  const ast = parser.parse(body, {
    sourceType: "module", // ES模块
  });

  // console.log(ast, "ast");

  // 收集依赖
  const deps = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file);
      const absPath = "./" + path.join(dirname, node.source.value);
      deps[node.source.value] = absPath;
    },
  });
  // console.log(deps, "depyt");

  // ES6转换为ES5
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });

  return {
    deps,
    code,
    file,
  };
}

function parseModules(file) {
  debugger
  const entry = getModuleInfo(file);
  const temp = [entry];

  const depsGraph = {};

  getDeps(temp, entry);

  temp.forEach((info) => {
    depsGraph[info.file] = {
      deps: info.deps,
      code: info.code,
    };
  });
  return depsGraph;
}

function getDeps(temp, { deps }) {
  debugger
  Object.keys(deps).forEach((key) => {
    const child = getModuleInfo(deps[key]);
    temp.push(child);
    getDeps(temp, child);
  });
}

function bundle(file) {
  const gragh = JSON.stringify(parseModules(file));
  return `
    (function (gragh){
      function require(file) {
        function absRequire(relPath) {
          return require(gragh[file].deps[relPath])
        }

        var exports = {};
        (function (require, exports, code) {
          eval(code)
        })(absRequire, exports, gragh[file].code)
        return exports
      }
      require('${file}')
    })(${gragh})
  `;
}

const content = bundle("./src/index.js");

!fs.existsSync("./dist") && fs.mkdirSync("./dist");
fs.writeFileSync("./dist/bundle.js", content);
