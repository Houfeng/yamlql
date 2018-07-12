"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _axios_0_18_0_axios_1 = require("_axios@0.18.0@axios");
_axios_0_18_0_axios_1.default.defaults.withCredentials = true;
function execQuery(query, variables, options) {
    var _a = options.endpoint, endpoint = _a === void 0 ? '/yamlql' : _a, metadata = options.metadata;
    var data = {
        operation: query,
        variables: JSON.stringify(variables),
        metadata: JSON.stringify(metadata)
    };
    return _axios_0_18_0_axios_1.default.post(endpoint, data, options).then(function (rs) { return rs.data; });
}
exports.execQuery = execQuery;
//# sourceMappingURL=execQuery.js.map