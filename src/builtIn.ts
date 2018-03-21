const { isNull, iArray, isString, formatDate } = require('ntils');

export default class BuiltIn {

  // map 直接返回就行，YamlQL 本身即可能 map
  public _map(arg: any) {
    return arg;
  }

  public _slice(list: Array<any>, start: number, end: number) {
    if (!list) return list;
    if (!iArray(list)) return [];
    return list.slice(start, end);
  }

  public _limit(list: Array<any>, skip: number, limit: number) {
    if (!list) return list;
    if (!iArray(list)) return [];
    return list.slice(skip, skip + limit);
  }

  public _reverse(list: Array<any>) {
    if (!list) return list;
    if (!iArray(list)) return [];
    return list.reverse();
  }

  public _concat(list: Array<any>, ...args: Array<any>) {
    if (!list) return list;
    if (!iArray(list)) return [];
    return list.concat(list, ...args);
  }

  public _keys(obj: any) {
    return Object.keys(obj);
  }

  public _values(obj: any) {
    return Object.values(obj);
  }

  public _find(list: Array<any>, name: string, value: any) {
    if (!list || !iArray(list)) return;
    return list.find(item => item === name) ||
      list.find(item => item[name] === value);
  }

  public _filter(list: Array<any>, name: string, value: any) {
    if (!list || !iArray(list)) return [];
    return isNull(value) ? list.filter(item => item === name)
      : list.filter(item => item[name] === value);
  }

  public _join(list: Array<string>, split: string) {
    if (!list) return '';
    if (!iArray(list)) return list;
    return list.join(split);
  }

  public _split(str: string, split: string) {
    if (!str) return str;
    if (!isString(str)) return [str];
    return str.split(split);
  }

  public _substr(str: string, start: number, length: number) {
    if (!str) return str;
    return str.substr(start, length);
  }

  public _substring(str: string, start: number, end: number) {
    if (!str) return str;
    return str.substring(start, end);
  }

  public _number(str: string) {
    return Number(str);
  }

  public _string(obj: any) {
    if (!obj) return String(obj);
    return obj.toString();
  }

  public _boolean(obj: any) {
    return Boolean(obj);
  }

  public _date(obj: any, format?: string) {
    const date = new Date(obj);
    return format ? formatDate(date, format) : date;
  }

  public _parse(str: string) {
    try {
      return JSON.parse(str);
    } catch{
      return;
    }
  }

  public _stringify(obj: any) {
    return JSON.stringify(obj);
  }

  public _merge(...args: Array<any>) {
    return Object.assign({}, ...args);
  }

  public _object(...args: Array<any>) {
    return Object.assign({}, ...args);
  }

  public _array(array: any) {
    if (!array) return array;
    if (!('length' in array)) array.length = Object.keys(array).length;
    return [].slice.call(array);
  }

  public _value(value: any) {
    return value;
  }

}