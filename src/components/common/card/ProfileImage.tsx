import { cva, type VariantProps } from "class-variance-authority";
import cn from "@/config/cn";
import assets from "@/variables/images";
import Image from "next/image";

const profileImageVariants = cva(
  "relative bg-transparent border-[2px] border-solid border-pr-blue-400 rounded-full overflow-hidden w-[46px] aspect-[1/1]",
  {
    variants: {
      size: {
        fixed: " ",
        responsive: " pc:w-[54px]",
      },
      isLarge: {
        true: "pc:w-[80px]",
        false: "",
      },
    },
    defaultVariants: {
      size: "responsive",
      isLarge: false,
    },
  }
);

interface ProfileImageProps extends VariantProps<typeof profileImageVariants> {
  imgUrl: string | null;
  className?: string;
  size?: "fixed" | "responsive";
  isLarge?: boolean;
}

const ProfileImage = ({
  imgUrl,
  className,
  size,
  isLarge = false,
}: ProfileImageProps) => {
  return (
    <div className={cn(profileImageVariants({ size, isLarge }), className)}>
      <Image
        src={imgUrl || assets.images.avatarRed}
        alt="profile image"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default ProfileImage;
