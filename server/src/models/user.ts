import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Board from './board';
import Joi from 'joi';

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
    min: 5,
    max: 25,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 25,
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
userSchema.pre('deleteOne', async function (this: UserDocument, next: any) {
  try {
    console.log('got this far');
    const board = await Board.deleteOne({ id: this.board });
    console.log(board);
    return next();
  } catch (err) {
    console.log(err);
    return next();
  }
});

userSchema.methods.comparePasswords = async function (
  compare: string
): Promise<boolean> {
  const user = this as UserDocument;
  console.log(compare, user.password);
  return bcrypt.compare(compare, user.password).catch(e => false);
};

export const validateUser = (user: UserDetails) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(24).required(),
    password: Joi.string().min(5).max(24).required(),
    board: Joi.string().required(),
  });
  return schema.validate(user);
};

export default mongoose.model<UserDocument>('User', userSchema);
