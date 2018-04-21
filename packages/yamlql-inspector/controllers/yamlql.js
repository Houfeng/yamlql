const data = [
  {name:''}
];
class UploadController {

  index() {
    this.context.send({
      message: 'Welcome to YamlQL',
      body: this.context.request.body
    });
  }

}

module.exports = UploadController;