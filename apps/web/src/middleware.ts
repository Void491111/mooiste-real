import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "mooiste_session";
const PUBLIC_PATHS = ["/login"];

export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has(COOKIE_NAME);
  const isPublic = PUBLIC_PATHS.includes(request.nextUrl.pathname);

  if (!hasSession && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasSession && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|logo.png).*)"],
};