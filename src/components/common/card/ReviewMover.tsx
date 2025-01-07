import ServiceChip from "./ServiceChip";
import { formatDate, mapServiceType } from "@/utils/utilFunctions";
import { ChipType } from "./ServiceChip";
import ProfileImage from "./ProfileImage";
import NameText from "./NameText";
import TextWithGrayLabel from "./TextWithGrayLabel";
import LineSeparator from "../LineSeparator";

export interface ReviewMoverData {
  confirmedQuoteId: number;
  moverId: number;
  service: number;
  isDesignated: boolean;
  imageUrl: string | null;
  nickname: string;
  movingDate: string;
  cost: number;
}

const ReviewMover = ({
  data,
  variant,
}: {
  data: ReviewMoverData;
  variant?: "solid" | "border" | "none";
}) => {
  const serviceType = mapServiceType([data.service])[0] || "";
  const moveInDate = formatDate(data.movingDate);
  const quotePrice = `${data.cost.toLocaleString()}원`;

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        <ServiceChip variant={serviceType as ChipType} />
        {data.isDesignated && <ServiceChip variant="designatedQuote" />}
      </div>

      <div className="flex items-center gap-2.5 pc:gap-6 pc:py-2">
        <ProfileImage imgUrl={data.imageUrl} isLarge={true} />
        <div className="flex flex-col gap-1 pc:gap-2">
          <NameText text={data.nickname} type="mover" />
          <div className="flex gap-2 items-center pc:gap-[12.5px]">
            <TextWithGrayLabel
              label="이사일"
              variant={variant}
              text={moveInDate}
            />
            <LineSeparator />
            <TextWithGrayLabel
              label="견적가"
              variant={variant}
              text={quotePrice}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewMover;
