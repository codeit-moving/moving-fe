import ConfirmedQuoteCard from "@/components/cards/ConfirmedQuoteCard";
import LineSeparator from "@/components/common/LineSeparator";
import ShareButtons from "@/components/common/ShareButtons";
import QuoteDetailInfo from "@/components/request/QuoteDetailInfo";
import { formatCost } from "@/utils/formatCost";

interface SentQuoteDetailProps {
  //data: GetSentQuoteApiResponseData;
  data: {
    id: number;
    cost: number;
    service: number;
    customerName: string;
    movingDate: string;
    pickupAddress: string;
    dropOffAddress: string;
    isDesignated: boolean;
    requestDate: string;
  };
}

export default function SentQuoteDetail({ data }: SentQuoteDetailProps) {
  const styles = {
    container: `mb-[110px] w-full max-w-[1400px] 
      tablet:mb-[72px] 
      pc:flex pc:flex-row pc:justify-between`,
    title:
      "text-2lg font-semibold text-black-400 pb-[6px] pc:text-2xl pc:pb-[30px]",
    content: "flex flex-col gap-[24px] w-full pc:max-w-[955px]",
    gap: `w-[10px] hidden 
      tablet:hidden
      pc:block`,
    sidebar: "hidden pc:block ",
    shareContainer: "pc:hidden",
    shareText: "text-lg font-semibold text-black-400 pc:text-xl",
    costContainer: "flex flex-col gap-[16px] pc:gap-[32px]",
    costText: "text-lg font-semibold text-black-400 pc:text-xl",
    costValue: "text-xl font-bold text-black-400 pc:text-3xl",
    detailContainer: "flex flex-col gap-[24px] pc:gap-[40px]",
    detailTitle: "text-lg font-semibold text-black-400 pc:text-2xl",
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <ConfirmedQuoteCard data={{ ...data, name: data.customerName }} />
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
        <div className={styles.gap}></div>
        <div className={styles.sidebar}>
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
