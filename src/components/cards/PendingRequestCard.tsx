"use client";

import MoverInfo from "../common/card/MoverInfo";
import ServiceChip, { ChipType } from "../common/card/ServiceChip";
import CardContainer from "../common/card/CardContainer";
import { mapServiceType } from "@/utils/utilFunctions";
import {
  type CardProps,
  type RequestDetails,
  type FavoriteFields,
  Address,
  BaseMoverData,
} from "@/types/mover";
import Button from "../common/Button";
import { formatDateWithDay } from "@/utils/utilFunctions";
import TextWithGrayLabel from "../common/card/TextWithGrayLabel";

export interface PendingRequestData
  extends BaseMoverData,
    FavoriteFields,
    RequestDetails,
    Address {
  service: number;
  isDesignated: boolean;
}

type PendingRequestCardProps = CardProps & {
  data: PendingRequestData;
  onPrimaryClick: () => void;
  onOutlinedClick: () => void;
};

export const QuoteAmount = ({ amount }: { amount: number }) => {
  return (
    <span className="flex gap-2 items-center justify-end">
      <p className="text-md font-medium pc:text-2lg">견적금액</p>
      <p className="text-2lg font-bold pc:text-2xl">
        {amount.toLocaleString()}원
      </p>
    </span>
  );
};

const styles = {
  chipContainer: "flex gap-2 flex-wrap",
  labelsContainer:
    "flex gap-2 flex-col text-md font-medium pc:text-2lg pc:gap-4",
  buttonContainer: "flex flex-col gap-2 tablet:flex-row",
};

const PendingRequestCard = ({
  data,
  size,
  className,
  onPrimaryClick,
  onOutlinedClick,
}: PendingRequestCardProps) => {
  const serviceType = mapServiceType([data.service])[0];

  return (
    <CardContainer size={size} gap="gap-3.5 pc:gap-6">
      <div className={styles.chipContainer}>
        <ServiceChip variant="pendingConfirm" />
        <ServiceChip variant={serviceType as ChipType} />
        {data.isDesignated && <ServiceChip variant="designatedQuote" />}
      </div>

      <MoverInfo data={data} />

      <div className={styles.labelsContainer}>
        <TextWithGrayLabel
          label="이사일"
          variant="solid"
          text={formatDateWithDay(data.movingDate)}
        />
        <TextWithGrayLabel
          label="출발"
          variant="solid"
          text={data.pickupAddress}
        />
        <TextWithGrayLabel
          label="도착"
          variant="solid"
          text={data.dropOffAddress}
        />
      </div>
      <QuoteAmount amount={data.cost} />
      <div className={styles.buttonContainer}>
        <Button onClick={onPrimaryClick} width="100%">
          견적 확정하기
        </Button>
        <Button onClick={onOutlinedClick} variant="outlined" width="100%">
          상세보기
        </Button>
      </div>
    </CardContainer>
  );
};

export default PendingRequestCard;
