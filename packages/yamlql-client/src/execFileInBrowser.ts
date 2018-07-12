import { IClientOptions } from './IClientOptions';

export async function execFile(queryFile: string, variables?: any,
  options?: IClientOptions) {
  throw new Error(`Do not execute the file "${queryFile}" in the browser`);
}