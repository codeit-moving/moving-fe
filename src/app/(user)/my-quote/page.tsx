"use client";

import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PendingRequestCard from "@/components/cards/PendingRequestCard";
import { fetchPendingQuotes } from "@/api/pendingQuote";
import ExpiredRequests from "./expiredRequests";
import { confirmQuote } from "@/api/quote";

interface MovingRequest {
  service: number;
  movingDate: string;
  pickupAddress: string;
  dropOffAddress: string;
  requestDate: string;
  status?: string;
}

interface Mover {
  id: number;
  nickname: string;
  imageUrl: string | null;
  career: number;
  introduction: string;
  isDesignated: boolean;
  isFavorite: boolean;
  rating: {
    average: number;
    totalCount: number;
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
  reviewCount: number;
  confirmCount: number;
  favoriteCount: number;
}

export interface Quote {
  id: number;
  cost: number;
  movingRequest: MovingRequest;
  mover: Mover;
}

interface PendingRequestData {
  quoteId: number;
  id: number;
  nickname: string;
  career: number;
  isDesignated: boolean;
  rating: Mover["rating"];
  reviewCount: number;
  cost: number;
  confirmCount: number;
  favoriteCount: number;
  status?: string;
  pickupAddress: string;
  dropOffAddress: string;
  movingDate: string;
  requestDate: string;
  service: number;
  isFavorite: boolean;
  imageUrl: string | null;
  introduction: string;
}

const MyQuotePage = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "0";

  useEffect(() => {
    const fetchQuotes = async () => {
      if (tab === "1") {
        setLoading(false);
        return;
      }

      try {
        const { list } = await fetchPendingQuotes();
        setQuotes(list);
        setErrorMessage(null);
      } catch (error: any) {
        console.log("Error object structure:", JSON.stringify(error, null, 2));
        console.error("Error fetching quotes:", error);

        // Axios 에러의 경우 status code로 체크
        if (error.name === "AxiosError" && error.response?.status === 404) {
          setQuotes([]);
          setErrorMessage(null); // 404는 정상적인 "데이터 없음" 상태로 처리
        } else {
          setErrorMessage("견적 정보를 불러오는데 실패했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [tab]);

  const handleConfirmClick = async (quoteId: number) => {
    try {
      await confirmQuote(quoteId);
      toast.success("견적이 성공적으로 확정되었습니다.", {
        duration: 3000,
      });
    } catch (error) {
      console.error("견적서 확정 실패:", error);
      toast.error("견적서 확정에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">로딩중...</div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {errorMessage}
      </div>
    );
  }

  const pendingRequests: PendingRequestData[] = quotes.map((quote) => ({
    quoteId: quote.id,
    id: quote.mover.id,
    nickname: quote.mover.nickname,
    career: quote.mover.career,
    isDesignated: quote.mover.isDesignated,
    rating: quote.mover.rating,
    reviewCount: quote.mover.reviewCount,
    cost: quote.cost,
    confirmCount: quote.mover.confirmCount,
    favoriteCount: quote.mover.favoriteCount,
    status: quote.movingRequest.status,
    pickupAddress: quote.movingRequest.pickupAddress,
    dropOffAddress: quote.movingRequest.dropOffAddress,
    movingDate: quote.movingRequest.movingDate,
    requestDate: quote.movingRequest.requestDate,
    service: quote.movingRequest.service,
    isFavorite: quote.mover.isFavorite,
    imageUrl: quote.mover.imageUrl,
    introduction: quote.mover.introduction,
  }));

  const handleCardClick = (quoteId: number) => {
    window.location.href = `/my-quote/${quoteId}`;
  };

  return (
    <div className="max-w-[1400px] mx-auto my-[16px] pc:my-[24px]">
      {tab === "0" && (
        <>
          {quotes.length > 0 ? (
            <ul className="grid grid-cols-1 gap-[24px] tablet:gap-[32px] pc:grid-cols-2 pc:gap-x-[24px] pc:gap-y-[48px]">
              {pendingRequests.map((request) => (
                <PendingRequestCard
                  key={request.quoteId}
                  data={request}
                  onPrimaryClick={() => handleConfirmClick(request.quoteId)}
                  onOutlinedClick={() => handleCardClick(request.quoteId)}
                />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center min-h-[200px] text-gray-500">
              활성중인 이사요청이 없습니다.
            </div>
          )}
        </>
      )}

      {tab === "1" && <ExpiredRequests />}
    </div>
  );
};

export default MyQuotePage;
