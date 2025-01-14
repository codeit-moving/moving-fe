"use client";

import Image from "next/image";
import LandingSlider from "./LandingSwipe";
import { useState } from "react";
import assets from "@/variables/images";

interface SlideContent {
  image: string;
  type: string;
}

const slideContents = [
  {
    type: "소형이사",
    image: assets.images.buildingBlue,
  },
  {
    type: "사무실이사",
    image: assets.images.buildingOrange,
  },
  {
    type: "가정이사",
    image: assets.images.buildingSky,
  },
];

function MainSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <main className="flex flex-col tablet:flex-row h-[max(400px,40vh)] tablet:h-[max(40vh,400px)] overflow-hidden items-center p-6 tablet:px-12 pc:px-16 relative">
      <div className="absolute bottom-0 flex-1 flex justify-center items-end gap-2 tablet:gap-4">
        {slideContents.map((content, index) => (
          <div
            key={index}
            className={`relative transition-all duration-300 ease-in-out h-[90%]
              ${
                currentImageIndex === index
                  ? "w-36 tablet:w-52 pc:w-68 opacity-100 z-10"
                  : "w-20 tablet:w-24 pc:w-32 opacity-70 hover:opacity-90"
              }`}
          >
            <Image
              src={content.image}
              height={500}
              width={600}
              alt={`랜딩 ${index + 1}`}
              className={`object-cover w-full h-full transition-all duration-300
                ${
                  currentImageIndex === index
                    ? "scale-105"
                    : "scale-100 hover:scale-102"
                }`}
            />
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col items-end">
        <div className="flex flex-col items-center gap-4 pb-20 z-50">
          <h1 className="flex flex-col items-center tablet:items-start font-bold transition-all duration-300">
            <span className="text-gray-800 text-ms tablet:text-xl pc:text-3xl font-semibold transition-all duration-300">
              원하는 이사 서비스로, 자유롭게 받아보는 견적
            </span>
          </h1>
          <LandingSlider onSlideChange={setCurrentImageIndex} />
        </div>
      </div>
    </main>
  );
}

export default MainSection;
