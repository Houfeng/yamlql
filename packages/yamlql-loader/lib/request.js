var axios = require('axios');

axios.defaults.withCredentials = true;

//默认的 request 模块
module.exports = function request(endpoint, data, options) {
  return axios.post(endpoint, data, options).then(function (rs) {
    return rs.data;
  });
};