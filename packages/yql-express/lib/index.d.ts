/// <reference types="express" />
import { RequestHandler } from 'express';
export interface IServerOptions {
}
export default function middleware(options: IServerOptions): RequestHandler;
