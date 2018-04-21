import {
  Router, NextFunction, RequestHandler, Request, Response
} from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { Processor, IProcessorOptions } from 'yamlql';

const router = Router();

export interface IServerOptions {
  jsonpCallbackName?: string,
  processor: IProcessorOptions,
  onReady?: Function,
  errorStack?: boolean
}

export class Client {
  req: Request;
  res: Response;
  request: Request;
  response: Response;
  constructor(req: Request, res: Response) {
    this.req = this.request = req;
    this.res = this.response = res;
  }
}

export default function middleware(options: IServerOptions): RequestHandler {

  const { jsonpCallbackName, onReady, errorStack } = options;
  const processor = new Processor(options.processor);

  //序列化
  function stringify(data: any, jsonpCallback?: string) {
    const text = JSON.stringify(data);
    return jsonpCallback ? `${jsonpCallback}(${text})` : text;
  }

  //处理响应
  function process(client: Client, data: any,
    next?: NextFunction, jsonpCallback?: string) {
    client.res.setHeader('Content-Type', 'application/json');
    return processor.process(data, client).then(result => {
      client.res.send(stringify(result, jsonpCallback));
      next();
    }).catch(err => {
      const error = errorStack ? {
        message: err.message,
        stack: err.stack
      } : err.message;
      client.res.send(stringify({ error }, jsonpCallback));
      next(err);
    });
  }

  //内容解析(post)
  router.post('/', bodyParser.json());
  router.post('/', bodyParser.urlencoded());

  //欢迎信息
  router.get('/', function (
    req: Request, res: Response, next: NextFunction) {
    const { query } = req;
    const client = new Client(req, res);
    if (query && query[jsonpCallbackName]) {
      return process(client, req.query, next, query[jsonpCallbackName]);
    }
    if (query && query.operation) {
      return process(client, req.query, next);
    }
    res.send('The YamlQL service is running');
    next();
  });

  //请求处理
  router.post('/', function (
    req: Request, res: Response, next: NextFunction) {
    process(new Client(req, res), req.body, next);
  });

  //文档服务
  router.get('/docs', function (
    req: Request, res: Response, next: NextFunction) {
    res.send(JSON.stringify(processor.docs));
    next();
  });

  //探查器
  const inspectorPath = require.resolve('yamlql-inspector');
  const inspectorRoot = path.resolve(inspectorPath, '../../');
  router.use('/inspector', express.static(inspectorRoot, {
    fallthrough: false
  }));

  if (onReady) onReady({ processor });

  return router;
}