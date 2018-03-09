import Processor from './Processor';
import IContextOptions from './IContextOptions';
import yaml from './yaml';
import IMap from './IMap';

const debug = require('debug')('context');
const {
  each, isString, isObject, isArray, getByPath, setByPath, isNull, isFunction
} = require('ntils');

export class Context {

  private processor: Processor;
  private options: IContextOptions;
  private invokeCount: number = 0;

  constructor(processor: Processor, options: IContextOptions) {
    this.processor = processor;
    this.options = options;
  }

  private isVariable(val: any): boolean {
    return isString(val) && /^\$/.test(val as string);
  }

  private trimVariable(name: any): string {
    if (!name) return name;
    var str = name as string;
    if (str.length == 1 || /^\$\./.test(str)) return str;
    return str.slice(1);
  }

  private isOperation(val: any): boolean {
    return isObject(val);
  }

  private getParamsArray(params: Array<any>, variables: any): Array<any> {
    if (!params) return [];
    return params.map(item => {
      if (!this.isVariable(item)) return item;
      return getByPath(variables, this.trimVariable(item));
    });
  }

  private getParamsMap(params: IMap, variables: any): IMap {
    if (!params) return {};
    const values: IMap = {};
    each(params, (name: string, value: any) => {
      if (this.isVariable(value)) {
        values[name] = getByPath(variables, this.trimVariable(value));
      }
      values[name] = value;
    });
    return values;
  }

  private getParams(params: any, variables: any): IMap | Array<any> {
    if (!isArray(params) && !isObject(params)) params = [params];
    if (isArray(params)) {
      return this.getParamsArray(params as Array<any>, variables);
    } else {
      return this.getParamsMap(params as IMap, variables);
    }
  }

  private async parseOperation(operation: any, variables: any) {
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
  private async convertField(srcItem: any, src: any,
    dstItem: any, dst: string, variables: any) {
    const newVariables = Object.assign({}, variables, { $: srcItem });
    if (this.isVariable(src)) {
      return getByPath(newVariables, this.trimVariable(src));
    } else if (this.isOperation(src)) {
      if (this.isVariable(src.action)) {
        src.action = getByPath(newVariables, this.trimVariable(src.action));
      }
      if (!src.action) {
        const val = getByPath(srcItem, dst);
        src.action = isFunction(val) ? {} : val || {};
      }
      return this.parseOperation(src, newVariables);
    } else if (isString(src)) {
      return getByPath(srcItem, src);
    } else {
      return src;
    }
  }

  private async createFieldPending(srcItem: any, src: any,
    dstItem: any, dst: string, vars: any, ignores: Array<string>) {
    let val = await this.convertField(srcItem, src, dstItem, dst, vars);
    if (dst === '.' && !isObject(val)) {
      dstItem.__value__ = val;
    } else if (dst === '.') {
      each(val, (key: string, value: any) => {
        if (ignores.includes(key)) return;
        dstItem[key] = value;
      });
    } else if (!ignores.includes(dst)) {
      setByPath(dstItem, dst, val);
    }
    return dstItem;
  }

  private async convertItem(srcItem: any, fields: any, vars: any) {
    if (!isObject(srcItem)) return srcItem;
    const dstItem: any = {};
    const pendings: Array<Promise<any>> = [];
    const ignores: Array<string> = [];
    each(fields, (dst: string, src: any) => {
      if (/^~/.test(dst)) return;
      if (isNull(src) || src === true) src = dst;
      if (src === false) ignores.push(dst);
      pendings.push(this.createFieldPending(
        srcItem, src, dstItem, dst, vars, ignores
      ));
    });
    await Promise.all(pendings);
    return '__value__' in dstItem ? dstItem.__value__ : dstItem;
  }

  private convertResult(srcResult: any, fields: any, vars: any) {
    if (!srcResult || (!isObject(srcResult) && !isArray(srcResult))) {
      return srcResult;
    }
    if (isArray(srcResult)) {
      return Promise.all((srcResult as Array<any>)
        .map(item => this.convertItem(item, fields, vars)));
    }
    return this.convertItem(srcResult, fields, vars);
  }

  execute() {
    const { operation, variables } = this.options;
    const operationObj = operation ?
      (isString(operation) ? yaml.parse(operation as string) : operation) : {};
    const variablesObj = variables ?
      (isString(variables) ? JSON.parse(variables as string) : variables) : {};
    return this.convertResult({}, operationObj, variablesObj);
  }

}