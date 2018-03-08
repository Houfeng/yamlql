import Processor from './Processor';
import IContextOptions from './IContextOptions';
import yaml from './yaml';
import IMap from './IMap';

const debug = require('debug')('context');
const {
  each, isString, isObject, isArray, getByPath, setByPath, isNull
} = require('ntils');

export class Context {

  private processor: Processor;
  private options: IContextOptions;
  private invokeCount: number = 0;

  constructor(processor: Processor, options: IContextOptions) {
    this.processor = processor;
    this.options = options;
  }

  private isVariable(value: any): boolean {
    return isString(value) && /^\$/.test(value as string);
  }

  private isOperation(value: any): boolean {
    return isObject(value);
  }

  private getParamsArray(params: Array<any>, variables: any): Array<any> {
    if (!params) return [];
    return params.map(item => {
      if (!this.isVariable(item)) return item;
      return getByPath(variables, (item as string).slice(1));
    });
  }

  private getParamsMap(params: IMap, variables: any): IMap {
    if (!params) return {};
    const values: IMap = {};
    each(params, (name: string, value: any) => {
      if (this.isVariable(value)) {
        values[name] = getByPath(variables, (value as string).slice(1));
      }
      values[name] = value;
    });
    return values;
  }

  private getParams(params: any, variables: any): IMap | Array<any> {
    if (isString(params)) params = [params];
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
      throw new Error(
        `The maximum number of invoke cannot exceed ${invokeThreshold}`
      );
    }
    const { action, params, fields } = operation;
    const paramValues = this.getParams(params, variables);
    const result = await this.processor.invoke(action, paramValues || {});
    return fields ? this.convertResult(result, fields, variables) : result;
  }

  private async convertField(
    srcItem: any, src: any, dst: string, variables: any
  ) {
    if (this.isVariable(src)) {
      return getByPath(variables, (src as string).slice(1));
    } else if (this.isOperation(src)) {
      if (!src.action) src.action = dst;
      const newVariables = Object.assign({}, variables,
        { parent: srcItem });
      return this.parseOperation(src, newVariables);
    } else if (isString(src)) {
      return getByPath(srcItem, src);
    } else {
      return src;
    }
  }

  private async convertItem(srcItem: any, fields: any, variables: any) {
    if (!isObject(srcItem)) return srcItem;
    const dstItem: any = {};
    const pendings: Array<Promise<any>> = [];
    each(fields, (dst: string, src: any) => {
      if (/^~/.test(dst)) return;
      if (isNull(src) || src === true) src = dst;
      const pending = (async () => {
        let value = await this.convertField(srcItem, src, dst, variables);
        if (dst === '.') {
          Object.assign(dstItem, value);
        } else {
          setByPath(dstItem, dst, value);
        }
      })();
      pendings.push(pending);
    });
    await Promise.all(pendings);
    return dstItem;
  }

  private convertResult(srcResult: any, fields: any, variables: any) {
    if (!srcResult || (!isObject(srcResult) && !isArray(srcResult))) {
      return srcResult;
    }
    if (isArray(srcResult)) {
      return Promise.all((srcResult as Array<any>)
        .map(item => this.convertItem(item, fields, variables)));
    }
    return this.convertItem(srcResult, fields, variables);
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