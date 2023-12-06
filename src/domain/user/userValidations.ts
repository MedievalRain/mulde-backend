import z from "zod";
import { ApiError } from "../../errors/ApiError";

const authRequestSchema = z.object({
  email: z.string().email().min(3),
  password: z.string().min(8),
});

export const parseAuthRequest = (data: unknown) => {
  try {
    return authRequestSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};

const registerRequestSchema = z.object({
  email: z.string().email().min(3),
  password: z.string().min(8),
  inviteId: z.string().uuid(),
});

export const parseRegisterRequest = (data: unknown) => {
  try {
    return registerRequestSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};
