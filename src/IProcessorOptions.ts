import IMap from './IMap';

export interface IProcessorOptions {
  invoke?(method: string, params: IMap | Array<any>, request: any): any;
  root?: any;
  docs?: any;
  invokeThreshold?: number;
  builtIn?: any;
}

export default IProcessorOptions;