import IProcessorOptions from './IProcessorOptions';
import IContextOptions from './IContextOptions';
import { Context } from './Context';
import IResolveOptions from './IResolveOptions';
import { Resolver } from './Resolver';
export default class Processor {
    private options;
    resolvers: Array<typeof Resolver>;
    constructor(options: IProcessorOptions);
    readonly docs: any;
    readonly resolveThreshold: number;
    private isPrevent;
    private findMethodFilter;
    private findMethodInfo;
    resolve(ctx: Context, options: IResolveOptions): any;
    process(options: IContextOptions): Promise<any>;
}
