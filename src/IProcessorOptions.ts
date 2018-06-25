import IResolveOptions from './IResolveOptions';
import { Resolver } from './Resolver';
import { Context } from './Context';

export interface IProcessorOptions {
  resolve?(ctx: Context, options: IResolveOptions): any;
  resolver?: typeof Resolver | any;
  docs?: any;
  resolveThreshold?: number;
}

export default IProcessorOptions;