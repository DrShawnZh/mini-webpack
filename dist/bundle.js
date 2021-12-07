
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
      require('./test/index.js')
    })({"./test/index.js":{"deps":{"./add.js":"./test/add.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log((0, _add[\"default\"])(1, 4));"},"./test/add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = _default;\n\nfunction _default(a, b) {\n  return a + b;\n}"}})
  