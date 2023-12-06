import { Request, Response, NextFunction } from "express";
import { jwtService } from "../utils/jwt/jwt";
import { AuthRequest } from "../types";
import { sql } from "../config/database";
import { ApiError } from "../errors/ApiError";
import { errorMiddleware } from "./errorMiddleware";
import { addMinutes } from "../utils/time";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.cookies.accessToken;
  const authReq = req as AuthRequest;
  try {
    try {
      const authData = jwtService.parseAccessToken(accessToken);
      authReq.credentials = { ...authData, id: authData.userId };
      next();
    } catch {
      const authData = jwtService.parseRefreshToken(refreshToken);
      const result = await sql`
        SELECT 1 FROM sessions
        WHERE id=${authData.sessionId} AND user_id=${authData.userId} AND expire_at<NOW()`;
      if (result.count === 0) throw ApiError.ExpiredSession();
      authReq.credentials = { ...authData, id: authData.userId };
      const newAccessToken = jwtService.generateAccessToken(authData.userId, authData.role);
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false, // FIXME change in production
        sameSite: "lax",
        expires: addMinutes(new Date(), 15),
      });
      next();
    }
  } catch (error) {
    errorMiddleware(error, req, res, next);
  }
};
