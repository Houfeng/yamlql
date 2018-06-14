export class YamlQLError extends Error {

  private attach: any;

  constructor(opts: string | Error, attach: any = {}) {
    if (opts instanceof Error) {
      const { name, message, stack, attach } = opts as YamlQLError;
      super(message);
      this.name = name;
      this.stack = stack;
      this.attach = attach;
    } else {
      super(opts);
    }
    this.attach = Object.assign({}, this.attach, attach);
  }

  toJSON() {
    const { message, attach } = this;
    const error = message;
    return { error, ...attach };
  }

}

export default YamlQLError;