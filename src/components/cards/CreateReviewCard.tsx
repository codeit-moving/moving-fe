import CardContainer from "../common/card/CardContainer";
import Button from "../common/Button";
import cn from "@/config/cn";
import ReviewMover, { type ReviewMoverData } from "../common/card/ReviewMover";

interface CreateReviewCardProps {
  data: ReviewMoverData;
  className?: string;
  onPrimaryClick: () => void;
}

const CreateReviewCard = ({
  data,
  className,
  onPrimaryClick,
}: CreateReviewCardProps) => {
  return (
    <CardContainer className={cn("pc:py-[32px]", className)}>
      <ReviewMover data={data} />
      <Button onClick={onPrimaryClick}>리뷰 작성하기</Button>
    </CardContainer>
  );
};

export default CreateReviewCard;
