import IInvokeOptions from './IInvokeOptions';

export interface IProcessorOptions {
  invoke?(options: IInvokeOptions): any;
  root?: any;
  docs?: any;
  invokeThreshold?: number;
  builtIn?: any;
}

export default IProcessorOptions;