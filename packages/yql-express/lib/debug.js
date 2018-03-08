"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("./index");
var app = express();
app.use('/yamlql', index_1.default({}));
app.listen(2000, function () {
    console.log('Example app listening on port 7000!');
});
//# sourceMappingURL=debug.js.map