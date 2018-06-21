"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("./Context");
const builtIn_1 = __importDefault(require("./builtIn"));
const debug = require('debug')('processor');
const { each, isString, isObject, isArray, getByPath, isFunction } = require('ntils');
class Processor {
    constructor(options) {
        this.options = Object.assign({}, options);
        this.builtIn = new builtIn_1.default();
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
    invoke(options) {
        const { method, params, metadata } = options;
        //如果 action 是对象直接返回当作结果
        if (isObject(method))
            return method;
        //如果是函数，执行并返回结果
        if (isFunction(method))
            return this.exec(method, options);
        //如果是内建函数，执行内建函数并返回结果
        const builtInFunc = getByPath(this.builtIn, method);
        if (builtInFunc)
            return this.exec(builtInFunc, options);
        //如果构造 processor 时指定了 invoke，调用 invoke 执行
        const { invoke } = this.options;
        if (invoke)
            return invoke(options);
        //如果通过 root 挂载的函数，调用并返回结果
        const func = getByPath(this.root, method);
        return this.exec(func, options);
    }
    exec(func, options) {
        const { method, params } = options;
        if (!func || !func.apply) {
            throw new Error(`Cannt find method '${method}'`);
        }
        return func.apply(options, Object.values(params));
    }
    async process(options, client) {
        const context = new Context_1.Context(this, options, client);
        return context.execute();
    }
}
exports.default = Processor;
//# sourceMappingURL=Processor.js.map