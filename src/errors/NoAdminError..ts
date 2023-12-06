export class NoAdminError extends Error {
  constructor() {
    super(`There is no user with admin role`);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
