import { safeLoad } from 'js-yaml';

export function parse(text: string): any {
  return safeLoad(text);
}

export default { parse };