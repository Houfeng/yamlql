"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yaml_1 = __importDefault(require("./yaml"));
const debug = require('debug')('context');
const { each, isString, isObject, isArray, getByPath, setByPath, isNull, isFunction } = require('ntils');
class Context {
    constructor(processor, options) {
        this.__resolveCount = 0;
        this.__resolvers = [];
        this.__options = this.convertOptions(options);
        this.__processor = processor;
        this.createResolvers();
        debug('constructor', options);
    }
    convertOptions(opts) {
        let { operation, variables, metadata } = opts, others = __rest(opts, ["operation", "variables", "metadata"]);
        operation = operation || Object.create(null);
        variables = variables || Object.create(null);
        metadata = metadata || Object.create(null);
        if (isString(operation))
            operation = yaml_1.default.parse(operation);
        if (isString(variables))
            variables = JSON.parse(variables);
        if (isString(metadata))
            metadata = JSON.parse(metadata);
        return Object.assign({ operation, variables, metadata }, others);
    }
    get processor() {
        return this.__processor;
    }
    get options() {
        return this.__options;
    }
    get metadata() {
        return this.options.metadata;
    }
    get client() {
        return this.options.client;
    }
    get resolvers() {
        return this.__resolvers;
    }
    createResolvers() {
        const { resolvers } = this.processor;
        this.__resolvers = resolvers.map(resolver => {
            return resolver instanceof Function ? new resolver(this) : resolver;
        });
    }
    isVariable(val) {
        if (!isString(val))
            return false;
        const str = val;
        return str.startsWith('$') || str.startsWith('.');
    }
    trimVariable(name) {
        if (!name)
            return name;
        const str = name;
        //$代表取整个变量对象
        if (str === '$')
            return '.';
        //.代表取当前结果对象
        if (str.startsWith('.'))
            return '@' + str;
        //普通变量
        if (str.startsWith('$'))
            return str.slice(1);
        return name;
    }
    /**
     * 获取一个变量值
     * @param variables 所有变量
     * @param path 值路径
     */
    getVarValue(variables, path) {
        if (path == '.') {
            const newVaribles = Object.assign({}, variables);
            delete newVaribles['@'];
            return newVaribles;
        }
        return getByPath(variables, path);
    }
    isAction(val) {
        return isObject(val);
    }
    parseParams(params, variables) {
        if (isString(params) && this.isVariable(params)) {
            return this.getVarValue(variables, this.trimVariable(params));
        }
        else if (isString(params)) {
            let str = params;
            if (str.startsWith('='))
                str = str.slice(1);
            return str;
        }
        else if (!isObject(params) && !isArray(params)) {
            return params;
        }
        const values = isArray(params) ? [] : {};
        each(params, (name, value) => {
            values[name] = this.parseParams(value, variables);
        });
        return values;
    }
    getParams(params, variables) {
        let values = this.parseParams(params, variables);
        if (!isArray(params) && !isObject(params))
            values = [values];
        return values;
    }
    /**
     * 调用一个 action , 并返回执行结果
     * @param operation 动作描述对象
     * @param variables 所有变量
     */
    async resolveAction(operation, variables) {
        this.__resolveCount++;
        const { resolveThreshold } = this.processor;
        if (this.__resolveCount > resolveThreshold) {
            throw new Error(`Resolve exceeds the maximum limit ${resolveThreshold}.`);
        }
        const { action, params, fields } = operation;
        const paramValues = this.getParams(params, variables) || {};
        const { metadata } = this.options;
        const metadataObj = metadata ?
            (isString(metadata) ? JSON.parse(metadata) : metadata) : {};
        const resolveOpts = {
            method: action, params: paramValues
        };
        const result = await this.processor.resolve(this, resolveOpts);
        return fields ? this.resolve(result, fields, variables) : result;
    }
    /**
     * 转换处理一个 field
     * 暂不允许在对象是调用函数（将来增加一个注解声明哪些可调用）
     * src.action = isFunction(val) ? (...args: Array<any>) => {
     *   return val.call(srcItem, ...args);
     * } : val;
     * @param srcObj
     * @param src
     * @param dstObj
     * @param dst
     * @param variables
     */
    async resolveField(srcObj, src, dstObj, dst, variables) {
        //生成的新的变量查找对象，@ 指定当前要处理的源对象
        //所有 . 开头的表达式，会被转换为从 @ 查找
        //单独的 $ 会被转换为 . 用于获取整个 scopedVaribles
        const scopedVaribles = Object.assign({}, variables, { '@': srcObj });
        if (this.isVariable(src)) {
            return this.getVarValue(scopedVaribles, this.trimVariable(src));
        }
        else if (this.isAction(src)) {
            if (this.isVariable(src.action)) {
                const expr = this.trimVariable(src.action);
                src.action = this.getVarValue(scopedVaribles, expr);
            }
            if (!src.action) {
                const val = getByPath(srcObj, dst);
                src.action = isFunction(val) ? {} : val || {};
            }
            return this.resolveAction(src, scopedVaribles);
        }
        else {
            return getByPath(srcObj, String(src));
        }
    }
    /**
     * 创建一个 filed 转换异步任务
     * @param srcObj 源对象
     * @param src 源表达式
     * @param dstObj 目标对象
     * @param dst 目标表达式
     * @param vars
     * @param ignores 要忽略的 key
     */
    async createFieldResolveTask(srcObj, src, dstObj, dst, vars, ignores) {
        let val = await this.resolveField(srcObj, src, dstObj, dst, vars);
        if (dst === '.' && isObject(val)) {
            //如果目标表达式是 . 且 src 的值是 object ，则复制生个 key
            each(val, (key, value) => {
                if (ignores.includes(key))
                    return;
                dstObj[key] = value;
            });
        }
        else if (dst === '.') {
            //如果目标表达式是 . 但 src 的值是基本类型，则放到 __value__ 中
            dstObj.__value__ = val;
        }
        else if (!ignores.includes(dst)) {
            //否则，如果不在 ignores 中，就按 dst 表达式赋值到 dstObj 中
            setByPath(dstObj, dst, val);
        }
        return dstObj;
    }
    /**
     * 对结果对象进行 fileds 的转换和映射处理, convertObj 只处理对象
     * convertResult 检查是否为数组，并对数组进行 map 调用 convertObj 处理每一项
     * @param srcObj 要处理的结果对象
     * @param fields 要处理的字段映射
     * @param vars 所有变量
     */
    async resolveObj(srcObj, fields, vars) {
        if (!isObject(srcObj))
            return srcObj;
        const dstObj = {};
        const pendings = [];
        const ignores = [];
        each(fields, (dst, src) => {
            //所有 ~ 开头的 field 不进行处理，用于存在公用判读，并通过 yaml 语法引用
            if (dst.startsWith('~'))
                return;
            if (isNull(src) || src === true)
                src = dst;
            if (src === false)
                ignores.push(dst);
            pendings.push(this.createFieldResolveTask(srcObj, src, dstObj, dst, vars, ignores));
        });
        await Promise.all(pendings);
        //如查 __value__ 就返回 __value__ 中的值，用于要完全替换 dstobj
        return '__value__' in dstObj ? dstObj.__value__ : dstObj;
    }
    /**
     * 对结果对象进行 fileds 的转换和映射处理，如果一个数据会 map 处理所有元素
     * @param result 要处理的结果对象
     * @param fields 要处理的字段映射
     * @param vars 所有变量
     */
    resolve(result, fields, vars) {
        if (!result || (!isObject(result) && !isArray(result))) {
            return result;
        }
        if (isArray(result)) {
            return Promise.all(result
                .map(item => this.resolveObj(item, fields, vars)));
        }
        return this.resolveObj(result, fields, vars);
    }
    /**
     * 执行当前处理上下文，并返回处理结果
     * 所有的平级 fileds 会并行的处理，子级会在父级完成后处理
     * 最后，返回的是完全处理好的结果对象
     */
    execute() {
        debug('execute', this.options);
        const { operation, variables } = this.options;
        return this.resolve({}, operation, variables);
    }
}
exports.Context = Context;
exports.default = Context;
//# sourceMappingURL=Context.js.map