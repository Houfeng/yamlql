"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const Resolver_1 = require("./Resolver");
const Error_1 = require("./Error");
const processor = new _1.default({
    resolver: Resolver_1.Resolver.create({
        users(id) {
            return {
                code: 200,
                data: [{ id, name: '用户' + id, age: id }]
            };
        }
    }),
    resolve(ctx, options) {
        throw new Error_1.YamlQLError('不能找到 Resolve 方法', options);
    }
});
const operation = `
data: 
  action: __value
  params: 
    id: $id
`;
const variables = { id: 123, opts: { skip: 0, limit: 10 } };
(async function () {
    try {
        const result = await processor.process({ operation, variables });
        console.log('结果：', JSON.stringify(result, null, '  '));
    }
    catch (err) {
        console.error(err);
    }
})();
//# sourceMappingURL=debug.js.map