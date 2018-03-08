import yaml from './yaml';
import IProcessorOptions from './IProcessorOptions';
import IContextOptions from './IContextOptions';
import IMap from './IMap';
import { Context } from './Context';
import BuiltIn from './BuiltIn';

const debug = require('debug')('processor');
const {
  each, isString, isObject, isArray, getByPath, setByPath, isFunction
} = require('ntils');

export default class Processor {

  private options: IProcessorOptions;
  private builtIn: any;

  constructor(options: IProcessorOptions) {
    this.options = Object.assign({}, options);
    this.builtIn = new BuiltIn();
  }

  public get root() {
    return this.options.root || {};
  }

  public get docs() {
    return this.options.docs || {};
  }

  public get invokeThreshold() {
    return this.options.invokeThreshold || 100;
  }

  public invoke(method: string | Function | any, params: IMap | Array<any>)
    : any {
    if (isObject(method)) return method;
    if (isFunction(method)) return this.invokeOn(null, method, params);
    if (this.builtIn[method]) {
      return this.invokeOn(this.builtIn, method, params);
    }
    const { invoke } = this.options;
    if (invoke) return this.invoke(method, params);
    return this.invokeOn(this.root, method, params);
  }

  private invokeOn(owner: any, method: string | Function,
    params: IMap | Array<any>) {
    const func: Function = isString(method) ? owner[method as string] : method;
    if (!func || !func.apply) throw new Error(`Cannt find method '${method}'`);
    return func.apply(owner, Object.values(params));
  }

  public async process(options: IContextOptions) {
    const context = new Context(this, options);
    return context.execute();
  }

}