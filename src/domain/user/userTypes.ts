export type User = {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
};
export type UserRole = "admin" | "user";
