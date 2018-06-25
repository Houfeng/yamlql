import IProcessorOptions from './IProcessorOptions';
import IContextOptions from './IContextOptions';
import { Context } from './Context';
import IResolveOptions from './IResolveOptions';
import { Resolver } from './Resolver';
import BuiltIn from './builtIn';
import { IMap } from './IMap';

const debug = require('debug')('processor');
const { isNull, isObject, getByPath, isFunction } = require('ntils');

const prevents = (() => {
  const map: IMap = { prototype: true, arguments: true, caller: true };
  Object.getOwnPropertyNames(({} as any).__proto__)
    .forEach(name => map[name] = true);
  return map;
})();

export default class Processor {

  private options: IProcessorOptions;
  public resolvers: Array<typeof Resolver> = [BuiltIn];

  constructor(options: IProcessorOptions) {
    this.options = Object.assign({}, options);
    this.resolvers.unshift(this.options.resolver);
    debug('constructor', options);
  }

  public get docs() {
    const { docs, resolver } = this.options;
    return docs || (resolver && resolver.docs) || {};
  }

  public get resolveThreshold() {
    return this.options.resolveThreshold || 100;
  }

  private isPrevent(value: any, name?: string) {
    return (name && prevents[name]) || value instanceof Context ||
      value instanceof Processor || value == Function.call ||
      value == Function.bind || value == Function.apply;
  }

  private findMethodFilter = (value: any, name: string) => {
    return this.isPrevent(value, name) ? null : value;
  }

  private findMethodInfo(ctx: Context, method: string | Function) {
    if (isFunction(method)) return { func: method, scope: null };
    for (let i = 0; i < ctx.resolvers.length; i++) {
      const resolver = ctx.resolvers[i];
      if (!resolver) continue;
      const path = (method as string).split('.');
      const name = path.pop();
      const scope = getByPath(resolver, path.join('.'),
        this.findMethodFilter);
      if (!scope || this.isPrevent(scope)) continue;
      const func = scope[name];
      if (!func || !isFunction(func) || this.isPrevent(func, name)) continue;
      return { func, scope };
    }
  }

  public resolve(ctx: Context, options: IResolveOptions): any {
    const { method, params } = options;
    debug('resolve', options);
    //如果 action 是对象直接返回当作结果
    if (isObject(method) || isNull(method)) return method;
    //如果是函数直接执行，并返回结果，然后从 resolver 上查找，如果找到执行并返回
    const methodInfo = this.findMethodInfo(ctx, method);
    if (methodInfo) {
      const { func, scope } = methodInfo;
      const values = Object.values(params);
      return func.call(scope, values);
    }
    //如果构造 processor 时指定了 resolve resolve 执行
    if (this.options.resolve) {
      return this.options.resolve(ctx, options);
    }
    //抛出找不到 resolve 方法的异常
    throw new Error(`Cannt find method '${method}'`);
  }

  public async process(options: IContextOptions) {
    debug('process', options);
    const context = new Context(this, options);
    return context.execute();
  }

}