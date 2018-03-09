/// <reference types="express" />
import { RequestHandler } from 'express';
import { IProcessorOptions } from 'yamlql';
export interface IServerOptions {
    jsonpCallbackName?: string;
    processor: IProcessorOptions;
}
export default function middleware(options: IServerOptions): RequestHandler;
