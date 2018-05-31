"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class YamlQlClient {
    constructor(opiotns) {
        this.exec = (operation, variables, options) => {
            const opts = Object.assign({}, this.opiotns, options);
            const { endpoint = '/yamlql', metadata } = opts;
            const data = {
                operation: operation,
                variables: JSON.stringify(variables),
                metadata: JSON.stringify(metadata)
            };
            return axios_1.default.post(endpoint, data, opts)
                .then((rs) => rs.data);
        };
        this.opiotns = opiotns;
    }
}
exports.YamlQlClient = YamlQlClient;
exports.default = YamlQlClient;
//# sourceMappingURL=index.js.map