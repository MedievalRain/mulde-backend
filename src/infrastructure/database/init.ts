import dotenv from "dotenv";
import { sql } from "../../config/database";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { EnvError } from "../../errors/EnvError";

dotenv.config();

export const initDatabase = async () => {
  await sql.file("./schema/schema.sql");
  const roles = ["admin", "user"].map((name) => ({ name }));
  await createAdmin();
};

const createAdmin = async () => {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const adminRows = await sql<{ id: string }[]>`
    SELECT users.id FROM users 
    JOIN user_roles ON users.id=user_roles.user_id
    JOIN roles ON roles.id=user_roles.role_id
    WHERE roles.name='admin'
  `;
  const loadedEnvs = ADMIN_EMAIL && ADMIN_PASSWORD;
  if (adminRows.count === 0) {
    if (loadedEnvs) {
      const userId = randomUUID();
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await sql`INSERT INTO users ${sql({
        id: userId,
        email: ADMIN_EMAIL,
        passwordHash,
      })}`;
      await sql`
        INSERT INTO user_roles (user_id, role_id) 
        SELECT ${userId},roles.id
        FROM roles WHERE roles.name = ${"admin"};`;
      console.log(`Created admin account with ${ADMIN_EMAIL} email`);
    } else throw new EnvError("ADMIN_EMAIL or ADMIN_PASSWORD");
  } else {
    if (loadedEnvs) {
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await sql`UPDATE users SET email=${ADMIN_EMAIL}, password_hash=${passwordHash} WHERE id=${adminRows[0].id}`;
      console.log("Admin email and password updated.");
    } else {
      console.log("Admin user already exists.");
    }
  }
};
