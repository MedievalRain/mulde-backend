import dotenv from "dotenv";
import { EnvError } from "../errors/EnvError";

dotenv.config();
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN;
if (!FRONTEND_DOMAIN) {
  throw new EnvError("FRONTEND_DOMAIN");
}

export const corsOptions = {
  origin: FRONTEND_DOMAIN,
  methods: "GET,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
