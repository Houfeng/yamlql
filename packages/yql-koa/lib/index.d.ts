/// <reference types="koa-router" />
import * as Router from 'koa-router';
import { IProcessorOptions } from 'yamlql';
export interface IServerOptions {
    prefix?: string;
    jsonpCallbackName?: string;
    processor: IProcessorOptions;
    onReady?: Function;
    errorStack?: boolean;
}
export default function middleware(options: IServerOptions): Router.IMiddleware;
