import postgres from "postgres";
import { EnvError } from "../errors/EnvError";
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new EnvError("FRONTEND_DOMAIN");
export const sql = postgres(DATABASE_URL, { transform: postgres.camel, onnotice: () => {} });
