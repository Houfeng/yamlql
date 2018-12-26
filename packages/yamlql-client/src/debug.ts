import Client from '.';

const client = new Client({
  endpoint: 'https://query.aliyun.com/yamlql/',
  metadata: {
    QKEY_NAME: 'cli', QKEY_VALUE: 'ab7dbebf-5959-d661-c00c-e948bcb66cde'
  },
});

(async () => {

  try {
    const rs = await client.exec({ data: { action: 'houfeng.ywZigsYtv' } });
    console.log('成功', rs);
  } catch (err) {
    console.error('失败', err);
  }

})();                     