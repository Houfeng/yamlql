"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var yamlql_1 = require("yamlql");
var processor = new yamlql_1.Processor({
    root: {
        getUser: function (id) {
            return {
                code: 200,
                data: { userId: id, userName: '用户' + id, userAge: id }
            };
        },
        getUsers: function () {
            return {
                code: 200,
                data: (function () {
                    var list = [];
                    for (var i = 0; i < 20; i++)
                        list.push({ userId: i, userName: '用户' + i, userAge: i });
                    return list;
                })()
            };
        }
    }
});
var router = express_1.Router();
function middleware(options) {
    router.get('/', function (req, res, next) {
        res.send('The YamlQL service is running');
    });
    router.post('/', bodyParser.json());
    router.post('/', function (req, res, next) {
        processor.process(req.body).then(function (result) {
            res.send(JSON.stringify(result));
        }).catch(function (err) {
            res.send(JSON.stringify({ error: err.message }));
        });
    });
    router.get('/docs', function (req, res, next) {
        res.send('docs');
    });
    //inspector
    var inspectorPath = require.resolve('yql-inspector');
    var inspectorRoot = path.resolve(inspectorPath, '../../');
    router.use('/inspector', express.static(inspectorRoot));
    return router;
}
exports.default = middleware;
//# sourceMappingURL=index.js.map