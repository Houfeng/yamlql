import { IClientOptions } from './IClientOptions';
import { execQuery } from './execQuery';
import { execFile } from './execFile';


export class YamlQlClient {
  private opiotns: IClientOptions;

  constructor(opiotns: IClientOptions) {
    this.opiotns = opiotns;
  }

  execQuery = (query: string, variables?: any,
    options?: IClientOptions) => {
    const opts = Object.assign({}, this.opiotns, options);
    return execQuery(query, variables, opts);
  }

  execFile = async (queryFile: string, variables?: any,
    options?: IClientOptions) => {
    const opts = Object.assign({}, this.opiotns, options);
    return execFile(queryFile, variables, opts);
  }

  exec = (query: string, variables?: any, options?: IClientOptions) => {
    return query.startsWith('./') || query.startsWith('/') ?
      this.execFile(query, variables, options) :
      this.execQuery(query, variables, options);
  }

}

export default YamlQlClient;