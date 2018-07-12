import { IClientOptions } from './IClientOptions';
export declare class YamlQlClient {
    private opiotns;
    constructor(opiotns: IClientOptions);
    execQuery: (query: string, variables?: any, options?: IClientOptions) => Promise<any>;
    execFile: (queryFile: string, variables?: any, options?: IClientOptions) => Promise<any>;
    exec: (query: string, variables?: any, options?: IClientOptions) => Promise<any>;
}
export default YamlQlClient;
