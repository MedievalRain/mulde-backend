import jwt from "jsonwebtoken";
import { getEnv } from "../env";
import { UserRole, roles } from "../../types";
import { UserPayload, UserSessionPayload } from "./jwtTypes";
import { ApiError } from "../../errors/ApiError";
import z from "zod";

export class JwtService {
  key: string = getEnv("JWT_KEY");

  public generateAccessToken(userId: string, role: UserRole) {
    const payload: UserPayload = {
      userId,
      role,
    };
    return this.generateJWT(payload, "15m");
  }

  public generateRefreshToken(sessionId: string, userId: string, role: UserRole) {
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

  public parseAccessToken(token: string): UserPayload {
    const data = this.verify(token);
    return z
      .object({
        userId: z.string().uuid(),
        role: z.enum(roles),
      })
      .parse(data);
  }
  public parseRefreshToken(token: string): UserSessionPayload {
    const data = this.verify(token);
    return z
      .object({
        userId: z.string(),
        role: z.enum(roles),
        sessionId: z.string().uuid(),
      })
      .parse(data);
  }

  private verify(token: string) {
    try {
      const data = jwt.verify(token, this.key);
      if (typeof data === "string") throw ApiError.InvalidJWT();
      return data;
    } catch {
      throw ApiError.InvalidJWT();
    }
  }
}

export const jwtService = new JwtService();
