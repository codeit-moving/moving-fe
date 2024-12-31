"use client";

import ConfirmedQuoteCard from "@/components/cards/ConfirmedQuoteCard";
import { useParams } from "next/navigation";
import LineSeparator from "@/components/common/LineSeparator";
import { formatCost } from "@/utils/formatCost";
import QuoteDetailInfo from "@/components/request/QuoteDetailInfo";
import ShareButtons from "@/components/common/ShareButtons";
import { usePathname, useSearchParams } from "next/navigation";
import { useGetSentQuoteDetail } from "@/api/query-hooks/quote";
import Loader from "@/components/common/Loader";
import Message from "@/components/common/Message";

const styles = {
  topContainer:
    "mb-[110px] tablet:mb-[72px] pc:flex pc:flex-row pc:gap-[117px] pc:justify-center",
  title:
    "text-2lg font-semibold text-black-400 pb-[6px] pc:text-2xl pc:pb-[30px]",
  container: "flex flex-col gap-[24px]",
  pcShareContainer: "hidden pc:block ",
  shareContainer: "pc:hidden",
  shareText: "text-lg font-semibold text-black-400 pc:text-xl",
  costContainer: "flex flex-col gap-[16px] pc:gap-[32px]",
  costText: "text-lg font-semibold text-black-400 pc:text-xl",
  costValue: "text-xl font-bold text-black-400 pc:text-3xl",
  detailContainer: "flex flex-col gap-[24px] pc:gap-[40px]",
  detailTitle: "text-lg font-semibold text-black-400 pc:text-2xl",
};

export default function MyQuoteDetailPage() {
  const { quoteId } = useParams();
  const { data, isPending } = useGetSentQuoteDetail(Number(quoteId));

  if (isPending) {
    return <Loader msg="견적을 불러오는 중입니다." />;
  }

  if (!data) {
    return <Message msg="데이터 없음" />;
  }

  return (
    <>
      <div className={styles.topContainer}>
        <div className={styles.container}>
          <h2 className={styles.title}>견적 상세</h2>
          <ConfirmedQuoteCard data={data} />
          <div className={styles.shareContainer}>
            <ShareButtons
              variant="quote"
              quoteInfo={{
                cost: data.cost,
                dropOffAddress: data.dropOffAddress,
                movingDate: data.movingDate,
                pickupAddress: data.pickupAddress,
              }}
            />
          </div>
          <LineSeparator direction="horizontal" />
          <div className={styles.costContainer}>
            <p className={styles.costText}>견적가</p>
            <p className={styles.costValue}>{formatCost(data.cost)}원</p>
          </div>
          <LineSeparator direction="horizontal" />
          <div className={styles.detailContainer}>
            <p className={styles.detailTitle}>견적 정보</p>
            <QuoteDetailInfo
              data={{
                requestDate: data.requestDate,
                service: data.service,
                movingDate: data.movingDate,
                pickupAddress: data.pickupAddress,
                dropOffAddress: data.dropOffAddress,
              }}
            />
          </div>
        </div>
        <div className={styles.pcShareContainer}>
          <ShareButtons
            variant="quote"
            quoteInfo={{
              cost: data.cost,
              dropOffAddress: data.dropOffAddress,
              movingDate: data.movingDate,
              pickupAddress: data.pickupAddress,
            }}
          />
        </div>
      </div>
    </>
  );
}
