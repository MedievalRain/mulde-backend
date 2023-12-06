type ApiErrorTypes = "USER_EXISTS" | "VALIDATION" | "INTERNAL";

export class ApiError extends Error {
  status: number;
  type: ApiErrorTypes;

  constructor(status: number, type: ApiErrorTypes) {
    super();
    this.status = status;
    this.type = type;
  }

  static UserExists() {
    return new ApiError(409, "USER_EXISTS");
  }
  static Validation() {
    return new ApiError(400, "VALIDATION");
  }
}
