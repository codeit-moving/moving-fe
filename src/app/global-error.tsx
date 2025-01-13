"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Home } from "lucide-react";
import Image from "next/image";
import assets from "@/variables/images";
import localFont from "next/font/local";
import cn from "@/config/cn";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "block",
  weight: "45 920",
  variable: "--font-pretendard",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body
        className={cn(
          `${pretendard.variable} font-pretendard antialiased`,
          "text-black-400"
        )}
      >
        <main className="h-screen w-full flex items-center justify-center relative overflow-hidden">
          <div className="relative z-10 text-center px-4 py-16 max-w-2xl mx-auto">
            <div className="w-32 h-32 pc:w-64 pc:h-64 mx-auto mb-3 motion-safe:animate-bounce">
              <Image
                src={assets.images.movingTruck}
                alt="moving truck"
                width={0}
                height={0}
                fill
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-grayscale-500">
              앗! 길을 잃었어요!
            </h1>

            <h2 className="text-xl md:text-2xl font-medium mb-6 text-grayscale-300">
              오류가 발생했어요.
            </h2>

            <p className="text-lg md:text-xl mb-12 text-gray-600">
              우리 트럭이 길을 잘못 들었나 봐요... 🚛
              <br />
              잠시 후 다시 시도해 주세요.
            </p>

            <button
              onClick={() => reset()}
              aria-label="새로고침"
              className="inline-flex items-center px-6 py-3 bg-pr-blue-300 text-white rounded-lg 
                        font-medium transition-transform hover:scale-105 focus:outline-none 
                        focus:ring-2 focus:ring-pr-blue-200 focus:ring-offset-2"
            >
              <Home className="w-5 h-5 mr-2" />
              새로고침
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
