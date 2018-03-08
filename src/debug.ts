import Processor from './';

const processor = new Processor({
  root: {
    users(id: string) {
      return {
        code: 200,
        data: [{ id, name: '用户' + id, age: id }]
      };
    }
  },
  // invoke(method: string, params: any) {

  // }
});

const operation = `
users:
  action: users
  params: $id
  fields:
    code: code
    list: 
      action: __map
      params: $parent.data
      fields:
        .: .
    `;
const variables = { id: 123 };

(async function () {
  try {
    const result = await processor.process({ operation, variables });
    console.log(JSON.stringify(result, null, '  '));
  } catch (err) {
    console.error(err);
  }
})();