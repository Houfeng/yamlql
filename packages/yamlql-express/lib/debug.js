"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("./index");
const options = {
    processor: {
        root: {
            getUser(id) {
                return {
                    code: 200,
                    data: { userId: id, userName: '用户' + id, userAge: id }
                };
            },
            getUsers() {
                return {
                    code: 200,
                    data: (() => {
                        const list = [];
                        for (let i = 1; i < 5; i++)
                            list.push({ userId: i, userName: '用户' + i, userAge: i });
                        return list;
                    })()
                };
            }
        }
    }
};
const app = express();
app.use('/yamlql', index_1.default(options));
app.listen(2000, () => {
    console.log('Example app listening on port 2000!');
});
//# sourceMappingURL=debug.js.map