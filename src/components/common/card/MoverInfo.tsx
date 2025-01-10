import { cva, type VariantProps } from "class-variance-authority";
import cn from "@/config/cn";
import FavoriteUi from "./FavoriteUi";
import ProfileImage from "./ProfileImage";
import MoverExperience from "./MoverExperience";
import { FavoriteFields, type BaseMoverData } from "@/types/mover";
import NameText from "./NameText";

const moverInfoVariants = cva(
  "flex gap-2.5 items-center text-black-300 border-solid rounded-md border-line-100 shadow-border border-[1px] p-2.5",
  {
    variants: {
      size: {
        fixed: "",
        responsive: "pc:p-4",
      },
    },
    defaultVariants: {
      size: "responsive",
    },
  }
);

type MoverInfoProps = {
  data: BaseMoverData & FavoriteFields;
  className?: string;
  size?: "fixed" | "responsive";
  isLarge?: boolean;
};

const MoverInfo = ({ data, className, size, isLarge }: MoverInfoProps) => {
  if (!data) return null;

  const isResponsive = size === "responsive";

  return (
    <div className={cn(moverInfoVariants({ size }), className)}>
      <ProfileImage imgUrl={data.imageUrl} size={size} isLarge={isLarge} />
      <div
        className={cn("flex flex-col gap-2.5 w-full", {
          "pc:gap-2": isResponsive,
        })}
      >
        <div className="flex items-center justify-between">
          <NameText text={data.nickname} type="mover" size={size} />
          <FavoriteUi
            isFavorite={data.isFavorite}
            favoriteCount={data.favoriteCount}
            size={size}
          />
        </div>

        <MoverExperience data={data} size={size} />
      </div>
    </div>
  );
};

export default MoverInfo;
