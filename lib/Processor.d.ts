import IProcessorOptions from './IProcessorOptions';
import IContextOptions from './IContextOptions';
import IMap from './IMap';
export default class Processor {
    private options;
    private builtIn;
    constructor(options: IProcessorOptions);
    readonly root: any;
    readonly docs: any;
    readonly invokeThreshold: number;
    invoke(method: string, params: IMap | Array<any>): any;
    private invokeOn(owner, method, params);
    process(options: IContextOptions): Promise<any>;
}
