import User, { UserDocument, UserDetails } from '../models/user';

export async function createUser(input: UserDetails) {
  return User.create(input);
}
