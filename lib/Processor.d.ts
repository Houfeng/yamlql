import IProcessorOptions from './IProcessorOptions';
import IContextOptions from './IContextOptions';
import IInvokeOptions from './IInvokeOptions';
export default class Processor {
    private options;
    private builtIn;
    constructor(options: IProcessorOptions);
    readonly root: any;
    readonly docs: any;
    readonly invokeThreshold: number;
    invoke(options: IInvokeOptions): any;
    private exec(func, options);
    process(options: IContextOptions, client?: any): Promise<any>;
}
