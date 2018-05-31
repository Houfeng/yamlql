//handler 的目的是让每个编译后的函数小一些，公共处理在 handler 中
module.exports = function (request, url, operation, variables, options, metadata) {
  options = options || {};
  metadata = metadata || options.metadata;
  request = request.default || request;
  var data = {
    operation: operation,
    variables: JSON.stringify(variables),
    metadata: JSON.stringify(metadata)
  };
  return request(url, data, options);
};