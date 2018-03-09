"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("./Context");
const BuiltIn_1 = __importDefault(require("./BuiltIn"));
const debug = require('debug')('processor');
const { each, isString, isObject, isArray, getByPath, isFunction } = require('ntils');
class Processor {
    constructor(options) {
        this.options = Object.assign({}, options);
        this.builtIn = new BuiltIn_1.default();
        Object.assign(this.builtIn, this.options.builtIn);
    }
    get root() {
        return this.options.root || {};
    }
    get docs() {
        return this.options.docs || this.root.__docs__ || {};
    }
    get invokeThreshold() {
        return this.options.invokeThreshold || 100;
    }
    invoke(method, params, metadata) {
        //如果 action 是对象直接返回当作结果
        if (isObject(method))
            return method;
        //如果是函数，执行并返回结果
        if (isFunction(method))
            return this.invokeOn(null, method, params);
        //如果是内建函数，执行内建函数并返回结果
        if (this.builtIn[method]) {
            return this.invokeOn(this.builtIn, method, params);
        }
        //如果构造 processor 时指定了 invoke，调用 invoke 执行
        const { invoke } = this.options;
        if (invoke)
            return invoke(method, params, metadata);
        //最后在 this.root 上执行
        return this.invokeOn(this.root, method, params);
    }
    invokeOn(owner, method, params) {
        const func = isString(method) ?
            getByPath(owner, method) : method;
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