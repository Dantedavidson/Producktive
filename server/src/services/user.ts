import User, { UserDocument, UserDetails } from '../models/user';

export async function createUser(input: UserDetails) {
  return User.create(input);
}

export async function findUser(id: string) {
  return User.findOne({ username: id });
}

export async function findAllUsers() {
  return User.find();
}

export async function deleteUser(id: string) {
  return User.deleteOne({ username: id });
}

export async function deleteAllUsers() {
  return User.deleteMany();
}
