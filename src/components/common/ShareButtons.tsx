"use client";
import { useEffect } from "react";
import Image from "next/image";
import assets from "@/variables/images";
import toast from "react-hot-toast";
import { formatDateWithDay } from "@/utils/utilFunctions";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

interface MoverInfo {
  favoriteCount: number;
  reviewCount: number;
  description?: string;
  nickname: string;
}

interface QuoteInfo {
  cost: number;
  dropOffAddress: string;
  movingDate: string;
  pickupAddress: string;
}

interface ShareButtonsProps {
  variant: "mover" | "quote";
  moverInfo?: MoverInfo;
  quoteInfo?: QuoteInfo;
}

const TEMPLATE_IDS = {
  mover: 115247,
  quote: 115261,
} as const;

const ShareButtons = ({ variant, moverInfo, quoteInfo }: ShareButtonsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fullUrl = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}${pathname}`;
  }, [pathname, searchParams]);

  const heading =
    variant === "mover"
      ? "나만 알기엔 아쉬운 기사님인가요?"
      : "견적서 공유하기";

  console.log("fullUrl", fullUrl);
  console.log("pathname", pathname);

  useEffect(() => {
    const scriptId = "kakao-sdk";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          if (!process.env.NEXT_PUBLIC_KAKAO_JS_KEY) {
            console.error("Kakao JS Key is missing");
            return;
          }
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        }
      };
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);

      toast.success("링크가 복사되었습니다.");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("링크 복사에 실패했습니다.");
    }
  };

  const handleKakaoShare = () => {
    if (!window.Kakao?.Share) {
      console.error("Kakao SDK not loaded");
      return;
    }

    const templateArgs =
      variant === "mover"
        ? {
            favorite: String(moverInfo?.favoriteCount),
            review: String(moverInfo?.reviewCount),
            description: moverInfo?.description || "",
            name: moverInfo?.nickname || "아무개",
            PATH: pathname,
            REGI_WEB_DOMAIN: fullUrl,
          }
        : {
            cost: String(`${quoteInfo?.cost.toLocaleString()}원` || ""),
            dropoff: quoteInfo?.dropOffAddress || "",
            moving_date: quoteInfo?.movingDate
              ? formatDateWithDay(quoteInfo.movingDate)
              : "",
            pickup: quoteInfo?.pickupAddress || "",
            PATH: pathname,
            REGI_WEB_DOMAIN: fullUrl,
          };

    try {
      window.Kakao.Share.sendCustom({
        templateId: TEMPLATE_IDS[variant],
        templateArgs,
      });
    } catch (error) {
      console.error("Kakao share error:", error);
    }
  };

  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      fullUrl
    )}`;
    window.open(shareUrl, "_blank");
  };

  const styles = {
    images: "w-[40px] h-[40px] pc:w-[64px] pc:h-[64px]",
  };

  return (
    <section className="flex flex-col gap-2 pc:gap-[22px]">
      <h2 className="text-lg font-semibold pc:text-xl">{heading}</h2>
      <div className="flex items-center gap-4">
        <button onClick={handleCopyLink}>
          <Image
            src={assets.icons.shareClipboard}
            alt="링크 복사"
            width={40}
            height={40}
            className={styles.images}
          />
        </button>
        <button onClick={handleKakaoShare}>
          <Image
            src={assets.icons.shareKakao}
            alt="카카오톡 공유"
            width={40}
            height={40}
            className={styles.images}
          />
        </button>
        <button onClick={handleFacebookShare}>
          <Image
            src={assets.icons.shareFacebook}
            alt="페이스북 공유"
            width={40}
            height={40}
            className={styles.images}
          />
        </button>
      </div>
    </section>
  );
};

export default ShareButtons;
