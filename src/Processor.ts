import yaml from './yaml';
import IProcessorOptions from './IProcessorOptions';
import IContextOptions from './IContextOptions';
import IMap from './IMap';
import { Context } from './Context';
import BuiltIn from './BuiltIn';

const debug = require('debug')('processor');
const {
  each, isString, isObject, isArray, getByPath, setByPath
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
    return this.options.invokeThreshold || 20;
  }

  public invoke(method: string, params: IMap | Array<any>): any {
    if (this.builtIn[method]) {
      return this.invokeOn(this.builtIn, method, params);
    }
    const { invoke } = this.options;
    if (invoke) return this.invoke(method, params);
    return this.invokeOn(this.root, method, params);
  }

  private invokeOn(owner: any, method: string, params: IMap | Array<any>) {
    const func: Function = owner[method];
    if (!func) throw new Error(`Cannt find '${method}'`);
    return func.apply(null, Object.values(params));
  }

  public async process(options: IContextOptions) {
    const context = new Context(this, options);
    return context.execute();
  }

}