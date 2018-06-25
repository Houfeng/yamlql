"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const index_1 = require("./index");
const Router = require("koa-router");
const yamlql_1 = require("yamlql");
const options = {
    processor: {
        resolver: yamlql_1.Resolver.create({
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
        })
    }
};
const app = new Koa();
const router = new Router();
router.use('/yamlql', index_1.default(options));
app.use(router.routes());
app.listen(2100, () => {
    console.log('Example app listening on port 2100!');
});
//# sourceMappingURL=debug.js.map