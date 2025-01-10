import assets from "@/variables/images";
import Image from "next/image";
import LineSeparator from "../LineSeparator";
import { type BaseMoverData } from "@/types/mover";
import cn from "@/config/cn";
import { cva, type VariantProps } from "class-variance-authority";

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
  data: Pick<
    BaseMoverData,
    "career" | "rating" | "confirmCount" | "reviewCount"
  >;
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
        {data.rating?.average?.toFixed(1)}
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

export default MoverExperience;
