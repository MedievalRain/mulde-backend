type ApiErrorTypes =
  | "USER_EXISTS"
  | "VALIDATION"
  | "INTERNAL"
  | "USER_NOT_EXIST"
  | "WRONG_PASSWORD"
  | "INVITE_CONSUMED"
  | "INVITE_NOT_EXISTS"
  | "INSUFFICIENT_PRIVILEGES";

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
  static InviteConsumed() {
    return new ApiError(403, "INVITE_CONSUMED");
  }

  static InviteNotExist() {
    return new ApiError(404, "INVITE_NOT_EXISTS");
  }

  static InsufficientPrivileges() {
    return new ApiError(403, "INSUFFICIENT_PRIVILEGES");
  }
}
