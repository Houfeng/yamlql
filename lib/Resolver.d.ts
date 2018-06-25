import { Context } from "./Context";
export declare class Resolver {
    static docs: any;
    private __context;
    constructor(context: Context);
    readonly context: Context;
    static create(factory: Function | any): typeof Resolver;
}
export default Resolver;
