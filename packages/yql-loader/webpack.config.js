const path = require('path');

module.exports = function (webpackConf) {
  webpackConf.module.loaders.push({
    test: /\.(yql|yamlql)/i,
    loaders: [require.resolve('./lib')]
  });
};