"use client";

import React, { useEffect, useRef } from "react";

export default function Loading() {
  const progressRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const truck = truckRef.current;
    if (!progress || !truck) return;

    const animate = () => {
      // 처음 위치로 리셋
      progress.style.width = "0%";
      truck.style.left = "0%";
      progress.style.transition = "none";
      truck.style.transition = "none";

      // 강제 리플로우
      progress.offsetHeight;
      truck.offsetHeight;

      // 애니메이션 적용 (3초로 변경)
      progress.style.transition = "all 3000ms ease-in-out";
      truck.style.transition = "all 3000ms ease-in-out";
      progress.style.width = "100%";
      truck.style.left = "100%";
    };

    animate();
    // 간격을 3100ms로 설정 (애니메이션 시간 + 약간의 여유)
    const interval = setInterval(animate, 3100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden fixed inset-0 flex flex-col items-center justify-center gap-4 bg-white/80">
      <div className="w-64 h-2 bg-gray-200 rounded-full relative">
        <div
          ref={progressRef}
          className="h-full bg-blue-200 rounded-full transition-all duration-[3000ms] ease-in-out"
          style={{ width: "0%" }}
        />
        <div
          ref={truckRef}
          className="absolute top-1/2 transition-all duration-[3000ms] ease-in-out z-10"
          style={{
            left: "-12px",
            width: "36px",
            transform: "scaleX(-1) translateX(50%) translateY(-63%)", // translateY 값을 -50%에서 -25%로 변경하여 아래로 내림
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 486 286"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG 내용은 동일 */}
            <circle cx="433" cy="259" r="31" fill="#242945" />
            <path
              d="M168 250H451C451 258.837 443.837 266 435 266H184C175.163 266 168 258.837 168 250Z"
              fill="#242945"
            />
            <path
              d="M51 103C51 85.3269 65.3269 71 83 71H150V234C150 242.837 142.837 250 134 250H83C65.3269 250 51 235.673 51 218V103Z"
              fill="#E9F4FF"
            />
            <path
              d="M18 157C18 139.327 32.3269 125 50 125H101V234C101 242.837 93.8366 250 85 250H50C32.3269 250 18 235.673 18 218V157Z"
              fill="#E9F4FF"
            />
            <path
              d="M150 20C150 8.9543 158.954 0 170 0H466C477.046 0 486 8.9543 486 20V234C486 242.837 478.837 250 470 250H166C157.163 250 150 242.837 150 234V20Z"
              fill="#1B92FF"
            />
            <circle cx="90" cy="259" r="31" fill="#242945" />
            <path
              d="M61 105C61 91.7452 71.7452 81 85 81H132C136.418 81 140 84.5817 140 89V128C140 132.418 136.418 136 132 136H69C64.5817 136 61 132.418 61 128V105Z"
              fill="#242945"
            />
            <circle cx="18" cy="188" r="18" fill="#1B92FF" />
          </svg>
        </div>
      </div>
      <p className="text-gray-600 font-medium">페이지 로딩중...</p>
    </div>
  );
}
