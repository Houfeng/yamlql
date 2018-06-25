import IMap from './IMap';
export interface IResolveOptions {
    method: string | Function | any;
    params: IMap | Array<any>;
}
export default IResolveOptions;
