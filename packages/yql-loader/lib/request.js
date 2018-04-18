const axios = require('axios');

axios.defaults.withCredentials = true;

module.exports = function request(url, data, options) {
  return axios.post(url, data, options).then(function (rs) {
    return rs.data;
  });
};