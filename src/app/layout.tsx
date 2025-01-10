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
import Toast from "@/components/Toast";
import { NavigationEvents } from "@/components/NavigationEvents";
import { NavigationProgress } from "@/components/NavigationProgress";
import { Suspense } from "react";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "block",
  weight: "45 920",
  variable: "--font-pretendard",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const globalStyles = "text-black-400";

export const metadata: Metadata = {
  title: "무빙",
  description: "이사 소비자와 이사 전문가 매칭 서비스",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
          <TanstackQueryClientProvider>
            <Suspense fallback={null}>
              <NiceModalProvider>
                <NavigationEvents />
                <NavigationProgress />
                <GNB />
                <QuoteGNBWrapper />
                {children}
                <NiceModalRegistry />
                <Toaster />
                <Toast />
                {isDevelopment() && <ReactQueryDevtoolsClient />}
              </NiceModalProvider>
            </Suspense>
          </TanstackQueryClientProvider>
        </MSWComponent>
      </body>
    </html>
  );
}
