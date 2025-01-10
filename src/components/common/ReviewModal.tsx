"use client";

import Textarea from "./Textarea";
import ReviewMover, { type ReviewMoverData } from "./card/ReviewMover";
import assets from "@/variables/images.js";
import Image from "next/image";
import Button from "./Button";
import StarRating from "./StarRating";
import LineSeparator from "./LineSeparator";
import { useState } from "react";
import toast from "react-hot-toast";

const styles = {
  lineSeparator: "my-[20px] pc:my-[32px]",
  label: "text-lg font-semibold text-black-300 mb-[16px] pc:text-xl",
};

interface ReviewModalProps {
  onClose: () => void;
  onSubmit: () => Promise<void>;
  data: ReviewMoverData;
}

export default function ReviewModal({
  onClose,
  onSubmit,
  data,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const isValid = rating > 0 && review.length >= 10;

  const handleRatingChange = (rating: number) => {
    setRating(rating);
  };

  const handleReviewChange = (value: string) => {
    setReview(value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 3) {
      toast.error("이미지는 최대 3장까지 업로드할 수 있습니다.");
      return;
    }

    const newFiles = files.slice(0, 3 - images.length);
    setImages((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-white w-full rounded-t-[32px] pt-[32px] pb-[40px] px-6
  tablet:rounded-[32px] tablet:w-[375px] pc:w-[608px]"
    >
      <div
        className="text-2lg font-bold text-black-400 flex justify-between items-center mb-[26px]
  pc:text-2xl pc:font-semibold pc:mb-[40px]"
      >
        <h3 className="text-lg font-semibold text-black-300 pc:text-2xl">
          리뷰 쓰기
        </h3>
        <Image
          src={assets.icons.x}
          alt="close"
          width={24}
          height={24}
          className="cursor-pointer pc:w-[32px] pc:h-[32px]"
          onClick={onClose}
        />
      </div>

      <div className="flex flex-col gap-4 pc:gap-6">
        <ReviewMover data={data} variant="solid" />
      </div>
      <LineSeparator direction="horizontal" className={styles.lineSeparator} />
      <p className={styles.label}>평점을 선택해 주세요</p>
      <div className="flex flex-wrap gap-[8px]">
        <StarRating onRatingChange={handleRatingChange} />
      </div>
      <LineSeparator direction="horizontal" className={styles.lineSeparator} />
      <p className={styles.label}>리뷰 이미지 첨부</p>
      <div className="flex gap-[16px] mb-[20px]">
        {previews.map((preview, index) => (
          <div key={index} className="relative w-[100px] h-[100px]">
            <Image
              src={preview}
              alt={`review-image-${index}`}
              width={100}
              height={100}
              className="rounded-[8px] object-cover w-full h-full"
            />
            <button
              className="absolute top-[4px] right-[4px] bg-black-400 rounded-full p-[4px] cursor-pointer"
              onClick={() => handleRemoveImage(index)}
              aria-label={`Remove image ${index + 1}`}
            >
              <Image src={assets.icons.x} alt="remove" width={16} height={16} />
            </button>
          </div>
        ))}
        {images.length < 3 && (
          <label className="w-[100px] h-[100px] border-solid border-[1px] border-gray-200 rounded-[8px] flex items-center justify-center cursor-pointer">
            <span className="sr-only">Add image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Image
              src={assets.icons.search}
              alt="add-image"
              width={24}
              height={24}
            />
          </label>
        )}
      </div>
      <LineSeparator direction="horizontal" className={styles.lineSeparator} />

      <p className={styles.label}>상세 후기를 작성해 주세요</p>
      <Textarea
        placeholder="최소 10자 이상 입력해주세요"
        value={review}
        onChange={handleReviewChange}
      />
      <Button
        variant="primary"
        onClick={onSubmit}
        type="submit"
        disabled={!isValid}
        className="mt-[26px] pc:mt-[40px]"
      >
        리뷰 작성하기
      </Button>
    </form>
  );
}
