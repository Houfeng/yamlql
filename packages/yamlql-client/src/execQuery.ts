import axios from '_axios@0.18.0@axios';
import { IClientOptions } from './IClientOptions';

axios.defaults.withCredentials = true;

export function execQuery(query: string, variables?: any,
  options?: IClientOptions) {
  const { endpoint = '/yamlql', metadata } = options;
  const data = {
    operation: query,
    variables: JSON.stringify(variables),
    metadata: JSON.stringify(metadata)
  };
  return axios.post(endpoint, data, options as any).then(rs => rs.data);
}
