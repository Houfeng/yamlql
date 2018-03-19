import yaml from './yaml';
import IProcessorOptions from './IProcessorOptions';
import IContextOptions from './IContextOptions';
import { Context } from './Context';
import IInvokeOptions from './IInvokeOptions';
import BuiltIn from './BuiltIn';

const debug = require('debug')('processor');
const {
  each, isString, isObject, isArray, getByPath, isFunction
} = require('ntils');

export default class Processor {

  private options: IProcessorOptions;
  private builtIn: any;

  constructor(options: IProcessorOptions) {
    this.options = Object.assign({}, options);
    this.builtIn = new BuiltIn();
    Object.assign(this.builtIn, this.options.builtIn);
  }

  public get root() {
    return this.options.root || {};
  }

  public get docs() {
    return this.options.docs || this.root.__docs__ || {};
  }

  public get invokeThreshold() {
    return this.options.invokeThreshold || 100;
  }

  public invoke(options: IInvokeOptions): any {
    const { method, params, metadata } = options;
    //如果 action 是对象直接返回当作结果
    if (isObject(method)) return method;
    //如果是函数，执行并返回结果
    if (isFunction(method)) return this.invokeOn(null, options);
    //如果是内建函数，执行内建函数并返回结果
    if (this.builtIn[method]) {
      return this.invokeOn(this.builtIn, options);
    }
    //如果构造 processor 时指定了 invoke，调用 invoke 执行
    const { invoke } = this.options;
    if (invoke) return invoke(options);
    //最后在 this.root 上执行
    return this.invokeOn(this.root, options);
  }

  private invokeOn(owner: any, options: IInvokeOptions) {
    const { method, params } = options;
    const func: Function = isString(method) ?
      getByPath(owner, method as string) : method;
    if (!func || !func.apply) {
      throw new Error(`Cannt find method '${method}'`);
    }
    return func.apply(options, Object.values(params));
  }

  public async process(options: IContextOptions, client?: any) {
    const context = new Context(this, options, client);
    return context.execute();
  }

}