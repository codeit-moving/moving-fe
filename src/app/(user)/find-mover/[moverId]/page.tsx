"use client";

import MoverInfoCard from "@/components/cards/MoverInfoCard";
import CheckboxChip from "@/components/common/checkboxs/CheckboxChip";
import { useParams } from "next/navigation";
import LineSeparator from "@/components/common/LineSeparator";
import { SERVICE_TEXTS } from "@/variables/service";
import { REGION_TEXTS } from "@/variables/regions";
import { useState } from "react";
import QuoteButtonGroup from "@/components/common/QuoteButtonGroup";
import ShareButtons from "@/components/common/ShareButtons";
import { usePathname, useSearchParams } from "next/navigation";

import { useGetMoverDetail } from "@/api/query-hooks/mover";
import Loader from "@/components/common/Loader";
import MoversReviewList from "@/components/review/MoversReviewList";

const styles = {
  topContainer: "pc:flex pc:flex-row pc:gap-[90px] pc:justify-center",
  container: "flex flex-col gap-[24px] pc:gap-[40px] pc:max-w-[920px]",
  pcShareContainer:
    "hidden pc:whitespace-nowrap pc:flex pc:flex-col pc:gap-[40px]",
  shareContainer: "flex flex-col gap-[24px] pc:hidden",
  shareText: "text-lg font-semibold text-black-400 pc:text-xl",
  contentContainer: "flex flex-col gap-[16px] pc:gap-[32px]",
  title: "text-lg font-bold text-black-400 pc:text-2xl",
  description: "text-md text-black-400 pc:text-2lg",
  serviceContainer:
    "w-[300px] flex flex-wrap gap-[8px] tablet:w-[450px] pc:gap-[16px]",
  baseH2: "text-lg font-bold text-black-400 pc:my-[32px] pc:text-2xl",
  emptyContainer:
    "flex flex-col items-center justify-center gap-[24px] p-[80px] mb-auto text-lg text-grayscale-400",
};

export default function MoverDetailPage() {
  const { moverId } = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fullUrl = `${pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  console.log(fullUrl);

  const { data, isPending, isError } = useGetMoverDetail(Number(moverId));
  const [isDesignated, setIsDesignated] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);
      // API 호출 로직
      // await favoriteAPI(moverId);
    } catch (error) {
      // 에러 처리
    }
  };

  const handleQuoteRequest = async () => {
    try {
      setIsDesignated(!isDesignated);
      // await requestQuote(moverId);
    } catch (error) {
      // 에러 처리
    }
  };

  if (isPending) {
    return <Loader msg="기사님 상세 정보 불러오는중" />;
  }

  if (isError || !data) {
    return null;
  }

  return (
    <>
      <div className={styles.topContainer}>
        <div className={styles.container}>
          <MoverInfoCard data={data} />
          <div className={styles.shareContainer}>
            <LineSeparator direction="horizontal" />
            <ShareButtons
              variant="mover"
              url={fullUrl}
              moverInfo={{
                favoriteCount: data.favoriteCount,
                reviewCount: data.reviewCount,
                description: data.description,
                nickname: data.nickname,
              }}
            />
          </div>
          <LineSeparator direction="horizontal" />
          <div className={styles.contentContainer}>
            <p className={styles.title}>상세설명</p>
            <p className={styles.description}>{data.description}</p>
          </div>
          <LineSeparator direction="horizontal" />
          <div className={styles.contentContainer}>
            <p className={styles.title}>제품 서비스</p>
            <div className={styles.serviceContainer}>
              {data.services.map((service: number) => (
                <CheckboxChip
                  key={service}
                  text={SERVICE_TEXTS[service as keyof typeof SERVICE_TEXTS]}
                  state={true}
                  disabled={true}
                />
              ))}
            </div>
          </div>
          <LineSeparator direction="horizontal" />
          <div className={styles.contentContainer}>
            <p className={styles.title}>서비스 가능 지역</p>
            <div className={styles.serviceContainer}>
              {data.regions.map((region: number) => (
                <CheckboxChip
                  key={region}
                  text={REGION_TEXTS[region as keyof typeof REGION_TEXTS]}
                  state={true}
                  disabled={true}
                />
              ))}
            </div>
          </div>
          <LineSeparator direction="horizontal" />
          <MoversReviewList
            totalRating={data.rating}
            moverId={Number(moverId)}
          />
        </div>

        <div className={styles.pcShareContainer}>
          <QuoteButtonGroup
            isPc={true}
            isFavorite={isFavorite}
            disabled={isDesignated}
            moverNickname={data.nickname}
            buttonText={
              isDesignated ? "지정 견적 요청 완료" : "지정 견적 요청하기"
            }
            onFavoriteClick={handleFavorite}
            onButtonClick={handleQuoteRequest}
          />
          <LineSeparator direction="horizontal" />
          <ShareButtons
            variant="mover"
            url={fullUrl}
            moverInfo={{
              favoriteCount: data.favoriteCount,
              reviewCount: data.reviewCount,
              description: data.description,
              nickname: data.nickname,
            }}
          />
        </div>
      </div>
      <QuoteButtonGroup
        isFavorite={isFavorite}
        disabled={isDesignated}
        onFavoriteClick={handleFavorite}
        onButtonClick={handleQuoteRequest}
        buttonText={isDesignated ? "지정 견적 요청 완료" : "지정 견적 요청하기"}
      />
    </>
  );
}
