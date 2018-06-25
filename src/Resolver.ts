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

}

export default Resolver;