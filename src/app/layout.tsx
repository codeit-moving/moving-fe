import type { Metadata } from "next";
import GNB from "@/components/layout/GNB";
import localFont from "next/font/local";
import "./globals.css";
import QuoteGNBWrapper from "@/components/layout/QuoteGNBWrapper";
import cn from "@/config/cn";
import { Toaster } from "react-hot-toast";
import TanstackQueryClientProvider from "@/contexts/queryClientProvider";
import NiceModalProvider from "@/components/NiceModalProvider";
import MSWComponent from "@/components/layout/MswComponent";
import { isDevelopment } from "@/utils/env";
import ReactQueryDevtoolsClient from "@/components/ReactQueryDevtoolsClient";
import NiceModalRegistry from "@/components/layout/NiceModalRegistry";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const globalStyles = "text-black-400";

export const metadata: Metadata = {
  title: "무빙",
  description: "이사 소비자와 이사 전문가 매칭 서비스",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={cn(
          `${pretendard.variable} font-pretendard antialiased`,
          globalStyles
        )}
      >
        <MSWComponent>
          <NiceModalProvider>
            <TanstackQueryClientProvider>
              <GNB />
              <QuoteGNBWrapper />
              {children}
              <NiceModalRegistry />
              <Toaster />
              {isDevelopment() && <ReactQueryDevtoolsClient />}
              {/* Development 환경에서만 렌더링 */}
            </TanstackQueryClientProvider>
          </NiceModalProvider>
        </MSWComponent>
      </body>
    </html>
  );
}
