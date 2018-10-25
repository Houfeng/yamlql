//handler 的目的是让每个编译后的函数小一些，公共处理在 handler 中
module.exports = function (request, endpoint, operation,
  variables, options, metadata) {
  options = options || {};
  metadata = metadata || options.metadata;
  request = request.default || request;
  endpoint = options.endpoint || endpoint;
  var data = {
    operation: operation,
    variables: JSON.stringify(variables),
    metadata: JSON.stringify(metadata)
  };
  return request(endpoint, data, options);
};