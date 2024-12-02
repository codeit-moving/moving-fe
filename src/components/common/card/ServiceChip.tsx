import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { cn } from "@/config/clsx";
import assets from "@/variables/images";

const chipVariants = cva(
  "inline-flex w-fit items-center justify-center gap-[1px] py-0.5 shadow-[4px_4px_8px_0px_rgba(217,217,217,0.1)] font-semibold rounded-[4px] text-sm",
  {
    variants: {
      variant: {
        smallMove: "bg-pr-blue-100 text-pr-blue-300 pl-[3px] pr-1.5",
        homeMove: "bg-pr-blue-100 text-pr-blue-300 pl-[3px] pr-1.5",
        officeMove: "bg-pr-blue-100 text-pr-blue-300 pl-[3px] pr-1.5",
        designatedQuote: "bg-pr-red-100 text-pr-red-200 pl-[3px] pr-1.5",
        pendingConfirm: "bg-[rgba(242,243,248,1)] text-pr-blue-400 px-1.5",
      },
      size: {
        fixed: "",
        responsive: "pc:text-lg pc:gap-1 pc: py-1",
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
type ChipWithoutIconType = "pendingConfirm";
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
  designatedQuote: "지정 견적 이사",
  pendingConfirm: "견적 대기",
} as const;

interface ChipProps extends VariantProps<typeof chipVariants> {
  variant: ChipType;
  className?: string;
  isResponsive?: boolean;
}

const ServiceChip = ({ variant, className, size }: ChipProps) => {
  const isResponsive = size === "responsive";

  return (
    <div className={cn(chipVariants({ variant, size }), className)}>
      {variant in icons && (
        <Image
          src={icons[variant as ChipWithIconType]}
          alt={`${variant} icon`}
          width={20}
          height={20}
          className={cn(
            isResponsive ? "pc:w-[24px] pc:h-[24px]" : "pc:w-[20px] pc:h-[20px]"
          )}
        />
      )}
      <span>{labels[variant]}</span>
    </div>
  );
};
export default ServiceChip;
