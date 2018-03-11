export default class BuiltIn {
    __map(arg: any): any;
    __slice(list: Array<any>, start: number, end: number): any[];
    __limit(list: Array<any>, skip: number, limit: number): any[];
    __reverse(list: Array<any>): any[];
    __concat(list: Array<any>, ...args: Array<any>): any[];
    __keys(obj: any): string[];
    __values(obj: any): {}[];
    __find(list: Array<any>, name: string, value: any): any;
    __filter(list: Array<any>, name: string, value: any): any[];
    __join(list: Array<string>, split: string): string | string[];
    __split(str: string, split: string): string | string[];
    __substr(str: string, start: number, length: number): string;
    __substring(str: string, start: number, end: number): string;
    __number(str: string): number;
    __string(obj: any): any;
    __boolean(obj: any): boolean;
    __parse(str: string): any;
    __stringify(obj: any): string;
    __merge(...args: Array<any>): any;
    __object(...args: Array<any>): any;
    __array(array: any): any;
}
