"use client";

import { usePathname, useSearchParams } from "next/navigation";
import QuoteGNB from "./QuoteGNB";

export default function QuoteGNBWrapper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const initialTab = tab ? Number(tab) : 0;

  if (pathname === "/mover/my-quote") {
    return (
      <QuoteGNB
        tabs={[
          { id: 0, label: "보낸 견적 조회" },
          { id: 1, label: "반려 요청" },
        ]}
        initialTab={initialTab}
      />
    );
  }

  if (pathname === "/my-quote") {
    return (
      <QuoteGNB
        tabs={[
          { id: 0, label: "대기 중인 견적" },
          { id: 1, label: "받았던 견적" },
        ]}
        initialTab={initialTab}
      />
    );
  }

  if (pathname === "/me/review") {
    return (
      <QuoteGNB
        tabs={[
          { id: 0, label: "작성 가능한 리뷰" },
          { id: 1, label: "내가 작성한 리뷰" },
        ]}
        initialTab={initialTab}
      />
    );
  }

  if (pathname === "/me/mover") {
    return <QuoteGNB tabs={[{ id: 0, label: "찜한 기사님" }]} initialTab={0} />;
  }

  return null;
}
