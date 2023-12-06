export const roles = ["admin", "user"] as const;
export type UserRole = (typeof roles)[number];
export type UserCredentials = {
  id: string;
  role: UserRole;
};
