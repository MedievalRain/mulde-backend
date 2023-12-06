import { ApiError } from "../../errors/ApiError";
import { UserCredentials } from "../../types";
import { AdminRepository } from "./adminRepository";
import { parseCreateInviteRequest } from "./adminValidation";

class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  public async createInvite(data: unknown, credentials: UserCredentials | undefined) {
    if (!credentials) throw ApiError.InvalidJWT();
    if (credentials.role !== "admin") throw ApiError.InsufficientPrivileges();
    const { name } = parseCreateInviteRequest(data);
    return this.adminRepository.createInvite(name);
  }
}

export const adminService = new AdminService(new AdminRepository());
