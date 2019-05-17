"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const yamlql_1 = require("yamlql");
const router = express_1.Router();
class Client {
    constructor(req, res) {
        this.req = this.request = req;
        this.res = this.response = res;
    }
}
exports.Client = Client;
function middleware(options) {
    const { jsonpCallbackName, onReady, errorStack } = options;
    const processor = new yamlql_1.Processor(options.processor);
    //序列化
    function wrapResult(data, jsonpCallback) {
        const text = JSON.stringify(data);
        return jsonpCallback ? `${jsonpCallback}(${text})` : text;
    }
    //处理响应
    function process(client, data, next, jsonpCallback) {
        client.res.setHeader('Content-Type', 'application/json');
        return processor.process(Object.assign({}, data, { client })).then(result => {
            client.res.send(wrapResult(result, jsonpCallback));
            next();
        }).catch(err => {
            client.res.send(wrapResult(new yamlql_1.YamlQLError(err), jsonpCallback));
            next();
        });
    }
    //内容解析(post)
    router.post('/', bodyParser.json());
    router.post('/', bodyParser.urlencoded());
    //欢迎信息
    router.get('/', function (req, res, next) {
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
    router.post('/', function (req, res, next) {
        process(new Client(req, res), req.body, next);
    });
    //文档服务
    router.get('/docs', function (req, res, next) {
        res.send(JSON.stringify(processor.docs));
        next();
    });
    //探查器
    const inspectorPath = require.resolve('yamlql-inspector');
    const inspectorRoot = path.resolve(inspectorPath, '../../');
    router.use('/inspector', express.static(inspectorRoot, {
        fallthrough: false
    }));
    if (onReady)
        onReady({ processor });
    return router;
}
exports.default = middleware;
//# sourceMappingURL=index.js.map