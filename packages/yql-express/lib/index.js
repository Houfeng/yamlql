"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var yamlql_1 = require("yamlql");
var router = express_1.Router();
function middleware(options) {
    var jsonpCallbackName = options.jsonpCallbackName;
    var processor = new yamlql_1.Processor(options.processor);
    //序列化
    function stringify(data, jsonpCallback) {
        var text = JSON.stringify(data);
        return jsonpCallback ? jsonpCallback + "(" + text + ")" : text;
    }
    //处理响应
    function process(res, data, next, jsonpCallback) {
        res.setHeader('Content-Type', 'application/json');
        return processor.process(data).then(function (result) {
            res.send(stringify(result, jsonpCallback));
            next();
        }).catch(function (err) {
            res.send(stringify({ error: err.message }, jsonpCallback));
            next(err);
        });
    }
    //内容解析(post)
    router.post('/', bodyParser.json());
    router.post('/', bodyParser.urlencoded());
    //欢迎信息
    router.get('/', function (req, res, next) {
        var query = req.query;
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
    router.post('/', function (req, res, next) {
        process(res, req.body, next);
    });
    //文档服务
    router.get('/docs', function (req, res, next) {
        res.send(JSON.stringify(processor.docs));
        next();
    });
    //探查器
    var inspectorPath = require.resolve('yql-inspector');
    var inspectorRoot = path.resolve(inspectorPath, '../../');
    router.use('/inspector', express.static(inspectorRoot, {
        fallthrough: false
    }));
    return router;
}
exports.default = middleware;
//# sourceMappingURL=index.js.map