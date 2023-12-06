import { randomUUID } from "crypto";
import { sql } from "../../config/database";

export class UserRepository {
  public async createUser(email: string, passwordHash: string, role: string) {
    try {
      await sql.begin(async (sql) => {
        const userId = randomUUID();
        await sql`INSERT INTO users ${sql({
          id: userId,
          email,
          passwordHash,
        })}`;
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
    } catch (error) {}
  }
}
