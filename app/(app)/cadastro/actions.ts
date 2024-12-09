'use server'

import { createSession } from '@/app/libs/sessions';
import { UserModel } from '@/app/models/user';
import { TUser } from '@/app/types/user';
import connectDb from '@/app/utils/db';
import bcrypt from 'bcryptjs';

export async function signUp(_prevState: unknown, formData: FormData) {
  const username = formData.get('username')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!username || !email || !password)
    return { message: "Preencha todos os campos!" };

  const hashPass = await bcrypt.hash(password, 10);

  const payload = {
    username,
    email,
    password: hashPass,
  }

  await connectDb();

  const prev = await UserModel.find({ email: payload.email });

  if (!!prev.length)
    return { message: "Este email já está em uso." };

  const newUser = await UserModel.create<TUser>(payload);
  await createSession(newUser._id.toString(), newUser.username);
}