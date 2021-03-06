"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var instance = axios_1.default.create({
    xsrfCookieName: 'QXSRF-TOKEN',
    xsrfHeaderName: 'QXSRF-TOKEN',
    withCredentials: true,
});
function execQuery(operation, variables, options) {
    var _a = options.endpoint, endpoint = _a === void 0 ? '/yamlql' : _a, metadata = options.metadata;
    var data = { operation: operation, variables: variables, metadata: metadata };
    return instance.post(endpoint, data, options)
        .then(function (rs) { return rs.data; });
}
exports.execQuery = execQuery;
//# sourceMappingURL=execQuery.js.map