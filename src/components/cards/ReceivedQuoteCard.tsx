import CardContainer from "../common/card/CardContainer";
import MoverInfo from "../common/card/MoverInfo";
import ServiceChip, { ChipType } from "../common/card/ServiceChip";
import { mapServiceType } from "@/utils/utilFunctions";
import { QuoteAmount } from "./PendingRequestCard";
import { FavoriteFields, BaseMoverData, CardProps } from "@/types/mover";
import { cva } from "class-variance-authority";
interface ReceivedQuoteData extends BaseMoverData, FavoriteFields {
  introduction: string;
  isDesignated: boolean | undefined;
  service: number;
  cost: number;
}

interface ReceivedQuoteCardProps extends CardProps {
  data: ReceivedQuoteData;
}

const titleVariants = cva("text-lg font-semibold text-black-300", {
  variants: {
    size: {
      fixed: "",
      responsive: "pc:text-2xl",
    },
  },
  defaultVariants: {
    size: "responsive",
  },
});

const ReceivedQuoteCard = ({
  data,
  className,
  size = "responsive",
}: ReceivedQuoteCardProps) => {
  const serviceType = mapServiceType([data.service])[0];

  return (
    <CardContainer className={className} gap="gap-3.5 pc:gap-6">
      <div className="flex gap-2 flex-wrap">
        <ServiceChip variant={serviceType as ChipType} />
        {data.isDesignated && <ServiceChip variant="designatedQuote" />}
      </div>
      <h4 className={titleVariants({ size })}>{data.introduction}</h4>
      <MoverInfo data={data} />

      <QuoteAmount amount={data.cost} />
    </CardContainer>
  );
};

export default ReceivedQuoteCard;
