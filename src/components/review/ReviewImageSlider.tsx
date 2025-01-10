import React, { useState, MouseEvent } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import assets from "@/variables/images";

function ReviewImageSlider({ images }: { images: string[] }): JSX.Element {
  const [slideIsOpen, setSlideIsOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openSlide = (index: number): void => {
    setCurrentImageIndex(index);
    setSlideIsOpen(true);
  };

  const closeSlide = (): void => {
    setSlideIsOpen(false);
  };

  const nextImage = (): void => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (): void => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });

  const styles = {
    directionButton:
      "hidden tablet:block hover:bg-black-200 p-3 text-4xl rounded-full bg-black-100",
  };

  return (
    <div className="w-full tablet:w-fit tablet:h-auto">
      {!slideIsOpen && (
        <div
          className="relative w-full tablet:grid tablet:grid-cols-3 gap-4 p-4"
          {...handlers}
        >
          {images.map((image, index) => (
            <div
              className={`relative aspect-square w-full tablet:w-48 tablet:h-48 overflow-hidden border-solid border-[3px] border-line-100 rounded-[16px] cursor-pointer hover:opacity-90 transition-opacity hover:border-pr-blue-100 ${
                index === currentImageIndex ? "block" : "hidden tablet:block"
              }`}
              key={index}
            >
              <Image
                src={image}
                alt={`review image ${index + 1}`}
                onClick={(e: MouseEvent<HTMLImageElement>) => {
                  e.preventDefault();
                  openSlide(index);
                }}
                fill
                className="tablet:object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>
          ))}
          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 tablet:hidden">
            <p className="text-lg font-semibold text-black-200">
              {currentImageIndex + 1} / {images.length}
            </p>
          </div> */}
        </div>
      )}

      {slideIsOpen && (
        <div className="fixed inset-0 bg-black-400 bg-opacity-90 z-50">
          <div className="absolute top-6 right-6">
            <button
              onClick={closeSlide}
              className="text-white hover:text-gray-300 p-2"
            >
              <Image
                src={assets.icons.xCircle}
                width={40}
                height={40}
                alt="close button"
              />
            </button>
          </div>

          <div
            className="h-screen flex items-center gap-6 justify-center px-4 touch-pan-y"
            {...handlers}
          >
            <button onClick={prevImage} className={styles.directionButton}>
              <Image
                src={assets.icons.chevronLeft}
                width={32}
                height={32}
                alt="button to slide left"
              />
            </button>
            <div className=" relative w-[70vw] h-[70vh]">
              <Image
                src={images[currentImageIndex]}
                alt={`image ${currentImageIndex + 1}`}
                className="max-h-[80vh] max-w-[90vw] object-contain"
                fill
              />
            </div>
            <button onClick={nextImage} className={styles.directionButton}>
              <Image
                src={assets.icons.chevronRight}
                width={32}
                height={32}
                alt="button to slide right"
              />
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <p className="text-white">
              {currentImageIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewImageSlider;
