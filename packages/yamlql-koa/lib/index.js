"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const yamlql_1 = require("yamlql");
const send = require("koa-send");
function middleware(options) {
    const router = new Router();
    const { jsonpCallbackName, onReady, errorStack } = options;
    const processor = new yamlql_1.Processor(options.processor);
    //序列化
    function stringify(data, jsonpCallback) {
        const text = JSON.stringify(data);
        return jsonpCallback ? `${jsonpCallback}(${text})` : text;
    }
    //处理响应
    async function process(ctx, data, next, jsonpCallback) {
        ctx.set('Content-Type', 'application/json');
        try {
            const result = await processor.process(Object.assign({}, data, { client: ctx }));
            ctx.body = stringify(result, jsonpCallback);
            next();
        }
        catch (err) {
            ctx.body = stringify(new yamlql_1.YamlQLError(err), jsonpCallback);
            next(err);
        }
    }
    //内容解析(post)
    router.post('/', bodyParser());
    //欢迎信息
    router.get('/', async function (ctx, next) {
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
    router.post('/', async function (ctx, next) {
        return process(ctx, ctx.request.body || {}, next);
    });
    //文档服务
    router.get('/docs', async function (ctx, next) {
        ctx.body = JSON.stringify(processor.docs);
        next();
    });
    //探查器
    const inspectorPackage = require.resolve('yamlql-inspector');
    const inspectorWebRoot = path.resolve(inspectorPackage, '../../');
    const inspectorPath = '/inspector'; //new RegExp(inspectorPath, 'i')
    const inspectorHandler = async (ctx, next) => {
        const index = ctx.path.indexOf(inspectorPath);
        let filename = ctx.path.slice(index + inspectorPath.length);
        if (!filename)
            return ctx.redirect(ctx.path + '/');
        if (filename == '/')
            filename += 'index.html';
        await send(ctx, filename, { root: inspectorWebRoot });
    };
    router.all(inspectorPath, inspectorHandler);
    router.all(inspectorPath + '/*', inspectorHandler);
    if (onReady)
        onReady({ processor });
    return router.routes();
}
exports.default = middleware;
//# sourceMappingURL=index.js.map