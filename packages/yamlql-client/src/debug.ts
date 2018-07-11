import Client from './index';

const client = new Client({
  endpoint: 'http://local.aliyun.com:7001/yamlql',
  metadata: { QKEY_NAME: 'demo', QKEY_VALUE: 'e00bb831-d1a2-1165-dfea-7ddf9b091e6d' },
});
   
(async () => {         
 
  try {
    const rs = await client.exec('./demo');
    console.log('成功', rs);
  } catch (err) {   
    console.error('失败', err);       
  }         
 
})();                     