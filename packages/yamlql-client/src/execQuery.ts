import axios from 'axios';
import { IClientOptions } from './IClientOptions';

const instance = axios.create({
  xsrfCookieName: 'QXSRF-TOKEN',
  xsrfHeaderName: 'QXSRF-TOKEN',
  withCredentials: true,
});

export function execQuery(operation: string | any, variables?: any,
  options?: IClientOptions) {
  const { endpoint = '/yamlql', metadata } = options;
  const data = { operation, variables, metadata };
  return instance.post(endpoint, data, options as any)
    .then(rs => rs.data);
}
