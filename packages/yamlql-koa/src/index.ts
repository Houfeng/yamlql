import * as path from 'path';
import { Context } from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { Processor, IProcessorOptions, YamQLError } from 'yamlql';
import * as send from 'koa-send';

export interface IServerOptions {
  prefix?: string;
  jsonpCallbackName?: string;
  processor: IProcessorOptions;
  onReady?: Function;
  errorStack?: boolean;
}

export default function middleware(options: IServerOptions) {

  const router = new Router();
  const { jsonpCallbackName, onReady, errorStack } = options;
  const processor = new Processor(options.processor);

  //序列化
  function stringify(data: any, jsonpCallback?: string) {
    const text = JSON.stringify(data);
    return jsonpCallback ? `${jsonpCallback}(${text})` : text;
  }

  //处理响应
  async function process(ctx: Context, data: any,
    next?: Function, jsonpCallback?: string) {
    ctx.set('Content-Type', 'application/json');
    try {
      const result = await processor.process(data, ctx);
      ctx.body = stringify(result, jsonpCallback);
      next();
    } catch (err) {
      ctx.body = stringify(new YamQLError(err), jsonpCallback);
      next(err);
    }
  }

  //内容解析(post)
  router.post('/', bodyParser());

  //欢迎信息
  router.get('/', async function (ctx: Context, next: Function) {
    const { query = {} } = ctx;
    if (query && query[jsonpCallbackName]) {
      return process(ctx, query, next, query[jsonpCallbackName]);
    }
    if (query && query.operation) {
      return process(ctx, query, next);
    }
    ctx.body = 'The YamlQL service is running';
    next();
  });

  //请求处理
  router.post('/', async function (ctx: Context, next: Function) {
    return process(ctx, ctx.request.body || {}, next);
  });

  //文档服务
  router.get('/docs', async function (ctx: Context, next: Function) {
    ctx.body = JSON.stringify(processor.docs);
    next();
  });

  //探查器
  const inspectorPackage = require.resolve('yamlql-inspector');
  const inspectorWebRoot = path.resolve(inspectorPackage, '../../');
  const inspectorPath = '/inspector';//new RegExp(inspectorPath, 'i')
  const inspectorHandler = async (ctx: Context, next: Function) => {
    const index = ctx.path.indexOf(inspectorPath);
    let filename = ctx.path.slice(index + inspectorPath.length);
    if (!filename) return ctx.redirect(ctx.path + '/');
    if (filename == '/') filename += 'index.html';
    await send(ctx, filename, { root: inspectorWebRoot });
  };
  router.all(inspectorPath, inspectorHandler);
  router.all(inspectorPath + '/*', inspectorHandler);

  if (onReady) onReady({ processor });

  return router.routes();
}