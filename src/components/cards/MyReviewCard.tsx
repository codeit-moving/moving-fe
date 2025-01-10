import CardContainer from "../common/card/CardContainer";
import ServiceChip, { type ChipType } from "../common/card/ServiceChip";
import ProfileImage from "../common/card/ProfileImage";
import NameText from "../common/card/NameText";
import TextWithGrayLabel from "../common/card/TextWithGrayLabel";
import LineSeparator from "../common/LineSeparator";
import { mapServiceType, formatDate } from "@/utils/utilFunctions";
import cn from "@/config/cn";
import StarRatingDisplay from "../common/StarRatingDisplay";
import ReviewImageSlider from "../review/ReviewImageSlider";
export interface MyReviewCardData {
  id: number;
  service: number;
  isDesignated: boolean;
  imageUrl: string | null;
  nickname: string;
  movingDate: string;
  cost: number;
  rating: number;
  content: string;
  createdAt: string;
  reviewImageUrl: string[] | null;
}

interface MyReviewCardProps {
  data: MyReviewCardData;
  className?: string;
}

const MyReviewCard = ({ data, className }: MyReviewCardProps) => {
  const serviceType = mapServiceType([data.service])[0];
  const moveInDate = formatDate(data.movingDate);
  const quotePrice = `${data.cost.toLocaleString()}원`;
  const createdDate = formatDate(data.createdAt);

  return (
    <CardContainer
      className={cn("pc:relative pc:py-8 pc:px-6 pc:max-w-[688px]", className)}
    >
      <div className="flex gap-2">
        <ServiceChip variant={serviceType as ChipType} />
        {data.isDesignated && <ServiceChip variant="designatedQuote" />}
      </div>

      <div className="flex items-center gap-2.5 pc:gap-6 pc:py-2">
        <ProfileImage imgUrl={data.imageUrl} isLarge={true} />
        <div className="flex flex-col gap-1 pc:gap-2">
          <NameText text={data.nickname} type="mover" />
          <div className="flex items-center gap-[12.5px]">
            <TextWithGrayLabel label="이사일" text={moveInDate} />
            <LineSeparator />
            <TextWithGrayLabel label="견적가" text={quotePrice} />
          </div>

          <StarRatingDisplay
            average={data.rating}
            size="fixed"
            className="hidden w-6 h-6 pc:flex"
          />
        </div>
      </div>
      <LineSeparator direction="horizontal" />
      {data.reviewImageUrl && data.reviewImageUrl.length > 0 && (
        <ReviewImageSlider images={data.reviewImageUrl} />
      )}
      <p className="text-md font-regular text-grayscale-500 line-clamp-2 whitespace-pre-wrap pc:text-lg">
        {data.content}
      </p>
      <time className="flex text-grayscale-300 text-xs font-regular justify-end pc:text-2lg pc:absolute pc:top-6 pc:right-6 ">
        작성일 {createdDate}
      </time>
    </CardContainer>
  );
};

export default MyReviewCard;
