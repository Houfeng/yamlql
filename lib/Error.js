"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YamlQLError extends Error {
    constructor(message, opts = {}) {
        super(message);
        this.options = opts;
    }
    toJSON() {
        const { message, options } = this;
        const error = message;
        return Object.assign({ error }, options);
    }
}
exports.YamlQLError = YamlQLError;
exports.default = YamlQLError;
//# sourceMappingURL=Error.js.map