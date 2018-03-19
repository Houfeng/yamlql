import IMap from './IMap';

export interface IInvokeOptions {
  method: string | Function | any,
  params: IMap | Array<any>,
  metadata?: any,
  client?: any
}

export default IInvokeOptions;