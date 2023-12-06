import { getEnv } from "../utils/env";

export const corsOptions = {
  origin: getEnv("FRONTEND_DOMAIN"),
  methods: "GET,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
