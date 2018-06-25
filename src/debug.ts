import Processor from './';
import { Resolver } from './Resolver';
import { Context } from './Context';
import { IResolveOptions } from './IResolveOptions';
import { YamlQLError } from './Error';

const processor = new Processor({
  resolver: Resolver.create({
    users(id: string) {
      return {
        code: 200,
        data: [{ id, name: '用户' + id, age: id }]
      };
    }
  }),
  resolve(ctx: Context, options: IResolveOptions) {
    throw new YamlQLError('不能找到 Resolve 方法', options);
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
  } catch (err) {
    console.error(err);
  }
})();