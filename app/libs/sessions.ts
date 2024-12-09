import 'server-only';

import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { redirect } from 'next/navigation';
import { myCookie } from '../constants/session';
import { cookies } from 'next/headers';

const key = new TextEncoder().encode(process.env.SESSION_KEY || "");

const alg = 'HS256';

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, { algorithms: [alg] });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string, username: string) {
  const expires = new Date(Date.now() + myCookie.duration);
  const session = await encrypt({ userId, username, expires });

  const cookieStore = await cookies();
  cookieStore.set(myCookie.name, session, { ...myCookie.options, expires });
  redirect('/dashboard');
}

export async function verifySession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(myCookie.name)?.value;
  const session = await decrypt(cookie || "");

  if (!session?.userId)
    redirect('/login');

  return ({
    userId: session.userId as string,
    username: session.username as string
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(myCookie.name);
  redirect('/login');
}