import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/config/clsx";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

//global로 필요한거 있으면 여기에 넣을께요
const globalStyles = "text-black-400";

export const metadata: Metadata = {
  title: "무빙",
  description: "이사 소비자와 이사 전문가 매칭 서비스",
  icons: {
    icon: "/public/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(pretendard.variable, "antialiased", globalStyles)}>
        {children}
      </body>
    </html>
  );
}
