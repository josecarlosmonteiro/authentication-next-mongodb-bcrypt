import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/libs/sessions";
import { myCookie } from "./app/constants/session";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

async function verifySession(cookieStore: ReadonlyRequestCookies) {
  const cookie = await cookieStore.get(myCookie.name)?.value || "";
  const session = await decrypt(cookie);

  return !!session?.userId;
}

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ['/dashboard'];
  const authPaths = ['/login', '/cadastro'];

  const currentPath = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(currentPath);
  const isAuthRoute = authPaths.includes(currentPath);

  const cookieStore = await cookies();
  const isAuthenticated = await verifySession(cookieStore);

  if (isProtectedRoute && !isAuthenticated)
    return NextResponse.redirect(new URL("/login", req.nextUrl));

  if (isAuthRoute && isAuthenticated)
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));

  return NextResponse.next();
}