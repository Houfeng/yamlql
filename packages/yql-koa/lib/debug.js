"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var index_1 = require("./index");
var Router = require("koa-router");
var options = {
    processor: {
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
                        for (var i = 1; i < 5; i++)
                            list.push({ userId: i, userName: '用户' + i, userAge: i });
                        return list;
                    })()
                };
            }
        }
    }
};
var app = new Koa();
var router = new Router();
router.use('/yamlql', index_1.default(options));
app.use(router.routes());
app.listen(2100, function () {
    console.log('Example app listening on port 2100!');
});
//# sourceMappingURL=debug.js.map