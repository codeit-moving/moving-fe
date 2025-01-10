import { type QuoteDetailsData } from "@/types/quote";
import CardContainer from "../common/card/CardContainer";
import QuoteDetails from "../common/card/QuoteDetails";
import cn from "@/config/cn";

interface RejectedRequestCardProps {
  data: QuoteDetailsData;
  className?: string;
  classNameQuoteDetails?: string;
}

const styles = {
  completedOverlay:
    "absolute inset-0 bg-[#040404A3] rounded-[16px] flex flex-col items-center justify-center text-white z-10 border-solid border-[1px] border-grayscale-300",
  completedText: "text-lg font-semibold pc:text-2lg",
};

const RejectedRequestCard = ({
  data,
  className,
  classNameQuoteDetails,
}: RejectedRequestCardProps) => {
  return (
    <CardContainer className={cn("relative", className)}>
      <QuoteDetails data={data} className={classNameQuoteDetails} />

      <div className={styles.completedOverlay}>
        <p className={styles.completedText}>반려된 요청이에요</p>
      </div>
    </CardContainer>
  );
};

export default RejectedRequestCard;
