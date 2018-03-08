import * as express from 'express';
import yqlExpress from './index';

const app = express();
app.use('/yamlql', yqlExpress({}));

app.listen(2000, function () {
  console.log('Example app listening on port 7000!');
});