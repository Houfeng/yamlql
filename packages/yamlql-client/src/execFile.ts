import * as fs from 'fs';
import * as path from 'path';
import { IClientOptions } from './IClientOptions';
import { execQuery } from './execQuery';

delete require.cache[__filename];
const callerFile = module.parent.parent.filename;
const callerDir = path.dirname(callerFile);

function readFile(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: 'utf-8' }, (err: Error, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export async function execFile(queryFile: string, variables?: any,
  options?: IClientOptions, resolveDir: string = callerDir) {
  if (!queryFile.endsWith('.yql')) queryFile += '.yql';
  resolveDir = resolveDir || callerDir;
  const filename = path.resolve(resolveDir, queryFile);
  const operation = await readFile(filename);
  return execQuery(operation, variables, options);
}