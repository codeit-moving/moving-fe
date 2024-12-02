import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/config/clsx";
import assets from "@/variables/images";
import Image from "next/image";

const profileImageVariants = cva(
  "relative bg-transparent z-1 border-2 border-solid border-pr-blue-400 rounded-full overflow-hidden shadow-card w-[46px] aspect-square",
  {
    variants: {
      size: {
        fixed: "",
        responsive: "pc:w-[80px]",
      },
    },
    defaultVariants: {
      size: "responsive",
    },
  }
);

const ProfileImage = ({
  imgUrl,
  className,
  size,
}: {
  imgUrl: string | null;
  className?: string;
  size?: "fixed" | "responsive";
}) => {
  return (
    <div className={cn(profileImageVariants({ size }), className)}>
      <Image src={imgUrl || assets.images.avatarRed} alt="profile image" fill />
    </div>
  );
};

export default ProfileImage;
