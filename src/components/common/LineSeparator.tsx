import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/config/clsx";
interface SeparatorProps {
  direction?: "vertical" | "horizontal";
  className?: string;
}

const separatorVariants = cva("bg-line-200", {
  variants: {
    direction: {
      vertical: "w-[1px] h-[100%] min-h-[14px]",
      horizontal: "w-[100%] h-[1px]",
    },
  },
  defaultVariants: {
    direction: "vertical",
  },
});

const LineSeparator = ({
  direction,
  className,
}: SeparatorProps & VariantProps<typeof separatorVariants>) => {
  return <div className={cn(separatorVariants({ direction }), className)} />;
};

export default LineSeparator;
