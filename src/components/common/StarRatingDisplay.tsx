import Image from "next/image";
import cn from "@/config/cn";
import { cva } from "class-variance-authority";
import assets from "@/variables/images";

interface StarRatingProps {
  average: number;
  size?: "responsive" | "fixed";
  className?: string;
}

const MAX_STAR_COUNT = 5;

const StarRatingDisplay = ({
  average,
  size = "responsive",
  className,
}: StarRatingProps) => {
  const starFrameVariants = cva("relative", {
    variants: {
      size: {
        responsive: "w-6 h-6 pc:w-12 pc:h-12",
        fixed: "",
      },
    },
    defaultVariants: {
      size: "responsive",
    },
  });

  const stars = Array.from({ length: MAX_STAR_COUNT }, (_, index) => {
    if (average >= index + 1) {
      return assets.icons.starActive;
    } else if (index < average && average < index + 1) {
      return assets.icons.starActiveHalf;
    } else {
      return assets.icons.starInactive;
    }
  });

  return (
    <div className="flex flex-row">
      {stars.map((star, index) => (
        <div className={cn(starFrameVariants({ size }), className)} key={index}>
          <Image key={index} src={star} alt="별점" fill />
        </div>
      ))}
    </div>
  );
};

export default StarRatingDisplay;
