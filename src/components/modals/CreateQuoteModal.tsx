import Image from "next/image";
import assets from "@/variables/images";
import ServiceChip from "../common/card/ServiceChip";
import QuoteModalMover from "../common/card/QuoteModalUser";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import { useState } from "react";

const MIN_COMMENT_LENGTH = 10;

interface CreateQuoteModalProps {
  onClose?: () => void;
  onSubmit?: (data: {
    movingRequestId: number;
    cost: number;
    comment: string;
  }) => void;
  requestId: number;
  serviceType: number;
  isDesignatedQuote: boolean;
  startAddress: string;
  endAddress: string;
  moveDate: string;
  customerName: string;
}

const styles = {
  wrapper: `flex items-center justify-center w-full`,
  container: `
    flex flex-col bg-white 
    pl-[24px] pr-[14px] py-[32px]
    rounded-t-[32px] w-full
    h-[650px]
    tablet:rounded-[32px]
    pc:rounded-[32px] 
    pc:h-[800px]
  `,
  contentContainer: `
    flex-1
    overflow-y-auto
    scrollbar-thumb-rounded-full 
    scrollbar-track-rounded-full 
    scrollbar
    scrollbar-thumb-grayscale-200 
    scrollbar-w-1
    pc:scrollbar-w-1.5
    pr-[24px]
  `,
  buttonContainer: `
    py-[20px]
    border-t
    border-line-200
  `,
  titleContainer: `flex flex-row justify-between items-center mb-[26px] text-2lg font-bold text-black-400
  pc:text-2xl pc:font-semibold pc:mb-[40px]`,
  closeIcon: `cursor-pointer pc:w-[32px] pc:h-[32px]`,
  chipsContainer: `flex gap-[8px] mb-[14px] pc:mb-[24px]`,
  quoteContainer: `mb-[20px] pb-[20px] border-b-[1px] border-solid border-line-200
  pc:mb-[32px] pc:pb-[32px] pc:text-2xl`,
  Title: `mb-[16px] text-lg font-semibold text-black-300
  pc:text-xl`,
  commentContainer: `mb-[26px] pc:mb-[40px]`,
};

export default function CreateQuoteModal({
  onClose = () => {},
  onSubmit = () => {},
  requestId,
  serviceType,
  isDesignatedQuote,
  startAddress = "서울특별시 강남구 테헤란로 14길 6 남도빌딩",
  endAddress = "서울특별시 강남구 테헤란로 14길 6 남도빌딩",
  moveDate = "2024. 01. 01(목)",
  customerName = "김코드",
}: CreateQuoteModalProps) {
  const service: "smallMove" | "homeMove" | "officeMove" =
    serviceType === 2
      ? "homeMove"
      : serviceType === 3
      ? "officeMove"
      : "smallMove";

  const [quote, setQuote] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const isValid =
    quote.length > 0 &&
    !isNaN(Number(quote)) &&
    comment.length >= MIN_COMMENT_LENGTH &&
    typeof comment === "string";

  const handleCallApi = () => {
    onSubmit({ movingRequestId: requestId, cost: Number(quote), comment });
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p>견적 보내기</p>
          <Image
            src={assets.icons.x}
            alt="close"
            width={24}
            height={24}
            onClick={onClose}
            className={styles.closeIcon}
          />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.chipsContainer}>
            <ServiceChip variant={service} />
            {isDesignatedQuote && <ServiceChip variant="designatedQuote" />}
          </div>
          <QuoteModalMover
            customerName={customerName}
            moveDate={moveDate}
            startAddress={startAddress}
            endAddress={endAddress}
          />
          <div className={styles.quoteContainer}>
            <p className={styles.Title}>견적가를 입력해주세요</p>
            <Input
              name="quote"
              placeholder="견적가 입력"
              value={quote}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuote(e.target.value)
              }
            />
          </div>
          <div className={styles.commentContainer}>
            <p className={styles.Title}>코멘트를 입력해 주세요</p>
            <Textarea
              name="comment"
              placeholder={`최소 ${MIN_COMMENT_LENGTH}자 이상 입력해주세요`}
              value={comment}
              onChange={(value: string) => setComment(value)}
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button
              children="견적 보내기"
              variant="primary"
              onClick={handleCallApi}
              disabled={!isValid}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
