import Client from './index';

const client = new Client({
  endpoint: 'https://query.aliyun.com/yamlql'
});

(async () => {

  try {
    const rs = await client.exec(` 
  data:
    action: demos.users
  `); 
    console.log('成功', rs);
  } catch (err) {
    console.error('成功', err); 
  }

})();