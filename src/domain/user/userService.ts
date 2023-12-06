import { randomUUID } from "crypto";
import { ApiError } from "../../errors/ApiError";
import { jwtService } from "../../utils/jwt/jwt";
import { UserRepository } from "./userRepository";
import { parseAuthRequest, parseRegisterRequest } from "./userValidations";
import * as bcrypt from "bcrypt";

class UserService {
  constructor(private userRepository: UserRepository) {}

  public async register(data: unknown) {
    const { email, password, inviteId } = parseRegisterRequest(data);
    const passwordHash = await bcrypt.hash(password, 10);
    return this.userRepository.createUser(email, passwordHash, "user", inviteId);
  }

  public async login(data: unknown) {
    const { email, password } = parseAuthRequest(data);
    const { id: userId, passwordHash, role } = await this.userRepository.getUserByEmail(email);
    const isPasswordMatch = await bcrypt.compare(password, passwordHash);
    if (isPasswordMatch) {
      const sessionExpireDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60000); // 30 days
      const sessionId = randomUUID();
      await this.userRepository.createSession(sessionId, userId, sessionExpireDate);
      const refreshToken = jwtService.generateRefreshToken(sessionId, userId, role);
      const accessToken = jwtService.generateAccessToken(userId, role);
      return { accessToken, refreshToken, sessionExpireDate };
    } else {
      throw ApiError.WrongPassword();
    }
  }
}
export const userService = new UserService(new UserRepository());
