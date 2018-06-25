import { Context } from "./Context";
import { isFunction } from "util";

export class Resolver {

  public static docs: any;
  private __context: Context;

  constructor(context: Context) {
    this.__context = context;
  }

  get context() {
    return this.__context;
  }

  static create(factory: Function | any): typeof Resolver {
    return (isFunction(factory) ? factory : function () {
      return factory;
    }) as typeof Resolver;
  }

}

export default Resolver;