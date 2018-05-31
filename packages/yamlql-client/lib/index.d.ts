import { IClientOptions } from './IClientOptions';
export declare class YamlQlClient {
    private opiotns;
    constructor(opiotns: IClientOptions);
    exec: (operation: string, variables?: any, options?: IClientOptions) => Promise<any>;
}
export default YamlQlClient;
