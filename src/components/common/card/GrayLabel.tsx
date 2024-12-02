import { cva } from "class-variance-authority";

const greyLabelVariants = cva(
  "flex-shrink-0 w-fit text-md font-medium text-grayscale-400 py-0.5 px-1.5 rounded-[4px]",
  {
    variants: {
      type: {
        border: "border-solid border-[1px] border-line-100 bg-bg-200",
        solid: "bg-bg-400 border-solid border-[1px] border-bg-400",
      },
      size: {
        fixed: "",
        responsive: "pc:text-2lg pc:px-2.5 pc:py-1",
      },
    },
    defaultVariants: {
      type: "solid",
      size: "responsive",
    },
  }
);

const GreyLabel = ({
  children,
  type,
  size,
}: {
  children: React.ReactNode;
  type?: "border" | "solid";
  size?: "fixed" | "responsive";
}) => {
  return <span className={greyLabelVariants({ type, size })}>{children}</span>;
};

export default GreyLabel;
