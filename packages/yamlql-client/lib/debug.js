"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const client = new index_1.default({
    endpoint: 'https://query.aliyun.com/yamlql'
});
(async () => {
    try {
        const rs = await client.exec(` 
  data:
    action: demos.users
  `);
        console.log('成功', rs);
    }
    catch (err) {
        console.error('成功', err);
    }
})();
//# sourceMappingURL=debug.js.map