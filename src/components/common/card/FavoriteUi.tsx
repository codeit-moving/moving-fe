import Image from "next/image";
import assets from "@/variables/images";
import { formatCount } from "@/utils/utilFunctions";
import { FavoriteFields } from "@/types/mover";
import { VariantProps, cva } from "class-variance-authority";

const favoriteVariants = cva("flex items-center gap-0.5", {
  variants: {
    size: {
      fixed: "",
      responsive: "pc:gap-1",
    },
  },
  defaultVariants: {
    size: "responsive",
  },
});

const textVariants = cva("text-sm font-medium text-pr-blue-400", {
  variants: {
    size: {
      fixed: "",
      responsive: "pc:text-2lg",
    },
  },
  defaultVariants: {
    size: "responsive",
  },
});

interface FavoriteUiProps
  extends FavoriteFields,
    VariantProps<typeof favoriteVariants> {
  size?: "fixed" | "responsive";
}

export default function FavoriteUi({
  favoriteCount = 0,
  isFavorite = false,
  size,
}: FavoriteUiProps) {
  const heartIcon = isFavorite
    ? assets.icons.likeActive
    : assets.icons.likeInactive;

  return (
    <div className={favoriteVariants({ size })}>
      <Image src={heartIcon} alt="favorite icon" width={24} height={24} />
      <span className={textVariants({ size })}>
        {formatCount(favoriteCount)}
      </span>
    </div>
  );
}
