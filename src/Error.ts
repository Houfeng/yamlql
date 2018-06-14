export class YamlQLError extends Error {

  public options: any;

  constructor(message: string, opts: any = {}) {
    super(message);
    this.options = opts;
  }

  toJSON() {
    const { message, options } = this;
    const error = message;
    return { error, ...options };
  }

}

export default YamlQLError;