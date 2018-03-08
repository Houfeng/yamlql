"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_yaml_1 = require("js-yaml");
function parse(text) {
    return js_yaml_1.safeLoad(text);
}
exports.parse = parse;
exports.default = { parse };
//# sourceMappingURL=yaml.js.map