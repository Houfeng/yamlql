module.exports = function (request, url, operation, variables, options, metadata) {
  options = options || {};
  metadata = metadata || options.metadata;
  var data = {
    operation: operation,
    variables: JSON.stringify(variables),
    metadata: JSON.stringify(metadata)
  };
  return request(url, data, options);
};