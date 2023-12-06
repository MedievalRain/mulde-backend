import { UserRepository } from "./userRepository";
import { parseAuthRequest } from "./userValidations";
import * as bcrypt from "bcrypt";

class UserService {
  constructor(private userRepository: UserRepository) {}

  public async createUser(data: unknown) {
    const { email, password } = parseAuthRequest(data);
    const passwordHash = await bcrypt.hash(password, 10);
    return this.userRepository.createUser(email, passwordHash, "user");
  }
}
export const userService = new UserService(new UserRepository());
