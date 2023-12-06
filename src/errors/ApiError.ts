type ApiErrorTypes =
  | "USER_EXISTS"
  | "VALIDATION"
  | "INTERNAL"
  | "USER_NOT_EXIST"
  | "WRONG_PASSWORD";

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

  static UserNotExist() {
    return new ApiError(404, "USER_NOT_EXIST");
  }
  static Validation() {
    return new ApiError(400, "VALIDATION");
  }
  static WrongPassword() {
    return new ApiError(401, "WRONG_PASSWORD");
  }
}
