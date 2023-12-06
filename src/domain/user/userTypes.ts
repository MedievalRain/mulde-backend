import { UserRole } from "../../types";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
};
