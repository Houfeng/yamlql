import axios from 'axios';
import { IClientOptions } from './IClientOptions';

export class YamlQlClient {
  private opiotns: IClientOptions;

  constructor(opiotns: IClientOptions) {
    this.opiotns = opiotns;
  }

  exec = (operation: string, variables?: any, options?: IClientOptions) => {
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

}

export default YamlQlClient;