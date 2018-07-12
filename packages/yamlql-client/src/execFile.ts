import * as fs from 'fs';
import * as path from 'path';
import { IClientOptions } from './IClientOptions';
import { execQuery } from './execQuery';

delete require.cache[__filename];
const parentFile = module.parent.filename;
const parentDir = path.dirname(parentFile);

function readFile(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: 'utf-8' }, (err: Error, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export async function execFile(queryFile: string, variables?: any,
  options?: IClientOptions) {
  if (!queryFile.endsWith('.yql')) queryFile += '.yql';
  const filename = path.resolve(parentDir, queryFile);
  const operation = await readFile(filename);
  return execQuery(operation, variables, options);
}