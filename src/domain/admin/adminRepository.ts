import { sql } from "../../config/database";

export class AdminRepository {
  public async createInvite(name: string) {
    return sql`INSERT INTO invites ${sql({ name })}`;
  }
}
