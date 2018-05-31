"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
axios_1.default.defaults.withCredentials = true;
var YamlQlClient = /** @class */ (function () {
    function YamlQlClient(opiotns) {
        var _this = this;
        this.exec = function (operation, variables, options) {
            var opts = Object.assign({}, _this.opiotns, options);
            var _a = opts.endpoint, endpoint = _a === void 0 ? '/yamlql' : _a, metadata = opts.metadata;
            var data = {
                operation: operation,
                variables: JSON.stringify(variables),
                metadata: JSON.stringify(metadata)
            };
            return axios_1.default.post(endpoint, data, opts)
                .then(function (rs) { return rs.data; });
        };
        this.opiotns = opiotns;
    }
    return YamlQlClient;
}());
exports.YamlQlClient = YamlQlClient;
exports.default = YamlQlClient;
//# sourceMappingURL=index.js.map