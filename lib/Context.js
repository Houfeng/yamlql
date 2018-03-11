"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const yaml_1 = __importDefault(require("./yaml"));
const debug = require('debug')('context');
const { each, isString, isObject, isArray, getByPath, setByPath, isNull, isFunction } = require('ntils');
class Context {
    constructor(processor, options) {
        this.invokeCount = 0;
        this.processor = processor;
        this.options = options;
    }
    isVariable(val) {
        return isString(val) && /^\$/.test(val);
    }
    trimVariable(name) {
        if (!name)
            return name;
        var str = name;
        if (str.length == 1 || /^\$\./.test(str))
            return str;
        return str.slice(1);
    }
    isOperation(val) {
        return isObject(val);
    }
    getParamsArray(params, variables) {
        if (!params)
            return [];
        return params.map(item => {
            if (!this.isVariable(item))
                return item;
            return getByPath(variables, this.trimVariable(item));
        });
    }
    getParamsMap(params, variables) {
        if (!params)
            return {};
        const values = {};
        each(params, (name, value) => {
            if (this.isVariable(value)) {
                values[name] = getByPath(variables, this.trimVariable(value));
            }
            values[name] = value;
        });
        return values;
    }
    getParams(params, variables) {
        if (!isArray(params) && !isObject(params))
            params = [params];
        if (isArray(params)) {
            return this.getParamsArray(params, variables);
        }
        else {
            return this.getParamsMap(params, variables);
        }
    }
    async parseOperation(operation, variables) {
        this.invokeCount++;
        const { invokeThreshold } = this.processor;
        if (this.invokeCount > invokeThreshold) {
            throw new Error(`Invoke exceeds the maximum limit ${invokeThreshold}.`);
        }
        const { action, params, fields } = operation;
        const paramValues = this.getParams(params, variables) || {};
        const { metadata } = this.options;
        const result = await this.processor.invoke(action, paramValues, metadata);
        return fields ? this.convertResult(result, fields, variables) : result;
    }
    //暂不允许在对象是调用函数（将来增加一个注解声明哪些可调用）
    // src.action = isFunction(val) ? (...args: Array<any>) => {
    //   return val.call(srcItem, ...args);
    // } : val;
    async convertField(srcItem, src, dstItem, dst, variables) {
        const newVariables = Object.assign({}, variables, { $: srcItem });
        if (this.isVariable(src)) {
            return getByPath(newVariables, this.trimVariable(src));
        }
        else if (this.isOperation(src)) {
            if (this.isVariable(src.action)) {
                src.action = getByPath(newVariables, this.trimVariable(src.action));
            }
            if (!src.action) {
                const val = getByPath(srcItem, dst);
                src.action = isFunction(val) ? {} : val || {};
            }
            return this.parseOperation(src, newVariables);
        }
        else {
            return getByPath(srcItem, String(src));
        }
    }
    async createFieldPending(srcItem, src, dstItem, dst, vars, ignores) {
        let val = await this.convertField(srcItem, src, dstItem, dst, vars);
        if (dst === '.' && !isObject(val)) {
            dstItem.__value__ = val;
        }
        else if (dst === '.') {
            each(val, (key, value) => {
                if (ignores.includes(key))
                    return;
                dstItem[key] = value;
            });
        }
        else if (!ignores.includes(dst)) {
            setByPath(dstItem, dst, val);
        }
        return dstItem;
    }
    async convertItem(srcItem, fields, vars) {
        if (!isObject(srcItem))
            return srcItem;
        const dstItem = {};
        const pendings = [];
        const ignores = [];
        each(fields, (dst, src) => {
            if (/^~/.test(dst))
                return;
            if (isNull(src) || src === true)
                src = dst;
            if (src === false)
                ignores.push(dst);
            pendings.push(this.createFieldPending(srcItem, src, dstItem, dst, vars, ignores));
        });
        await Promise.all(pendings);
        return '__value__' in dstItem ? dstItem.__value__ : dstItem;
    }
    convertResult(srcResult, fields, vars) {
        if (!srcResult || (!isObject(srcResult) && !isArray(srcResult))) {
            return srcResult;
        }
        if (isArray(srcResult)) {
            return Promise.all(srcResult
                .map(item => this.convertItem(item, fields, vars)));
        }
        return this.convertItem(srcResult, fields, vars);
    }
    execute() {
        const { operation, variables } = this.options;
        const operationObj = operation ?
            (isString(operation) ? yaml_1.default.parse(operation) : operation) : {};
        const variablesObj = variables ?
            (isString(variables) ? JSON.parse(variables) : variables) : {};
        return this.convertResult({}, operationObj, variablesObj);
    }
}
exports.Context = Context;
//# sourceMappingURL=Context.js.map