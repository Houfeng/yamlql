import { IClientOptions } from './IClientOptions';
export declare class YamlQlClient {
    private opiotns;
    constructor(opiotns: IClientOptions);
    execQuery: (query: string, variables?: any, options?: IClientOptions) => Promise<any>;
    execFile: (queryFile: string, variables?: any, options?: IClientOptions, resolveDir?: string) => Promise<any>;
    exec: (query: any, variables?: any, options?: IClientOptions) => Promise<any>;
}
export default YamlQlClient;
