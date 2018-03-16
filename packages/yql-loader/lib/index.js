const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const os = require('os');

const IMPORT_REGEXP = /^#\s*(import|include|require)\s*(\'|\")(.+?)(\'|\")/;
const EXTENSIONS = ['.yql', '.yamlql'];

function getFile(cwd, filePath, options, tryExts) {
  tryExts = (tryExts || options.extensions || []).slice(0);
  if (!tryExts) return;
  const filename = path.resolve(cwd, filePath);
  if (fs.existsSync(filename)) return filename;
  if (tryExts.length < 1) return;
  return getFile(cwd, filePath + tryExts.shift(), options, tryExts);
}

function readFile(cwd, filePath, options) {
  const filename = getFile(cwd, filePath, options);
  if (!filename) return;
  return {
    filename: filename,
    context: path.dirname(filename),
    content: fs.readFileSync(filename, 'utf8')
  };
}

function parse(cwd, source, options) {
  const contents = [source];
  const lines = source.split('\n');
  lines.forEach(line => {
    line = line.trim();
    const matchInfo = IMPORT_REGEXP.exec(line);
    const filePath = matchInfo && matchInfo[3];
    if (!filePath) return;
    const fileInfo = readFile(cwd, filePath, options);
    if (!fileInfo) return;
    this.addDependency(fileInfo.filename);
    const includes = parse.call(
      this, fileInfo.context, fileInfo.content, options
    );
    contents.unshift(...includes);
  });
  return _.uniq(contents);
}

function getOptions(ctx) {
  const options = ctx.loaders[ctx.loaderIndex].options || {};
  return _.defaults(options, {
    extensions: EXTENSIONS,
    string: false,
    url: '/yamlql',
    request: require.resolve('./request')
  });
}

function loader(source) {
  this.cacheable();
  const options = getOptions(this);
  const result = parse.call(this, this.context, source, options);
  const operation = JSON.stringify(result.join(os.EOL));
  if (options.string) {
    return `module.exports = ${operation}`;
  } else {
    return `var request = require('${options.request}');
    var url = '${options.url}';
    module.exports = function (variables, options, metadata) {
      options = options || {};
      metadata = metadata || options.metadata;
      var data = {
        operation: ${operation},
        variables: JSON.stringify(variables),
        metadata: JSON.stringify(metadata)
      };
      return request(url, data, options);
    };`
  }
}

module.exports = loader;