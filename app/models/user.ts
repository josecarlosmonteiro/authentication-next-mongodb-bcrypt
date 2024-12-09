import mongoose from 'mongoose';
import { TUser } from '../types/user';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}, { timestamps: true });

export const UserModel = mongoose.models.User || mongoose.model<TUser>('User', userSchema);