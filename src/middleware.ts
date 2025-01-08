import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 로그인된 사용자가 접근하면 안 되는 페이지
const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/mover/auth/login",
  "/mover/auth/register",
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

  // OAuth 콜백 처리 추가
  if (pathname.startsWith("/oauth") && pathname.includes("/callback")) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${pathname}?code=${code}&state=${state}`,
        {
          credentials: "include",
          redirect: "manual",
        }
      );

      // 백엔드에서 보낸 쿠키 처리
      const cookies = response.headers.getSetCookie();

      const responseClone = response.clone();

      try {
        // 먼저 JSON 파싱 시도
        const responseData = await response.json();
        if (responseData.data?.redirect === true) {
          const redirectUrl = new URL(
            responseData.data.redirectUrl,
            request.url
          );
          redirectUrl.searchParams.set("oauth", "true");
          redirectUrl.searchParams.set("toastType", "info");
          redirectUrl.searchParams.set(
            "toastMessage",
            "소셜 로그인을 위해 추가 정보를 입력해주세요."
          );
          const res = NextResponse.redirect(redirectUrl);
          cookies.forEach((cookie) => {
            res.headers.append("Set-Cookie", cookie);
          });
          return res;
        }
      } catch (jsonError) {
        // JSON 파싱 실패 시 일반 리다이렉트 처리
        if (responseClone.status === 302 || responseClone.status === 301) {
          const redirectUrl = new URL(
            response.headers.get("location") || "/",
            request.url
          );
          redirectUrl.searchParams.set("toastType", "success");
          redirectUrl.searchParams.set("toastMessage", "로그인되었습니다.");
          const res = NextResponse.redirect(redirectUrl);
          cookies.forEach((cookie) => {
            res.headers.append("Set-Cookie", cookie);
          });
          return res;
        }
      }
    } catch (error) {
      console.error("OAuth 콜백 처리 에러:", error);
      const redirectUrl = new URL("/", request.url);
      redirectUrl.searchParams.set("toastType", "error");
      redirectUrl.searchParams.set(
        "toastMessage",
        "소셜 로그인 중 오류가 발생했습니다. 다시 시도해주세요."
      );
      return NextResponse.redirect(redirectUrl);
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Host", process.env.NEXT_PUBLIC_API_URL || "");

  // 이미 로그인된 사용자의 인증 페이지 접근 제한
  if (authRoutes.includes(pathname) && hasTokens) {
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("toastType", "warning");
    redirectUrl.searchParams.set("toastMessage", "이미 로그인되어 있습니다.");
    return NextResponse.redirect(redirectUrl);
  }

  // mover 페이지 접근 시
  if (
    pathname.startsWith("/mover") &&
    !pathname.startsWith("/mover/auth/register") &&
    !pathname.startsWith("/mover/profile") &&
    !pathname.startsWith("/mover/auth/login")
  ) {
    if (!hasTokens) {
      const url = new URL("/mover/auth/login", request.url);
      url.searchParams.set("from", "protected"); // 단순히 출처만 표시
      return NextResponse.redirect(url);
    }
  }

  // 일반 보호된 라우트
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!hasTokens) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("toastType", "error");
      url.searchParams.set(
        "toastMessage",
        "해당 서비스 이용을 위해 로그인이 필요합니다."
      );
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
