"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const processor = new _1.default({
    root: {
        users(id) {
            return {
                code: 200,
                data: [{ id, name: '用户' + id, age: id }]
            };
        }
    }
});
const operation = `
data: 
  action: _date
  params: 
    - 2018-10-10
    - yyyy年MM月dd日
`;
const variables = { id: 123, opts: { skip: 0, limit: 10 } };
(async function () {
    try {
        const result = await processor.process({ operation, variables });
        console.log(JSON.stringify(result, null, '  '));
    }
    catch (err) {
        console.error(err);
    }
})();
//# sourceMappingURL=debug.js.map