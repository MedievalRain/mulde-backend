import { sql } from "../../config/database";
import { ApiError } from "../../errors/ApiError";
import { Invite } from "./adminTypes";

export class AdminRepository {
  public async createInvite(name: string) {
    return sql`INSERT INTO invites ${sql({ name })}`;
  }
  public async deleteUser(userId: string) {
    const result = await sql`DELETE FROM users where id=${userId}`;
    if (result.count === 0) throw ApiError.UserNotExist();
  }

  public async deleteInvite(inviteId: string) {
    const result = await sql`DELETE FROM invites where id=${inviteId} AND user_id IS NULL`;
    if (result.count === 0) throw ApiError.InviteNotExist();
  }

  public async getInvites(): Promise<Invite[]> {
    return sql<Invite[]>`SELECT id,name,created_at FROM INVITES WHERE user_id IS NULL`;
  }
  public async renameInvite(inviteId: string, name: string) {
    const result = await sql`UPDATE invites SET name=${name} WHERE id=${inviteId}`;
    if (result.count === 0) throw ApiError.InviteNotExist();
  }
}
