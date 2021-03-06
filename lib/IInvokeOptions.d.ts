import IMap from './IMap';
export interface IInvokeOptions {
    method: string | Function | any;
    params: IMap | Array<any>;
}
export default IInvokeOptions;
