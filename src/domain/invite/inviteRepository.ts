import { sql } from "../../config/database";

export class InviteRepository {
  public async createInvite(name: string) {
    return sql`INSERT INTO invites ${sql({ name })}`;
  }
}
