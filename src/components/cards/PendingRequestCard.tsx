"use client";

import MoverInfo from "../common/card/MoverInfo";
import ServiceChip, { ChipType } from "../common/card/ServiceChip";
import CardContainer from "../common/card/CardContainer";
import { mapServiceType } from "@/utils/utilFunctions";
import {
  type CardProps,
  type RequestDetails,
  type FullMoverData,
  type FavoriteFields,
  Address,
} from "@/types/mover";
import GrayLabel from "../common/card/GrayLabel";
import Button from "../common/Button";
import { formatDateWithDay } from "@/utils/utilFunctions";

interface PendingRequestData
  extends FullMoverData,
    FavoriteFields,
    RequestDetails,
    Address {
  service: number;
}

type PendingRequestCardProps = CardProps & {
  data: PendingRequestData;
};

const PendingRequestCard = ({
  data,
  size,
  className,
}: PendingRequestCardProps) => {
  const serviceType = mapServiceType([data.service])[0];

  const handleConfirmClick = () => {
    console.log("견적 확정하기 api 호출");
  };

  const handleDetailClick = (quoteId: number) => {
    console.log("상세보기 페이지로 이동");
  };

  return (
    <CardContainer className="max-w-[688px]" size={size} gap="gap-3.5 pc:gap-6">
      <div className="flex gap-2">
        <ServiceChip variant="pendingConfirm" />
        <ServiceChip variant={serviceType as ChipType} />
        {data.isDesignated && <ServiceChip variant="designatedQuote" />}
      </div>

      <MoverInfo data={data} />

      <div className="flex gap-2 flex-col text-md font-medium pc:text-2lg pc:gap-4">
        <div className="flex items-center gap-1">
          <GrayLabel>이사일</GrayLabel>
          <span className="truncate overflow-hidden whitespace-nowrap">
            {formatDateWithDay(data.movingDate)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <GrayLabel>출발</GrayLabel>
          <span className="truncate overflow-hidden whitespace-nowrap">
            {data.pickupAddress}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <GrayLabel>도착</GrayLabel>
          <span className="truncate overflow-hidden whitespace-nowrap">
            {data.dropOffAddress}
          </span>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-end">
        <span className="text-md font-medium pc:text-2lg">견적금액</span>
        <span className="text-2lg font-bold pc:text-2xl">
          {data.cost.toLocaleString()}원
        </span>
      </div>

      <Button onClick={handleConfirmClick}>견적 확정하기</Button>
      <Button onClick={() => handleDetailClick(data.id)} variant="outlined">
        상세보기
      </Button>
    </CardContainer>
  );
};

export default PendingRequestCard;
