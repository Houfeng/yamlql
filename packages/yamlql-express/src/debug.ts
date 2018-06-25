import * as express from 'express';
import yqlExpress from './index';
import { Context } from 'yamlql';

const options = {
  processor: {
    resolver: {
      getUser(ctx: Context, id: string) {
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

const app = express();
app.use('/yamlql', yqlExpress(options));

app.listen(2000, () => {
  console.log('Example app listening on port 2000!');
});