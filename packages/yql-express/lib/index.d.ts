/// <reference types="express" />
import { RequestHandler, Request, Response } from 'express';
import { IProcessorOptions } from 'yamlql';
export interface IServerOptions {
    jsonpCallbackName?: string;
    processor: IProcessorOptions;
    onReady?: Function;
    errorStack?: boolean;
}
export declare class Client {
    req: Request;
    res: Response;
    request: Request;
    response: Response;
    constructor(req: Request, res: Response);
}
export default function middleware(options: IServerOptions): RequestHandler;
