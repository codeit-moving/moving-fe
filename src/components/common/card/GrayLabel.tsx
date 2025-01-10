import { cva } from "class-variance-authority";

type GrayLabelProps = {
  children: React.ReactNode;
  variant?: "border" | "solid" | "none";
  size?: "fixed" | "responsive";
};

const grayLabelVariants = cva(
  "box-border flex items-center flex-shrink-0 w-fit text-md font-medium rounded-[4px]",
  {
    variants: {
      variant: {
        border:
          "text-grayscale-400 border-solid border-[1px] border-line-100 bg-bg-200 py-0.5 px-1.5",
        solid:
          "text-grayscale-400 bg-bg-400 border-solid border-[1px] border-bg-400 py-0.5 px-1.5",
        none: "text-grayscale-300",
      },
      size: {
        fixed: "",
        responsive: "pc:text-2lg pc:h-[34px]",
      },
    },
    compoundVariants: [
      {
        variant: ["border", "solid"],
        size: "responsive",
        className: "h-[28px] pc:h-[34px]",
      },
      {
        variant: "none",
        size: "responsive",
        className: "h-[22px] pc:h-[32px]",
      },
    ],
    defaultVariants: {
      variant: "none",
      size: "responsive",
    },
  }
);

const GrayLabel = ({ children, variant, size }: GrayLabelProps) => {
  return (
    <span className={grayLabelVariants({ variant, size })}>{children}</span>
  );
};

export default GrayLabel;
