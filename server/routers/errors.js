class RouterError extends Error {
  constructor (err) {
    if (err instanceof Error) {
      super(err.message);
      this.stack += `\n${err.stack}`;
      this.originalError = err;
    } else {
      super(err);
    }
  }
};

class BadRequest extends RouterError {
  get status () { return 400; }
};
class ServerError extends RouterError {
  get status () { return 500; }
};

module.exports = {
  BadRequest,
  RouterError,
  ServerError,
  resolveError (err) {
    return err instanceof RouterError ? err : new ServerError(err);
  }
}
