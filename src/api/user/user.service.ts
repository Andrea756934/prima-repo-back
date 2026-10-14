import { userExistsError } from "../../errors/user-exists.error";
import { userIdentityModel } from "../../lib/auth/local/user-identity.model";
import { Role, User } from "./user.entity";
import { userModel } from "./user.model";
import * as bcrypt from 'bcrypt';

export class userService {
  async add(
    user: Omit<User, 'id' | 'fullName'>,
    credentials: { username: string, password: string }): Promise<User> {
    const existingIdentity = await userIdentityModel.findOne({ 'credentials.username': credentials.username });
    if (existingIdentity) {
      throw new userExistsError();
    }

    const newUser = await userModel.create(user);

    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    await userIdentityModel.create({
      provider: 'local',
      user: newUser,
      credentials: {
        username: credentials.username,
        hashedPassword
      }
    });

    return newUser;
  }

  async find(role?: Role): Promise<User[]> {
    const filter = role ? { role } : {};
    const user = await userModel.find(filter);
    return user;
  }
}

export default new userService();