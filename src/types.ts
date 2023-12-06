import { Request } from "express";

export const roles = ["admin", "user"] as const;
export type UserRole = (typeof roles)[number];
export type UserCredentials = {
  id: string;
  role: UserRole;
};

export interface AuthRequest extends Request {
  credentials?: UserCredentials;
}

export type Invite = {
  id: string;
  name: string;
  createdAt: Date;
};
