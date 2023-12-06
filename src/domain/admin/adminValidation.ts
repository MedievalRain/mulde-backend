import z from "zod";
import { ApiError } from "../../errors/ApiError";

const createInviteRequestSchema = z.object({
  name: z.string().min(1).max(255),
});

export const parseCreateInviteRequest = (data: unknown) => {
  try {
    return createInviteRequestSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};

const deleteUserRequestSchema = z.object({
  userId: z.string().uuid(),
});

export const parseDeleteUserRequest = (data: unknown) => {
  try {
    return deleteUserRequestSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};

const deleteInviteRequestSchema = z.object({
  inviteId: z.string().uuid(),
});

export const parseDeleteInviteRequest = (data: unknown) => {
  try {
    return deleteInviteRequestSchema.parse(data);
  } catch {
    throw ApiError.Validation();
  }
};
