import Image from "next/image";
import assets from "@/variables/images";
import Link from "next/link";
import AuthSection from "@/components/home/AuthSection";
import MainSection from "@/components/LandingSection";

export default function Home() {
  return (
    <>
      <header className="flex h-[max(355px,30vh)] tablet:h-[max(50vh,435px)] overflow-hidden justify-center tablet:justify-between items-center p-12 pc:p-16 bg-pr-blue-50 relative">
        <div className="h-full gap-6 tablet:gap-0 flex flex-col justify-between items-center tablet:items-start ">
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
          <div className="w-full tablet:w-[160px] pc:w-full  transition-all duration-300 ">
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
      </header>
      <div className="flex flex-col gap-3 pc:gap-6 h-[max(150px,5vh)] tablet:h-[max(10vh,200px)] overflow-hidden justify-center items-center p-8 pc:p-12 relative bg-blue-100">
        <div className="flex flex-col items-center justify-center">
          <span className="text-gray-700 font-semibold text-xl pc:text-2xl">
            맘에 쏙 드는 기사님을 찾아보세요 !
          </span>
          <span className="text-gray-500 font-medium text-md pc:text-xl">
            내 지역에 위치한, 신뢰가능한 기사님
          </span>
        </div>
        <Link
          className="bg-none border-solid border-[1px] border-gray-500 text-gray-500 font-medium rounded-xl text-lg px-4 py-2 hover:bg-gray-100 hover:bg-opacity-20"
          href="/find-mover"
        >
          <div>기사님 찾기</div>
        </Link>
      </div>

      <MainSection />
    </>
  );
}
