import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import cn from "@/config/cn";
import assets from "@/variables/images";

const chipVariants = cva(
  "inline-flex w-fit items-center justify-center gap-[1px] py-0.5 shadow-[4px_4px_8px_0px_rgba(217,217,217,0.1)] font-semibold rounded-[4px] text-sm text-nowrap",
  {
    variants: {
      variant: {
        smallMove: "bg-pr-blue-100 text-pr-blue-300 pl-[2px] pr-1.5 gap-[2px]",
        homeMove: "bg-pr-blue-100 text-pr-blue-300 pl-[2px] pr-1.5 gap-[2px]",
        officeMove: "bg-pr-blue-100 text-pr-blue-300 pl-[2px] pr-1.5 gap-[2px]",
        designatedQuote: "bg-pr-red-100 text-pr-red-200 pl-[2px] pr-1.5",
        pendingConfirm: "bg-[rgba(242,243,248,1)] text-pr-blue-400 px-1.5",
        confirmed: "bg-[rgba(242,243,248,1)] text-pr-blue-400 px-1.5",
      },
      size: {
        fixed: "h-[26px]",
        responsive:
          "h-[26px] pc:h-[34px] pc:text-lg pc:gap-1 pc:pl-[3px] pc:pr-[5px]",
      },
    },
    defaultVariants: {
      variant: "smallMove",
      size: "responsive",
    },
  }
);

type ChipWithIconType =
  | "smallMove"
  | "homeMove"
  | "officeMove"
  | "designatedQuote";

type ChipWithoutIconType = "pendingConfirm" | "confirmed";

export type ChipType = ChipWithIconType | ChipWithoutIconType;

const icons: Record<ChipWithIconType, string> = {
  smallMove: assets.icons.box,
  homeMove: assets.icons.home,
  officeMove: assets.icons.company,
  designatedQuote: assets.icons.document,
} as const;

const labels: Record<ChipType, string> = {
  smallMove: "소형이사",
  homeMove: "가정이사",
  officeMove: "사무실이사",
  designatedQuote: "지정 견적 요청",
  pendingConfirm: "견적 대기",
  confirmed: "견적 확정",
} as const;

interface ChipProps extends VariantProps<typeof chipVariants> {
  variant: ChipType;
  className?: string;
  isResponsive?: boolean;
}

const ServiceChip = ({
  variant,
  className,
  size = "responsive",
}: ChipProps) => {
  const isResponsive = size === "responsive";

  return (
    <div className={cn(chipVariants({ variant, size }), className)}>
      {variant in icons && (
        <div
          className={cn(
            "relative w-[20px] h-[20px]",
            isResponsive ? "pc:w-[24px] pc:h-[24px]" : "pc:w-[20px] pc:h-[20px]"
          )}
        >
          <Image
            src={icons[variant as ChipWithIconType]}
            alt={`${variant} icon`}
            fill
          />
        </div>
      )}
      <span>{labels[variant]}</span>
    </div>
  );
};
export default ServiceChip;
