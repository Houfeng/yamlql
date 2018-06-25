"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
class Resolver {
    constructor(context) {
        this.__context = context;
    }
    get context() {
        return this.__context;
    }
    static create(factory) {
        return (util_1.isFunction(factory) ? factory : function () {
            return factory;
        });
    }
}
exports.Resolver = Resolver;
exports.default = Resolver;
//# sourceMappingURL=Resolver.js.map