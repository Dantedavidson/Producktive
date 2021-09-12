import User, { UserDocument, UserDetails } from '../models/user';

export async function create(input: UserDetails) {
  return User.create(input);
}

export async function find(id: string) {
  return User.findOne({ username: id });
}

export async function findAll() {
  return User.find();
}

export async function remove(id: string) {
  return User.deleteOne({ id: id });
}

export async function removeAll() {
  return User.deleteMany();
}
