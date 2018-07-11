import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { IClientOptions } from './IClientOptions';

delete require.cache[__filename];
const parentFile = module.parent.filename;
const parentDir = path.dirname(parentFile);

axios.defaults.withCredentials = true;

function readFile(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: 'utf-8' }, (err: Error, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export class YamlQlClient {
  private opiotns: IClientOptions;

  constructor(opiotns: IClientOptions) {
    this.opiotns = opiotns;
  }

  execQuery = (operation: string, variables?: any,
    options?: IClientOptions) => {
    const opts = Object.assign({}, this.opiotns, options);
    const { endpoint = '/yamlql', metadata } = opts;
    const data = {
      operation: operation,
      variables: JSON.stringify(variables),
      metadata: JSON.stringify(metadata)
    };
    return axios.post(endpoint, data, opts as any)
      .then((rs: any) => rs.data);
  }

  execFile = async (queryFile: string, variables?: any,
    options?: IClientOptions) => {
    if (!queryFile.endsWith('.yql')) queryFile += '.yql';
    const filename = path.resolve(parentDir, queryFile);
    const operation = await readFile(filename);
    return this.execQuery(operation, variables, options);
  }

  exec = (query: string, variables?: any, options?: IClientOptions) => {
    return query.startsWith('./') || query.startsWith('/') ?
      this.execFile(query, variables, options) :
      this.execQuery(query, variables, options);
  }

}

export default YamlQlClient;