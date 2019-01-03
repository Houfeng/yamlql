/// <reference types="koa" />
/// <reference types="koa-bodyparser" />
/// <reference types="koa-compose" />
import { IProcessorOptions } from 'yamlql';
export interface IServerOptions {
    prefix?: string;
    jsonpCallbackName?: string;
    processor: IProcessorOptions;
    onReady?: Function;
    errorStack?: boolean;
}
export default function middleware(options: IServerOptions): import("koa-compose").Middleware<import("koa").ParameterizedContext<any, {}>>;
