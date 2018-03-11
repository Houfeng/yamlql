"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("./index");
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
var app = express();
app.use('/yamlql', index_1.default(options));
app.listen(2000, function () {
    console.log('Example app listening on port 2000!');
});
//# sourceMappingURL=debug.js.map