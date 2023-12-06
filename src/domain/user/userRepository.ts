import { randomUUID } from "crypto";
import { sql } from "../../config/database";
import { User } from "./userTypes";
import { ApiError } from "../../errors/ApiError";
import { PostgresError } from "postgres";

export class UserRepository {
  public async createUser(email: string, passwordHash: string, role: string, inviteId: string) {
    await sql.begin(async (sql) => {
      const userId = randomUUID();
      try {
        await sql`INSERT INTO users ${sql({
          id: userId,
          email,
          passwordHash,
        })}`;
      } catch (error) {
        if (error instanceof PostgresError && error.code === "23505") throw ApiError.UserExists();
      }

      const inviteResult = await sql<{ userId: string | null }[]>`SELECT user_id FROM invites WHERE id=${inviteId}`;
      if (inviteResult.count === 0) throw ApiError.InviteNotExist();
      if (inviteResult[0].userId) throw ApiError.InviteConsumed();
      await sql`UPDATE invites SET user_id=${userId} WHERE id=${inviteId}`;
      await sql`
          INSERT INTO
              user_roles (user_id, role_id)
          SELECT
              ${userId},
              roles.id
          FROM
              roles
          WHERE
              roles.name = ${role};
        `;
    });
  }

  public async getUserByEmail(email: string) {
    const result = await sql<User[]>`
    SELECT u.id, u.email, u.password_hash, u.created_at,r.name, r.name as role FROM users u 
    JOIN user_roles ur ON u.id=ur.user_id
    JOIN roles r ON r.id=ur.role_id
    WHERE u.email=${email} LIMIT 1`;
    if (result.count === 0) throw ApiError.UserNotExist();
    return result[0];
  }

  public async createSession(sessionId: string, userId: string, expireAt: Date) {
    try {
      await sql`INSERT INTO sessions ${sql({
        id: sessionId,
        userId,
        expireAt,
      })}`;
    } catch (error) {
      if (error instanceof PostgresError && error.code === "23503") {
        throw ApiError.UserNotExist();
      }
      throw error;
    }
  }
}
