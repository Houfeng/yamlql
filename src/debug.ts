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
users:
  action: users
  params: $id
  fields:
    code: code
    data: 
      fields:
        .: .
        id: false
demo:
  action: _value
  params: =$id

data:
  action: _value
  params: $opts
total:
  action: _value
  parmas: $opts 
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