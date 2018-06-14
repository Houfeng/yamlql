"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YamlQLError extends Error {
    constructor(opts, attach = {}) {
        if (opts instanceof Error) {
            const { name, message, stack } = opts;
            super(message);
            this.name = name;
            this.stack = stack;
        }
        else {
            super(opts);
        }
        this.attach = attach;
    }
    toJSON() {
        const { message, attach } = this;
        const error = message;
        return Object.assign({ error }, attach);
    }
}
exports.YamlQLError = YamlQLError;
exports.default = YamlQLError;
//# sourceMappingURL=Error.js.map