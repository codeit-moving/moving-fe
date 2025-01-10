import cn from "@/config/cn";
import { cva } from "class-variance-authority";

const nameVariants = cva("font-semibold", {
  variants: {
    size: {
      responsive: "text-lg",
      fixed: "text-lg",
    },
    type: {
      mover: "",
      customer: "",
    },
  },
  compoundVariants: [
    {
      size: "responsive",
      type: "mover",
      className: "pc:text-2lg",
    },
    {
      size: "responsive",
      type: "customer",
      className: "pc:text-xl",
    },
  ],
  defaultVariants: {
    size: "responsive",
    type: "mover",
  },
});

const NameText = ({
  text,
  type,
  size = "responsive",
  className,
}: {
  text: string;
  type: "mover" | "customer";
  size?: "responsive" | "fixed";
  className?: string;
}) => {
  const nameType = type === "mover" ? "기사님" : "고객님";

  return (
    <p className={cn(nameVariants({ size, type }), className)}>
      {text} <span>{nameType}</span>
    </p>
  );
};

export default NameText;
