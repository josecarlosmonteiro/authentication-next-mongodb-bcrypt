'use server'

import { createSession } from "@/app/libs/sessions";
import { UserModel } from "@/app/models/user";
import connectDb from "@/app/utils/db";
import bcrypt from 'bcryptjs';

export async function login(_prevState: unknown, formData: FormData) {
  const email = formData.get('email')?.toString() || "";
  const password = formData.get('password')?.toString() || "";

  try {
    if (!email.trim() || !password.trim())
      throw new Error("Preencha todos os campos!");

    const hashPass = await bcrypt.hash(password, 10);
    const payload = { email, password: hashPass };

    await connectDb();
    const user = await UserModel.findOne({ email: payload.email });

    if (!user)
      throw new Error('Usuário ou senha incorretos');

    const correctPass = await bcrypt.compare(payload.password, user.password);
    console.log("🚀 ~ login ~ correctPass:", correctPass);

    if (!!correctPass)
      throw new Error("Usuário ou senha incorretos")

    await createSession(user._id, user.username);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { message: error.message };
  }
}