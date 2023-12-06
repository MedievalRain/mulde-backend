import jwt from "jsonwebtoken";
import { UserRole } from "../domain/user/userTypes";
import { getEnv } from "./env";

type UserPayload = {
  userId: string;
  role: UserRole;
};
type UserSessionPayload = {
  userId: string;
  role: UserRole;
  sessionId: string;
};

export class JwtService {
  key: string = getEnv("JWT_KEY");

  public generateAccessToken(userId: string, role: UserRole) {
    const payload = {
      userId,
      role,
    };
    return this.generateJWT(payload, "15m");
  }

  public generateRefreshToken(
    sessionId: string,
    userId: string,
    role: UserRole
  ) {
    const payload: UserSessionPayload = {
      sessionId,
      userId,
      role,
    };
    return this.generateJWT(payload, "30d");
  }

  private generateJWT(payload: object, expiresIn: string) {
    return jwt.sign(payload, this.key, {
      expiresIn: expiresIn,
    });
  }
}

export const jwtService = new JwtService();
