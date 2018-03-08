import {
  Router, NextFunction, RequestHandler, Request, Response
} from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { Processor } from 'yamlql';

const processor = new Processor({
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
});

const router = Router();

export interface IServerOptions { }

export default function middleware(options: IServerOptions): RequestHandler {

  router.get('/', function (
    req: Request, res: Response, next: NextFunction) {
    res.send('The YamlQL service is running');
  });

  router.post('/', bodyParser.json());
  router.post('/', function (
    req: Request, res: Response, next: NextFunction) {
    processor.process(req.body).then(result => {
      res.send(JSON.stringify(result));
    }).catch(err => {
      res.send(JSON.stringify({ error: err.message }));
    });
  });

  router.get('/docs', function (
    req: Request, res: Response, next: NextFunction) {
    res.send('docs');
  });

  //inspector
  const inspectorPath = require.resolve('yql-inspector');
  const inspectorRoot = path.resolve(inspectorPath, '../../');
  router.use('/inspector', express.static(inspectorRoot));

  return router;
}