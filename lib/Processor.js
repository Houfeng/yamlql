"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("./Context");
const Resolver_1 = require("./Resolver");
const builtIn_1 = __importDefault(require("./builtIn"));
const debug = require('debug')('processor');
const { isNull, isObject, getByPath, isFunction } = require('ntils');
const prevents = (() => {
    const map = { prototype: true, arguments: true, caller: true };
    Object.getOwnPropertyNames({}.__proto__)
        .forEach(name => map[name] = true);
    return map;
})();
class Processor {
    constructor(options) {
        this.resolvers = [builtIn_1.default];
        this.findMethodFilter = (value, name) => {
            return this.isPrevent(value, name) ? null : value;
        };
        this.options = Object.assign({}, options);
        this.resolvers.unshift(this.options.resolver);
        debug('constructor', options);
    }
    get docs() {
        const { docs, resolver } = this.options;
        return docs || (resolver && resolver.docs) || {};
    }
    get resolveThreshold() {
        return this.options.resolveThreshold || 100;
    }
    isPrevent(value, name) {
        return (name && prevents[name]) || this.isContext(value) ||
            this.isProcessor(value) || value == Function.call ||
            value == Function.bind || value == Function.apply;
    }
    findMethodInfo(ctx, method) {
        if (isFunction(method))
            return { func: method, scope: null };
        for (let i = 0; i < ctx.resolvers.length; i++) {
            const resolver = ctx.resolvers[i];
            if (!resolver)
                continue;
            //debug('findMethodInfo resolver', resolver);
            const path = method.split('.');
            //debug('findMethodInfo path', path);
            const name = path.pop();
            const scope = getByPath(resolver, path.join('.'), this.findMethodFilter);
            //debug('findMethodInfo scope', scope);
            if (!scope || this.isPrevent(scope))
                continue;
            const func = scope[name];
            //debug('findMethodInfo func', name, func, scope);
            if (!func || !isFunction(func) || this.isPrevent(func, name))
                continue;
            return { func, scope };
        }
    }
    isResolver(obj) {
        return obj instanceof Resolver_1.Resolver;
    }
    isProcessor(obj) {
        return obj instanceof Processor;
    }
    isContext(obj) {
        return obj instanceof Context_1.Context;
    }
    resolve(ctx, options, ...others) {
        const { method, params } = options;
        debug('resolve', options);
        //如果 action 是对象直接返回当作结果
        if (isObject(method) || isNull(method))
            return method;
        //如果是函数直接执行，并返回结果，然后从 resolver 上查找，如果找到执行并返回
        const methodInfo = this.findMethodInfo(ctx, method);
        debug('methodInfo', methodInfo);
        if (methodInfo) {
            const { func, scope } = methodInfo;
            const values = Object.values(params);
            if (!this.isResolver(scope))
                values.unshift(ctx);
            return func.apply(scope, values);
        }
        //如果构造 processor 时指定了 resolve resolve 执行
        if (this.options.resolve) {
            return this.options.resolve.call(ctx, ctx, options, ...others);
        }
        //抛出找不到 resolve 方法的异常
        throw new Error(`Cannt find method '${method}'`);
    }
    async process(options) {
        debug('process', options);
        const context = new Context_1.Context(this, options);
        return context.execute();
    }
}
exports.default = Processor;
//# sourceMappingURL=Processor.js.map