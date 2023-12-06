import { EnvError } from "../errors/EnvError";
import dotenv from "dotenv";

dotenv.config();

export const getEnv = (envName: string) => {
  const value = process.env[envName];
  if (value) {
    return value;
  } else throw new EnvError(envName);
};
