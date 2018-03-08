"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("./Context");
const BuiltIn_1 = __importDefault(require("./BuiltIn"));
const debug = require('debug')('processor');
const { each, isString, isObject, isArray, getByPath, setByPath, isFunction } = require('ntils');
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
        return this.options.invokeThreshold || 100;
    }
    invoke(method, params) {
        if (isObject(method))
            return method;
        if (isFunction(method))
            return this.invokeOn(null, method, params);
        if (this.builtIn[method]) {
            return this.invokeOn(this.builtIn, method, params);
        }
        const { invoke } = this.options;
        if (invoke)
            return this.invoke(method, params);
        return this.invokeOn(this.root, method, params);
    }
    invokeOn(owner, method, params) {
        const func = isString(method) ? owner[method] : method;
        if (!func || !func.apply)
            throw new Error(`Cannt find method '${method}'`);
        return func.apply(owner, Object.values(params));
    }
    async process(options) {
        const context = new Context_1.Context(this, options);
        return context.execute();
    }
}
exports.default = Processor;
//# sourceMappingURL=Processor.js.map