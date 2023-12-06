export class EnvError extends Error {
  constructor(variableName: string) {
    super(`${variableName} enviroment variable is missing`);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
