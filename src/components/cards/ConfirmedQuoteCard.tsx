import CardContainer from "../common/card/CardContainer";
import QuoteDetails from "../common/card/QuoteDetails";
import { type QuoteDetailsData } from "@/types/mover";

interface ConfirmedQuoteCardProps {
  data: QuoteDetailsData;
  className?: string;
}

const ConfirmedQuoteCard = ({ data, className }: ConfirmedQuoteCardProps) => {
  return (
    <CardContainer className="pc:max-w-[955px]">
      <QuoteDetails data={data} showRequestDate={false} />
    </CardContainer>
  );
};
export default ConfirmedQuoteCard;
