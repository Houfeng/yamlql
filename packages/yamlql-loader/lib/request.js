var axios = require('axios');

var instance = axios.create({
  xsrfCookieName: 'QXSRF-TOKEN',
  xsrfHeaderName: 'QXSRF-TOKEN',
  withCredentials: true,
});

//默认的 request 模块
module.exports = function request(endpoint, data, options) {
  return instance.post(endpoint, data, options).then(function (rs) {
    return rs.data;
  });
};