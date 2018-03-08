"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const yaml_1 = __importDefault(require("./yaml"));
const debug = require('debug')('context');
const { each, isString, isObject, isArray, getByPath, setByPath, isNull } = require('ntils');
class Context {
    constructor(processor, options) {
        this.invokeCount = 0;
        this.processor = processor;
        this.options = options;
    }
    isVariable(value) {
        return isString(value) && /^\$/.test(value);
    }
    isOperation(value) {
        return isObject(value);
    }
    getParamsArray(params, variables) {
        if (!params)
            return [];
        return params.map(item => {
            if (!this.isVariable(item))
                return item;
            return getByPath(variables, item.slice(1));
        });
    }
    getParamsMap(params, variables) {
        if (!params)
            return {};
        const values = {};
        each(params, (name, value) => {
            if (this.isVariable(value)) {
                values[name] = getByPath(variables, value.slice(1));
            }
            values[name] = value;
        });
        return values;
    }
    getParams(params, variables) {
        if (isString(params))
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
            throw new Error(`The maximum number of invoke cannot exceed ${invokeThreshold}`);
        }
        const { action, params, fields } = operation;
        const paramValues = this.getParams(params, variables);
        const result = await this.processor.invoke(action, paramValues || {});
        return fields ? this.convertResult(result, fields, variables) : result;
    }
    async convertField(srcItem, src, dst, variables) {
        if (this.isVariable(src)) {
            return getByPath(variables, src.slice(1));
        }
        else if (this.isOperation(src)) {
            if (!src.action)
                src.action = dst;
            const newVariables = Object.assign({}, variables, { parent: srcItem });
            return this.parseOperation(src, newVariables);
        }
        else if (isString(src)) {
            return getByPath(srcItem, src);
        }
        else {
            return src;
        }
    }
    async convertItem(srcItem, fields, variables) {
        if (!isObject(srcItem))
            return srcItem;
        const dstItem = {};
        const pendings = [];
        each(fields, (dst, src) => {
            if (/^~/.test(dst))
                return;
            if (isNull(src) || src === true)
                src = dst;
            const pending = (async () => {
                let value = await this.convertField(srcItem, src, dst, variables);
                if (dst === '.') {
                    Object.assign(dstItem, value);
                }
                else {
                    setByPath(dstItem, dst, value);
                }
            })();
            pendings.push(pending);
        });
        await Promise.all(pendings);
        return dstItem;
    }
    convertResult(srcResult, fields, variables) {
        if (!srcResult || (!isObject(srcResult) && !isArray(srcResult))) {
            return srcResult;
        }
        if (isArray(srcResult)) {
            return Promise.all(srcResult
                .map(item => this.convertItem(item, fields, variables)));
        }
        return this.convertItem(srcResult, fields, variables);
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