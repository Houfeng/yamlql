"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var Router = require("koa-router");
var bodyParser = require("koa-bodyparser");
var yamlql_1 = require("yamlql");
var send = require("koa-send");
function middleware(options) {
    var _this = this;
    var router = new Router();
    var jsonpCallbackName = options.jsonpCallbackName;
    var processor = new yamlql_1.Processor(options.processor);
    //序列化
    function stringify(data, jsonpCallback) {
        var text = JSON.stringify(data);
        return jsonpCallback ? jsonpCallback + "(" + text + ")" : text;
    }
    //处理响应
    function process(ctx, data, next, jsonpCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.set('Content-Type', 'application/json');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, processor.process(data)];
                    case 2:
                        result = _a.sent();
                        ctx.body = stringify(result, jsonpCallback);
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        ctx.body = stringify({ error: err_1.message }, jsonpCallback);
                        next(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    //内容解析(post)
    router.post('/', bodyParser());
    //欢迎信息
    router.get('/', function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, query;
            return __generator(this, function (_b) {
                _a = ctx.query, query = _a === void 0 ? {} : _a;
                if (query && query[jsonpCallbackName]) {
                    return [2 /*return*/, process(ctx, query, next, query[jsonpCallbackName])];
                }
                if (query && query.operation) {
                    return [2 /*return*/, process(ctx, query, next)];
                }
                ctx.body = 'The YamlQL service is running';
                next();
                return [2 /*return*/];
            });
        });
    });
    //请求处理
    router.post('/', function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, process(ctx, ctx.request.body || {}, next)];
            });
        });
    });
    //文档服务
    router.get('/docs', function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                ctx.body = JSON.stringify(processor.docs);
                next();
                return [2 /*return*/];
            });
        });
    });
    //探查器
    var inspectorPackage = require.resolve('yql-inspector');
    var inspectorWebRoot = path.resolve(inspectorPackage, '../../');
    var inspectorPath = '/inspector'; //new RegExp(inspectorPath, 'i')
    var inspectorHandler = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
        var index, filename;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = ctx.path.indexOf(inspectorPath);
                    filename = ctx.path.slice(index + inspectorPath.length);
                    if (!filename)
                        return [2 /*return*/, ctx.redirect(ctx.path + '/')];
                    if (filename == '/')
                        filename += 'index.html';
                    return [4 /*yield*/, send(ctx, filename, { root: inspectorWebRoot })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    router.all(inspectorPath, inspectorHandler);
    router.all(inspectorPath + '/*', inspectorHandler);
    return router.routes();
}
exports.default = middleware;
//# sourceMappingURL=index.js.map