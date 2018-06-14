export class YamlQLError extends Error {

  private attach: any;

  constructor(opts: string | Error, attach: any = {}) {
    if (opts instanceof Error) {
      const { name, message, stack } = opts;
      super(message);
      this.name = name;
      this.stack = stack;
    } else {
      super(opts);
    }
    this.attach = opts;
  }

  toJSON() {
    const { message, attach } = this;
    const error = message;
    return { error, ...attach };
  }

}

export default YamlQLError;