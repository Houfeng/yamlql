import IMap from './IMap';

export interface IProcessorOptions {
  invoke?(method: string, params: IMap | Array<any>): any;
  root?: any;
  docs?: any;
  invokeThreshold?: number;
}

export default IProcessorOptions;