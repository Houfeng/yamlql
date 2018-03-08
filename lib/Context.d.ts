import Processor from './Processor';
import IContextOptions from './IContextOptions';
export declare class Context {
    private processor;
    private options;
    private invokeCount;
    constructor(processor: Processor, options: IContextOptions);
    private isVariable(value);
    private isOperation(value);
    private getParamsArray(params, variables);
    private getParamsMap(params, variables);
    private getParams(params, variables);
    private parseOperation(operation, variables);
    private convertField(srcItem, src, dst, variables);
    private convertItem(srcItem, fields, variables);
    private convertResult(srcResult, fields, variables);
    execute(): any;
}
