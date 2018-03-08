"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("./Context");
const BuiltIn_1 = __importDefault(require("./BuiltIn"));
const debug = require('debug')('processor');
const { each, isString, isObject, isArray, getByPath, setByPath } = require('ntils');
class Processor {
    constructor(options) {
        this.options = Object.assign({}, options);
        this.builtIn = new BuiltIn_1.default();
    }
    get root() {
        return this.options.root || {};
    }
    get docs() {
        return this.options.docs || {};
    }
    get invokeThreshold() {
        return this.options.invokeThreshold || 20;
    }
    invoke(method, params) {
        if (this.builtIn[method]) {
            return this.invokeOn(this.builtIn, method, params);
        }
        const { invoke } = this.options;
        if (invoke)
            return this.invoke(method, params);
        return this.invokeOn(this.root, method, params);
    }
    invokeOn(owner, method, params) {
        const func = owner[method];
        if (!func)
            throw new Error(`Cannt find '${method}'`);
        return func.apply(null, Object.values(params));
    }
    async process(options) {
        const context = new Context_1.Context(this, options);
        return context.execute();
    }
}
exports.default = Processor;
//# sourceMappingURL=Processor.js.map