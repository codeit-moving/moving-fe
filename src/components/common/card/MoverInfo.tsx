import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/config/clsx";
import assets from "@/variables/images";
import Image from "next/image";
import FavoriteUi from "./FavoriteUi";
import LineSeparator from "../LineSeparator";
import ProfileImage from "./ProfileImage";
import { type BaseMoverData } from "@/types/mover";

const moverExperienceVariants = cva(
  "flex items-center text-sm font-medium text-black-300 gap-2.5",
  {
    variants: {
      size: {
        fixed: "",
        responsive: "pc:text-lg",
      },
    },
    defaultVariants: {
      size: "responsive",
    },
  }
);

const MoverExperience = ({
  data,
  size,
  className,
}: {
  data: BaseMoverData;
  className?: string;
  size?: "fixed" | "responsive";
}) => {
  if (!data) return null;

  const isResponsive = size === "responsive";

  return (
    <div className={cn(moverExperienceVariants({ size, className }))}>
      <div className="inline-flex items-center gap-0.5 whitespace-nowrap">
        <Image
          className={cn("w-5 h-5", {
            "pc:w-6 pc:h-6": isResponsive,
          })}
          src={assets.icons.starActive}
          alt="star"
          width={20}
          height={20}
        />
        {data.ratings?.average?.toFixed(1)}
        <span className="text-grayscale-300">{`(${data.reviewCount})`}</span>
      </div>
      <LineSeparator />
      <span className="flex items-center gap-1 whitespace-nowrap">
        <span className="text-grayscale-300">경력</span>
        {`${data.career}년`}
      </span>
      <LineSeparator />
      <span className="flex items-center gap-1 whitespace-nowrap">
        {`${data.confirmCount}건`}
        <span className="text-grayscale-300">확정</span>
      </span>
    </div>
  );
};

const moverInfoVariants = cva(
  "flex gap-3 items-center text-black-300 border-solid rounded-md border-line-100 shadow-border border-[1px] p-2.5",
  {
    variants: {
      size: {
        fixed: "",
        responsive: "pc:p-3",
      },
    },
    defaultVariants: {
      size: "responsive",
    },
  }
);

const MoverInfo = ({
  data,
  className,
  size,
}: {
  data: BaseMoverData;
  className?: string;
  size?: "fixed" | "responsive";
}) => {
  if (!data) return null;

  const isResponsive = size === "responsive";

  return (
    <div className={cn(moverInfoVariants({ size }), className)}>
      <ProfileImage imgUrl={data.imageUrl} />
      <div
        className={cn("flex flex-col gap-2 w-full", {
          "pc:gap-3": isResponsive,
        })}
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold pc:text-2lg">
            {data.nickname} 기사님
          </span>
          <FavoriteUi
            isFavorite={data.isFavorite}
            favoriteCount={data.favoriteCount}
          />
        </div>

        <MoverExperience data={data} size={size} />
      </div>
    </div>
  );
};

export default MoverInfo;
