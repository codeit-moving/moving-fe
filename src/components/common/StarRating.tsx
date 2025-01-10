import { useState } from "react";
import assets from "@/variables/images"; // 비활성화된 별 아이콘

export default function StarRating({
  onRatingChange,
}: {
  onRatingChange: (value: number) => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const styles = {
    container: "flex flex-wrap gap-[8px] border-b-[1px]",
    star: `cursor-pointer w-[24px] h-[24px] pc:w-[48px] pc:h-[48px]`,
  };

  const handleRatingClick = (value: number) => {
    if (rating === value) {
      setRating(0);
      if (onRatingChange) {
        onRatingChange(0);
      }
    } else {
      setRating(value);
      if (onRatingChange) {
        onRatingChange(value);
      }
    }
  };

  return (
    <div className={styles.container}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        return (
          <img
            key={index}
            src={
              starValue <= rating
                ? assets.icons.starActive
                : assets.icons.starInactive
            }
            alt="star"
            onClick={() => handleRatingClick(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(rating)}
            className={styles.star}
          />
        );
      })}
    </div>
  );
}
