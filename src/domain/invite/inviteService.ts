import { ApiError } from "../../errors/ApiError";
import { UserCredentials } from "../../types";
import { InviteRepository } from "./inviteRepository";
import { parseCreateInviteRequest } from "./inviteValidation";

class InviteService {
  constructor(private inviteRepository: InviteRepository) {}

  public async createInvite(data: unknown, credentials: UserCredentials | undefined) {
    if (!credentials) throw ApiError.InvalidJWT();
    if (credentials.role !== "admin") throw ApiError.InsufficientPrivileges();
    const { name } = parseCreateInviteRequest(data);
    return this.inviteRepository.createInvite(name);
  }
}

export const inviteService = new InviteService(new InviteRepository());
