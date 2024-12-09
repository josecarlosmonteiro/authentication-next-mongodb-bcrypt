import { Document } from "mongoose";

export interface TUser extends Document {
  username: string;
  email: string;
  password: string;
}

export type TUserSignupForm = {
  username: string;
  email: string;
  password: string;
}