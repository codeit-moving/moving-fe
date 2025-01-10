"use client";

import Image from "next/image";
import Button from "./common/Button";

import assets from "@/variables/images";

interface ButtonFavoriteProps {
  isFavorite: boolean;
  customerId: number;
  moverId: number;
}

export default function ButtonFavorite({
  isFavorite,
  customerId,
  moverId,
}: ButtonFavoriteProps) {
  const handleButtonClick = () => {
    // API 호출 (찜하기)
  };

  return (
    <Button
      onClick={() => handleButtonClick()}
      className={"w-[54px] h-[54px] pc:w-[64px] pc:h-[64px] "}
    >
      <div className="relative w-[24px] h-[24px] pc:w-[36px] pc:h-[36px]">
        <Image
          src={isFavorite ? assets.icons.likeActive : assets.icons.likeInactive}
          alt="좋아요"
          fill
        />
      </div>
    </Button>
  );
}
