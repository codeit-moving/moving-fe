"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import assets from "@/variables/images";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slideContents = [
  {
    type: "소형이사",
    image: assets.images.buildingBlue,
    description: "전문가의 손길로 안전하게 (원룸, 투룸 20평대 미만)",
  },
  {
    type: "사무실이사",
    image: assets.images.buildingOrange,
    description:
      "사무실 공간, 효율적이고 체계적인 이전 서비스 (사무실, 상업공간)",
  },
  {
    type: "가정이사",
    image: assets.images.buildingSky,
    description: "소중한 우리 집, 꼼꼼하고 안전한 이사 (쓰리룸, 20평대 미만)",
  },
];

function LandingSlider({
  onSlideChange,
}: {
  onSlideChange: (index: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % slideContents.length;
    setCurrentIndex(nextIndex);
    onSlideChange(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      (currentIndex - 1 + slideContents.length) % slideContents.length;
    setCurrentIndex(prevIndex);
    onSlideChange(prevIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative flex items-center gap-2 tablet:gap-4 justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 transition-all"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          {...handlers}
          className="h-8 w-32 tablet:w-40 overflow-hidden relative cursor-pointer"
        >
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div className="flex">
              {slideContents.map((content, index) => (
                <div
                  key={index}
                  className="h-8 min-w-[8rem] tablet:min-w-[10rem] flex items-center justify-center text-lg font-semibold text-pr-blue-300"
                >
                  {content.type}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="relative h-6 overflow-hidden">
        <div
          className="transition-transform duration-500 ease-in-out absolute w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="flex">
            {slideContents.map((content, index) => (
              <div
                key={index}
                className="min-w-full text-center text-sm text-gray-600"
              >
                {content.description}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingSlider;
