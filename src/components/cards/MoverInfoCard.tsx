import Link from "next/link";
import MoverInfo from "../common/card/MoverInfo";
import ServiceChip, { ChipType } from "../common/card/ServiceChip";
import { mapServiceType } from "@/utils/utilFunctions";
import { cva } from "class-variance-authority";
import CardContainer from "../common/card/CardContainer";
import {
  type FavoriteFields,
  type CardProps,
  type FullMoverData,
  type ConfirmInfo,
} from "@/types/mover";

export type MoverDetails = FullMoverData & FavoriteFields & ConfirmInfo;

export interface MoverInfoProps extends CardProps {
  data: MoverDetails;
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

const MoverInfoCard = ({
  data,
  size = "responsive",
  className,
}: MoverInfoProps) => {
  const serviceTypes = mapServiceType(data.services);
  const href = `/find-mover/${data.id}`;

  return (
    <Link href={href}>
      <CardContainer size={size} className={className}>
        <div className="flex flex-row flex-wrap gap-2">
          {data.isConfirmed ? (
            <ServiceChip variant="confirmed" size={size} />
          ) : undefined}
          {serviceTypes.map((serviceType) => (
            <ServiceChip
              variant={serviceType as ChipType}
              key={serviceType}
              size={size}
            />
          ))}
          {data.isDesignated ? (
            <ServiceChip variant="designatedQuote" size={size} />
          ) : undefined}
        </div>
        <h4 className={titleVariants({ size })}>{data.introduction}</h4>
        <MoverInfo data={data} size={size} />
      </CardContainer>
    </Link>
  );
};

export default MoverInfoCard;
