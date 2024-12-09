'use server'

import { UserModel } from "@/app/models/user";
import connectDb from "@/app/utils/db"

export async function getUsers() {
  await connectDb();

  const response = await UserModel.find();

  return response;
}