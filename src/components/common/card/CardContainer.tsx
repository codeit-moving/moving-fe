import { cva } from "class-variance-authority";
import { cn } from "@/config/clsx";

const cardContainerVariants = cva(
  "flex py-4 px-3.5 flex-col rounded-[16px] shadow-card border-[0.5px] border-line-100 min-w-[327px]",
  {
    variants: {
      size: {
        fixed: "w-[327px]",
        responsive: "pc:py-5 pc:px-6",
      },
    },
    defaultVariants: {
      size: "responsive",
    },
  }
);

const CardContainer = ({
  children,
  size = "responsive",
  className,
  gap = "gap-3.5",
}: {
  children: React.ReactNode;
  size?: "fixed" | "responsive";
  className?: string;
  gap?: string;
}) => {
  return (
    <div className={cn(cardContainerVariants({ size }), gap, className)}>
      {children}
    </div>
  );
};

export default CardContainer;
