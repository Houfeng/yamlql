import { Resolver } from "./Resolver";

const {
  isNull, isArray, isString, formatDate, getByPath, setByPath
} = require('ntils');

export default class BuiltIn extends Resolver {

  public __get(obj: any, path: string) {
    return getByPath(obj, path);
  }

  public __set(obj: any, path: string, value: any) {
    return setByPath(obj, path, value);
  }

  public __slice(list: Array<any>, start: number, end: number) {
    if (!list) return list;
    if (!isArray(list)) return [];
    return list.slice(start, end);
  }

  public __limit(list: Array<any>, skip: number, limit: number) {
    if (!list) return list;
    if (!isArray(list)) return [];
    return list.slice(skip, skip + limit);
  }

  public __reverse(list: Array<any>) {
    if (!list) return list;
    if (!isArray(list)) return [];
    return list.reverse();
  }

  public __concat(list: Array<any>, ...args: Array<any>) {
    if (!list) return list;
    if (!isArray(list)) return [];
    return list.concat(list, ...args);
  }

  public __keys(obj: any) {
    return Object.keys(obj);
  }

  public __values(obj: any) {
    return Object.values(obj);
  }

  public __find(list: Array<any>, name: string, value: any) {
    if (!list || !isArray(list)) return;
    return list.find(item => item === name) ||
      list.find(item => item[name] === value);
  }

  public __filter(list: Array<any>, name: string, value: any) {
    if (!list || !isArray(list)) return [];
    return isNull(value) ? list.filter(item => item === name)
      : list.filter(item => item[name] === value);
  }

  public __join(list: Array<string>, split: string) {
    if (!list) return '';
    if (!isArray(list)) return list;
    return list.join(split);
  }

  public __split(str: string, split: string) {
    if (!str) return str;
    if (!isString(str)) return [str];
    return str.split(split);
  }

  public __substr(str: string, start: number, length: number) {
    if (!str) return str;
    return str.substr(start, length);
  }

  public __substring(str: string, start: number, end: number) {
    if (!str) return str;
    return str.substring(start, end);
  }

  public __number(str: string) {
    return Number(str);
  }

  public __string(obj: any) {
    if (!obj) return String(obj);
    return obj.toString();
  }

  public __boolean(obj: any) {
    return Boolean(obj);
  }

  public __date(date: any, format?: string) {
    return format ? formatDate(date, format) : date;
  }

  public __parse(str: string) {
    try {
      return JSON.parse(str);
    } catch{
      return;
    }
  }

  public __stringify(obj: any) {
    return JSON.stringify(obj);
  }

  public __merge(...args: Array<any>) {
    return Object.assign({}, ...args);
  }

  public __object(...args: Array<any>) {
    return Object.assign({}, ...args);
  }

  public __array(array: any) {
    if (!array) return array;
    if (!('length' in array)) array.length = Object.keys(array).length;
    return [].slice.call(array);
  }

  public __value(value: any) {
    return value;
  }

}