import Processor from './Processor';
import IContextOptions from './IContextOptions';
export declare class Context {
    private processor;
    private options;
    private client;
    private invokeCount;
    constructor(processor: Processor, options: IContextOptions, client: any);
    private isVariable(val);
    private trimVariable(name);
    private isOperation(val);
    private getParamsArray(params, variables);
    private getParamsMap(params, variables);
    private getParams(params, variables);
    private parseOperation(operation, variables);
    private convertField(srcItem, src, dstItem, dst, variables);
    private createFieldPending(srcItem, src, dstItem, dst, vars, ignores);
    private convertItem(srcItem, fields, vars);
    private convertResult(srcResult, fields, vars);
    execute(): any;
}
