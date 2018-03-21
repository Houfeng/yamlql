import Processor from './';

const processor = new Processor({
  root: {
    users(id: string) {
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
  } catch (err) {
    console.error(err);
  }
})();