import { UserRole } from "../../types";

export type UserPayload = {
  userId: string;
  role: UserRole;
};
export type UserSessionPayload = {
  userId: string;
  role: UserRole;
  sessionId: string;
};
