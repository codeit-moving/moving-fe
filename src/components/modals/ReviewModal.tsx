"use client";

import Textarea from "../common/Textarea";
import ReviewMover, { type ReviewMoverData } from "../common/card/ReviewMover";
import assets from "@/variables/images";
import Image from "next/image";
import Button from "../common/Button";
import StarRating from "../common/StarRating";
import LineSeparator from "../common/LineSeparator";
import { useState } from "react";
import toast from "react-hot-toast";
import { useReviewMutation } from "@/api/mutation-hooks/review";
import { CreateReviewData } from "@/types/review";
import { X } from "lucide-react";

const styles = {
  wrapper: "flex items-center justify-center",
  container: `
    flex flex-col bg-white w-full 
    h-[550px]
    rounded-t-[32px] 
    pl-[24px] pr-[14px] py-[32px]
    tablet:rounded-[32px] tablet:w-[375px] tablet:h-[650px] 
    pc:w-[608px] pc:h-[750px]
  `,
  contentContainer: `
    flex-1
    overflow-y-auto
    scrollbar-thumb-rounded-full 
    scrollbar-track-rounded-full 
    scrollbar
    scrollbar-thumb-grayscale-200 
    scrollbar-w-1
    pc:scrollbar-w-1.5
    pr-[24px]
  `,
  buttonContainer: `
    py-[20px]
    border-t
    border-line-200
  `,
  lineSeparator: "my-[20px] pc:my-[32px]",
  label: "text-lg font-semibold text-black-300 mb-[16px] pc:text-xl",
};

interface ReviewModalProps {
  onClose: () => void;
  data: ReviewMoverData;
}

export default function ReviewModal({ onClose, data }: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const { mutate } = useReviewMutation(data.confirmedQuoteId);

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
    const reviewData: CreateReviewData = {
      rating: rating,
      content: review,
      images: images,
    };
    mutate(reviewData, {
      onSuccess: () => {
        toast.success("리뷰가 등록되었습니다");
        onClose();
      },
    });
  };

  return (
    <form className={styles.container}>
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
      <div className={styles.contentContainer}>
        <div className="flex flex-col gap-4 pc:gap-6">
          <ReviewMover data={data} variant="solid" />
        </div>
        <LineSeparator
          direction="horizontal"
          className={styles.lineSeparator}
        />
        <p className={styles.label}>평점을 선택해 주세요</p>
        <div className="flex flex-wrap gap-[8px]">
          <StarRating onRatingChange={handleRatingChange} />
        </div>
        <LineSeparator
          direction="horizontal"
          className={styles.lineSeparator}
        />

        <p className={styles.label}>리뷰 이미지 첨부</p>
        <div className="flex gap-[8px] mb-[20px]">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative w-[90px] h-[90px] rounded-[8px] border-solid border-[2px] border-gray-100 aspect-square pc:w-[100px] pc:h-[100px]"
            >
              <Image
                src={preview}
                alt={`review-image-${index}`}
                className="object-cover"
                fill
              />
              <button
                className="absolute top-[5px] right-[5px] bg-grayscale-200 rounded-full p-[2px] cursor-pointer"
                onClick={() => handleRemoveImage(index)}
                aria-label={`Remove image ${index + 1}`}
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          ))}
          {images.length < 3 && (
            <label className="w-[90px] h-[90px] border-solid border-[2px] border-gray-100 rounded-[8px] flex items-center justify-center cursor-pointer pc:w-[100px] pc:h-[100px]">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Image
                src={assets.icons.search}
                alt="add-image"
                width={32}
                height={32}
              />
            </label>
          )}
        </div>
        <LineSeparator
          direction="horizontal"
          className={styles.lineSeparator}
        />

        <p className={styles.label}>상세 후기를 작성해 주세요</p>
        <Textarea
          placeholder="최소 10자 이상 입력해주세요"
          value={review}
          onChange={handleReviewChange}
        />

        <div className={styles.buttonContainer}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            type="submit"
            disabled={!isValid}
            className="w-full"
          >
            리뷰 작성하기
          </Button>
        </div>
      </div>
    </form>
  );
}
