import Image from "next/image";
import clsx from "clsx";

import ProgressBarRating from "./common/progress-bar/ProgressBarRating";

import assets from "@/variables/images";

const MAX_STAR_COUNT = 5;

type StarRatingProps = {
  average: number;
};

function StarRating({ average }: StarRatingProps) {
  const StarRatingClass = clsx("flex flex-row");
  const starFrameClass = clsx("relative w-6 h-6", "pc:w-12 pc:h-12");

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
    <div className={StarRatingClass}>
      {stars.map((star, index) => (
        <div key={index} className={starFrameClass}>
          <Image src={star} alt={"별점"} fill />
        </div>
      ))}
    </div>
  );
}

type RatingDetailProps = {
  label: string;
  maxValue: number;
  currentValue: number;
};

function RatingDetail({ label, maxValue, currentValue }: RatingDetailProps) {
  const ratingDetailClass = clsx(
    "flex flex-row justify-between items-center",
    "w-[284px] h-6",
    "pc:w-[510px] pc:h-[32px]"
  );
  const textBaseClass = clsx(
    "flex flex-row items-center",
    "w-[36px] h-6",
    "text-lg font-bold",
    "pc:text-xl"
  );
  const labelClass = clsx(textBaseClass, "text-black-300");
  const countClass = clsx(textBaseClass, "text-grayscale-300");

  return (
    <div className={ratingDetailClass}>
      <div className={labelClass}>{label}</div>
      <ProgressBarRating maxValue={maxValue} currentValue={currentValue} />
      <div className={countClass}>{currentValue}</div>
    </div>
  );
}

export type Ratings = {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  totalCount: number;
  totalSum: number;
  average: number;
};

type RatingInfoProps = { rating: Ratings };

export default function RatingInfo({ rating }: RatingInfoProps) {
  const ratingInfoClass = clsx(
    "box-border flex flex-col gap-[40px] items-center justify-center",
    "px-0",
    "w-full h-[303px]",
    "tablet:flex-row tablet:px-[48.5px] tablet:h-[176px] tablet:gap-[56px]",
    "pc:flex-row pc:px-[59px] pc:h-[296px] pc:bg-bg-200 pc:rounded-[32px] pc:gap-[83px]"
  );
  const averageInfoClass = clsx(
    "flex flex-col justify-between items-center",
    "w-[120px] h-[87px]",
    "pc:w-[244px] pc:h-[139px]"
  );
  const averageClass = clsx(
    "text-[40px] leading-[47.73px] text-black-400 font-bold",
    "pc:text-[64px] pc:leading-[76.38px]"
  );
  const maxRatingClass = clsx(
    "text-[24px] leading-[28.64px] text-grayscale-100 font-bold",
    "pc:text-[38px] pc:leading-[45.35px]"
  );
  const RatingDetailListClass = clsx(
    "flex flex-col justify-center items-center",
    "w-[327px] h-[176px]",
    "bg-bg-200 rounded-3xl",
    "tablet:justify-between",
    "tablet:py-4",
    "pc:justify-between",
    "pc:w-[510px] pc:h-[216px]",
    "pc:bg-transparent pc:rounded-0"
  );
  const ratingScores = [5, 4, 3, 2, 1];

  return (
    <div className={ratingInfoClass}>
      <div className={averageInfoClass}>
        <div className="flex flex-row items-center">
          <div className={averageClass}>{rating.average}</div>
          <div className={maxRatingClass}>/{MAX_STAR_COUNT}</div>
        </div>
        <StarRating average={rating.average} />
      </div>
      <div className={RatingDetailListClass}>
        {ratingScores.map((score) => (
          <RatingDetail
            key={score}
            label={`${score}점`}
            maxValue={rating.totalCount}
            currentValue={rating[score.toString() as keyof Ratings]}
          />
        ))}
      </div>
    </div>
  );
}
