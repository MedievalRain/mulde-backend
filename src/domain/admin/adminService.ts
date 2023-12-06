import { ApiError } from "../../errors/ApiError";
import { UserCredentials } from "../../types";
import { AdminRepository } from "./adminRepository";
import {
  parseCreateInviteRequest,
  parseDeleteInviteRequest,
  parseDeleteUserRequest,
  parseRenameInviteRequest,
} from "./adminValidation";

class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  public async createInvite(data: unknown, credentials: UserCredentials | undefined) {
    if (!credentials) throw ApiError.InvalidJWT();
    if (credentials.role !== "admin") throw ApiError.InsufficientPrivileges();
    const { name } = parseCreateInviteRequest(data);
    return this.adminRepository.createInvite(name);
  }

  public async deleteUser(data: unknown, credentials: UserCredentials | undefined) {
    if (!credentials) throw ApiError.InvalidJWT();
    if (credentials.role !== "admin") throw ApiError.InsufficientPrivileges();
    const { userId } = parseDeleteUserRequest(data);
    return this.adminRepository.deleteUser(userId);
  }
  public async deleteInvite(data: unknown, credentials: UserCredentials | undefined) {
    if (!credentials) throw ApiError.InvalidJWT();
    if (credentials.role !== "admin") throw ApiError.InsufficientPrivileges();
    const { inviteId } = parseDeleteInviteRequest(data);
    return this.adminRepository.deleteInvite(inviteId);
  }

  public async getInvites(credentials: UserCredentials | undefined) {
    if (!credentials) throw ApiError.InvalidJWT();
    if (credentials.role !== "admin") throw ApiError.InsufficientPrivileges();
    return this.adminRepository.getInvites();
  }

  public async renameInvite(data: unknown, credentials: UserCredentials | undefined) {
    if (!credentials) throw ApiError.InvalidJWT();
    if (credentials.role !== "admin") throw ApiError.InsufficientPrivileges();
    const { name, inviteId } = parseRenameInviteRequest(data);
    return this.adminRepository.renameInvite(inviteId, name);
  }
}

export const adminService = new AdminService(new AdminRepository());
