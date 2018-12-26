import { IClientOptions } from './IClientOptions';
import { execQuery } from './execQuery';
import { execFile } from './execFile';

const { isString } = require('ntils');

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
    options?: IClientOptions, resolveDir?: string) => {
    const opts = Object.assign({}, this.opiotns, options);
    return execFile(queryFile, variables, opts, resolveDir);
  }

  exec = (query: string | any, variables?: any, options?: IClientOptions) => {
    const isQueryFile = isString(query) &&
      (query.startsWith('./') || query.startsWith('/'));
    return isQueryFile ?
      this.execFile(query, variables, options) :
      this.execQuery(query, variables, options);
  }

}

export default YamlQlClient;