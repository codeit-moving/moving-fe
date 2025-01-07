"use client";

import { FavoriteFields, type BaseMoverData } from "@/types/mover";
import CardContainer from "../common/card/CardContainer";
import MoverInfo from "../common/card/MoverInfo";
import ServiceChip, { ChipType } from "../common/card/ServiceChip";
import { mapServiceType } from "@/utils/utilFunctions";
import Link from "next/link";
export interface FavoriteMoverData extends BaseMoverData, FavoriteFields {
  services: number[];
}

interface FavoriteMoverCardProps {
  data: FavoriteMoverData;
  className?: string;
}

const FavoriteMoverCard = ({ data, className }: FavoriteMoverCardProps) => {
  const serviceTypes = mapServiceType(data.services);
  const href = `/find-mover/${data.id}`;

  return (
    <Link href={href}>
      <CardContainer>
        <div className="flex gap-2 flex-wrap">
          {serviceTypes.map((serviceType) => (
            <ServiceChip variant={serviceType as ChipType} key={serviceType} />
          ))}
        </div>
        <MoverInfo data={data} isLarge={true} />
      </CardContainer>
    </Link>
  );
};

export default FavoriteMoverCard;
