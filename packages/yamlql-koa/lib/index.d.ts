/// <reference types="koa-router" />
import { Context } from 'koa';
import { IProcessorOptions } from 'yamlql';
export interface IServerOptions {
    prefix?: string;
    jsonpCallbackName?: string;
    processor: IProcessorOptions;
    onReady?: Function;
    errorStack?: boolean;
}
export default function middleware(options: IServerOptions): (context: Context, next: () => Promise<any>) => any;
