import Client from '.';

const client = new Client({
  endpoint: 'https://query.aliyun.com/yamlql/',
  metadata: {
    QKEY_NAME: 'demo', QKEY_VALUE: 'ea0cac65-6a6c-5e3f-7b5c-62e09bd7587b'
  },
});

(async () => {

  try {
    const rs = await client.exec('./demo');
    console.log('成功', rs);
  } catch (err) {
    console.error('失败', err);
  }

})();                     