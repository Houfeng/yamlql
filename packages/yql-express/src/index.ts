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
  processor: IProcessorOptions
}

export default function middleware(options: IServerOptions): RequestHandler {

  const { jsonpCallbackName } = options;
  const processor = new Processor(options.processor);

  //序列化
  function stringify(data: any, jsonpCallback?: string) {
    const text = JSON.stringify(data);
    return jsonpCallback ? `${jsonpCallback}(${text})` : text;
  }

  //处理响应
  function process(res: Response, data: any,
    next?: NextFunction, jsonpCallback?: string) {
    res.setHeader('Content-Type', 'application/json');
    return processor.process(data).then(result => {
      res.send(stringify(result, jsonpCallback));
      next();
    }).catch(err => {
      res.send(stringify({ error: err.message }, jsonpCallback));
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
    if (query && query[jsonpCallbackName]) {
      return process(res, req.query, next, query[jsonpCallbackName]);
    }
    if (query && query.operation) {
      return process(res, req.query, next);
    }
    res.send('The YamlQL service is running');
    next();
  });

  //请求处理
  router.post('/', function (
    req: Request, res: Response, next: NextFunction) {
    process(res, req.body, next);
  });

  //文档服务
  router.get('/docs', function (
    req: Request, res: Response, next: NextFunction) {
    res.send(JSON.stringify(processor.docs));
    next();
  });

  //探查器
  const inspectorPath = require.resolve('yql-inspector');
  const inspectorRoot = path.resolve(inspectorPath, '../../');
  router.use('/inspector', express.static(inspectorRoot, {
    fallthrough: false
  }));

  return router;
}