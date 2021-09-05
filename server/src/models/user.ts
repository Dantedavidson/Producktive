import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDetails {
  username: string;
  password: string;
  board: string;
}

export interface UserDocument extends UserDetails, mongoose.Document {
  comparePasswords(compare: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
});

userSchema.pre('save', async function (this: UserDocument, next: any) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;

  return next();
});

userSchema.methods.comparePasswords = async function (
  compare: string
): Promise<boolean> {
  const user = this as UserDocument;
  console.log(compare, user.password);
  return bcrypt.compare(compare, user.password).catch(e => false);
};

export default mongoose.model<UserDocument>('User', userSchema);
