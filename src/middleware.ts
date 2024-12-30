import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 로그인된 사용자가 접근하면 안 되는 페이지
const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/mover/auth/login",
  "/mover/auth/register",
  "/me/profile",
  "/mover/profile",
  "/oauth/kakao",
  "/oauth/kakao/callback",
  "/oauth/google",
  "/oauth/google/callback",
  "/oauth/naver",
  "/oauth/naver/callback",
];

// 보호된 라우트 (로그인 필요)
const protectedRoutes = [
  "/mover/info-edit",
  "/mover/my-page",
  "/mover/my-quote",
  "/mover/profile-edit",
  "/mover/request",
  "/request",
  "/me/info-edit",
  "/me/mover",
  "/me/profile-edit",
  "/me/review",
  "/my-quote",
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieHeader = request.headers.get("cookie");
  const hasTokens =
    cookieHeader?.includes("accessToken") ||
    cookieHeader?.includes("refreshToken");

  // 이미 로그인된 사용자의 인증 페이지 접근 제한
  if (authRoutes.includes(pathname) && hasTokens) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // mover 페이지 접근 시 (register와 profile 페이지는 제외)
  if (
    pathname.startsWith("/mover") &&
    !pathname.startsWith("/mover/auth/register") &&
    pathname !== "/mover/profile" &&
    !pathname.startsWith("/mover/auth/login")
  ) {
    if (!hasTokens) {
      return NextResponse.redirect(new URL("/mover/auth/login", request.url));
    }
  }

  // 일반 보호된 라우트
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!hasTokens) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|oauth/*/callback).*)",
  ],
};
