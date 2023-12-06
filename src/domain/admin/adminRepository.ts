import { sql } from "../../config/database";
import { ApiError } from "../../errors/ApiError";

export class AdminRepository {
  public async createInvite(name: string) {
    return sql`INSERT INTO invites ${sql({ name })}`;
  }
  public async deleteUser(userId: string) {
    const result = await sql`DELETE FROM users where id=${userId}`;
    if (result.count === 0) throw ApiError.UserNotExist();
  }

  public async deleteInvite(inviteId: string) {
    const result = await sql`DELETE FROM invites where id=${inviteId} AND user_id=NULL`;
    if (result.count === 0) throw ApiError.InviteNotExist();
  }
}
