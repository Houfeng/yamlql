export default class BuiltIn {
    _map(arg: any): any;
    _slice(list: Array<any>, start: number, end: number): any[];
    _limit(list: Array<any>, skip: number, limit: number): any[];
    _reverse(list: Array<any>): any[];
    _concat(list: Array<any>, ...args: Array<any>): any[];
    _keys(obj: any): string[];
    _values(obj: any): {}[];
    _find(list: Array<any>, name: string, value: any): any;
    _filter(list: Array<any>, name: string, value: any): any[];
    _join(list: Array<string>, split: string): string | string[];
    _split(str: string, split: string): string | string[];
    _substr(str: string, start: number, length: number): string;
    _substring(str: string, start: number, end: number): string;
    _number(str: string): number;
    _string(obj: any): any;
    _boolean(obj: any): boolean;
    _date(obj: any, format?: string): any;
    _parse(str: string): any;
    _stringify(obj: any): string;
    _merge(...args: Array<any>): any;
    _object(...args: Array<any>): any;
    _array(array: any): any;
    _value(value: any): any;
}
