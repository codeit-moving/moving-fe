"use client";

import MoverInfoCard from "@/components/cards/MoverInfoCard";
import CheckboxChip from "@/components/common/checkboxs/CheckboxChip";
import { useParams } from "next/navigation";
import LineSeparator from "@/components/common/LineSeparator";
import { SERVICE_TEXTS } from "@/variables/service";
import { REGION_TEXTS } from "@/variables/regions";
import QuoteButtonGroup from "@/components/common/QuoteButtonGroup";
import ShareButtons from "@/components/common/ShareButtons";
import cn from "@/config/cn";
import { useGetMoverDetail } from "@/api/query-hooks/mover";
import Loader from "@/components/common/Loader";
import MoversReviewList from "@/components/review/MoversReviewList";
import { useFavoriteMutation } from "@/api/mutation-hooks/mover";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import QuoteRequestModal from "@/components/modals/QuoteRequestModal";
import { useDesignatedMoverMutation } from "@/api/mutation-hooks/movingRequest";
import BackDrop from "@/components/modals/BackDrop";
import { Metadata, ResolvingMetadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: { moverId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const moverId = params.moverId;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movers/${moverId}`
    );
    const data = await response.json();

    // 서비스 지역을 문자열로 변환
    const regions = data.regions
      .slice(0, 3) // 최대 3개까지만 표시
      .map(
        (region: number) => REGION_TEXTS[region as keyof typeof REGION_TEXTS]
      )
      .join(", ");

    // 제공 서비스를 문자열로 변환
    const services = data.services
      .slice(0, 3) // 최대 3개까지만 표시
      .map(
        (service: number) =>
          SERVICE_TEXTS[service as keyof typeof SERVICE_TEXTS]
      )
      .join(", ");

    const title = `${data.nickname} - ${data.career}년 경력 이사 전문가`;

    // 리뷰 정보 구성
    const reviewInfo =
      data.rating.totalCount > 0
        ? `평균 평점 ${data.rating.average.toFixed(1)}점 (${
            data.rating.totalCount
          }개의 리뷰)`
        : "";

    const description = [
      `${data.description || data.introduction || ""}`,
      `경력 ${data.career}년`,
      `서비스: ${services}`,
      `활동지역: ${regions}`,
      reviewInfo,
    ]
      .filter(Boolean)
      .join(" | ");

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "profile",
        images: data.imageUrl ? [data.imageUrl] : [],
      },
      twitter: {
        card: "summary",
        title,
        description,
        images: data.imageUrl ? [data.imageUrl] : [],
      },
    };
  } catch (error) {
    // 에러 시 기본 메타데이터 반환
    return {
      title: "이사 전문가 프로필 - 무빙",
      description: "믿을 수 있는 이사 전문가를 찾아보세요",
    };
  }
}

const styles = {
  mainContainer: "flex flex-col items-center",
  topContainer: `mb-[110px] w-full pc:mb-0 pc:flex pc:flex-row pc:justify-between pc:max-w-[1400px] pc:gap-[10px]`,
  container:
    "flex flex-col gap-[24px] pc:gap-[40px] pc:max-w-[955px] pc:w-full",
  pcShareContainer: "hidden pc:flex pc:flex-col pc:gap-[40px] pc:min-w-[354px]",
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

const QuoteRequestModal_ = NiceModal.create(() => {
  const modal = useModal();

  return (
    <BackDrop>
      <QuoteRequestModal onClose={() => modal.remove()} />
    </BackDrop>
  );
});

NiceModal.register("QuoteRequestModal", QuoteRequestModal_);

export default function MoverDetailPage() {
  const { moverId } = useParams();

  const moverIdNum = Number(moverId);

  const { data, isPending, isError } = useGetMoverDetail(moverIdNum);
  const { mutate, isPending: isFavoriting } = useFavoriteMutation();
  const { mutate: toggleDesignatedMover, isPending: isDesignating } =
    useDesignatedMoverMutation();

  if (isPending) {
    return <Loader msg="기사님 상세 정보 불러오는중" />;
  }

  if (isError || !data) {
    return null;
  }

  const handleFavorite = async () => {
    if (isFavoriting) return;
    mutate({ moverId: moverIdNum, isFavorite: !data.isFavorite });
  };

  const handleQuoteRequest = async () => {
    toggleDesignatedMover({
      moverId: moverIdNum,
      isDesignated: data.isDesignated as boolean,
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topContainer}>
        <div className={styles.container}>
          <MoverInfoCard data={data} className="pc:w-full" />
          <div className={styles.shareContainer}>
            <LineSeparator direction="horizontal" />
            <ShareButtons
              variant="mover"
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
          <MoversReviewList totalRating={data.rating} moverId={moverIdNum} />
        </div>
        <div className={styles.pcShareContainer}>
          <QuoteButtonGroup
            isPc={true}
            isFavorite={data.isFavorite}
            disabled={data.isDesignated as boolean}
            moverNickname={data.nickname}
            buttonText={cn(
              data.isDesignated ? "지정 견적 요청 취소" : "지정 견적 요청하기",
              isDesignating && "loading..."
            )}
            onFavoriteClick={handleFavorite}
            onButtonClick={handleQuoteRequest}
          />
          <LineSeparator direction="horizontal" />
          <ShareButtons
            variant="mover"
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
        isFavorite={data.isFavorite}
        onFavoriteClick={handleFavorite}
        onButtonClick={handleQuoteRequest}
        disabled={data.isDesignated as boolean}
        buttonText={
          isDesignating
            ? "로딩중..."
            : data.isDesignated
            ? "지정 견적 요청 취소"
            : "지정 견적 요청하기"
        }
      />
    </div>
  );
}
