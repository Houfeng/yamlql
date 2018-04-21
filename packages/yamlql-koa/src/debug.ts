import * as Koa from 'koa';
import yqlKoa from './index';
import * as Router from 'koa-router';

const options = {
  processor: {
    root: {
      getUser(id: string) {
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
              list.push({ userId: i, userName: '用户' + i, userAge: i })
            return list;
          })()
        };
      }
    }
  }
};

const app = new Koa();
const router = new Router();
router.use('/yamlql', yqlKoa(options));
app.use(router.routes());

app.listen(2100, () => {
  console.log('Example app listening on port 2100!');
});