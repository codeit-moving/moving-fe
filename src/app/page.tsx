import Image from "next/image";
import assets from "@/variables/images";
import Link from "next/link";
import AuthSection from "@/components/home/AuthSection";
import MainSection from "@/components/LandingSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="relative h-[max(355px,30vh)] tablet:h-[max(50vh,435px)] overflow-hidden">
        {/* 배경 레이어 */}
        <div className="absolute inset-0">
          {/* 모바일: 단색 배경 */}
          <div className="absolute inset-0 bg-pr-blue-50 tablet:bg-white"></div>
          {/* 태블릿 이상: 대각선 배경 */}
          <div
            className="absolute inset-0 bg-pr-blue-50 hidden tablet:block pc:hidden"
            style={{
              clipPath: "polygon(0 0, 55% 0, 25% 100%, 0 100%)",
            }}
          ></div>
          <div
            className="absolute inset-0 bg-pr-blue-50 hidden pc:block"
            style={{
              clipPath: "polygon(0 0, 55% 0, 45% 100%, 0 100%)",
            }}
          ></div>
        </div>

        {/* 컨텐츠 레이어 */}
        <div className="relative z-10 h-full flex justify-center tablet:justify-between items-center p-12 pc:p-16">
          <div className="h-full gap-6 tablet:gap-0 flex flex-col justify-between items-center tablet:items-start">
            <h1 className="pl-0 flex flex-col items-center tablet:items-end font-bold transition-all duration-300">
              <span className="text-gray-800 text-ms tablet:text-xl pc:text-3xl font-semibold transition-all duration-300">
                이사 소비자와 이사 전문가 매칭 서비스
              </span>
              <Image
                src={assets.images.logoWordmark}
                height={100}
                width={200}
                alt="랜딩 1"
                className="w-[100px] tablet:w-[150px] pc:w-[200px] transition-all duration-300"
              />
            </h1>
            <div className="w-full tablet:w-[160px] pc:w-full transition-all duration-300">
              <AuthSection />
            </div>
          </div>

          <Image
            src={assets.images.landingTruck}
            height={500}
            width={600}
            alt="랜딩 1"
            className="hidden tablet:block absolute bottom-2 right-2 flex-2 w-[300px] tablet:w-[500px] pc:w-[700px] transition-all duration-300"
          />
        </div>
      </header>

      <div className="mb-20 flex flex-col gap-3 pc:gap-6 h-[max(170px,5vh)] tablet:h-[max(10vh,200px)] overflow-hidden justify-center items-center p-8 pc:p-12 relative bg-blue-300">
        <div className="flex flex-col items-center justify-center">
          <span className="text-white font-semibold text-xl pc:text-2xl">
            맘에 쏙 드는 기사님을 찾아보세요 !
          </span>
          <span className="text-gray-100 font-medium text-md pc:text-xl">
            내 지역에 위치한, 신뢰가능한 기사님
          </span>
        </div>
        <Link
          className="bg-none border-solid border-[1px] border-gray-100 text-gray-100 font-medium rounded-xl text-lg px-4 py-2 hover:bg-gray-100 hover:bg-opacity-20"
          href="/find-mover"
        >
          <div>기사님 찾기</div>
        </Link>
      </div>

      <MainSection />
      <footer className="flex h-[max(80px,2vh)] tablet:h-[max(10vh,150px)] overflow-hidden justify-between items-center px-[24px] pc:px-[88px] tablet:px-[72px] relative bg-blue-100">
        <div className="max-w-[1400px] mx-auto w-full flex justify-between items-center">
          <span className="font-semibold text-gray-500">©Codeit</span>

          <span className="font-semibold text-gray-500">FS01-TEAM1</span>
        </div>
      </footer>
    </main>
  );
}
