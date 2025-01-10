import Image from "next/image";
import assets from "@/variables/images";
import AuthSection from "@/components/home/AuthSection";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16 lg:py-20 max-w-sm lg:max-w-7xl">
      <h1 className="text-2xl md:text-2xl lg:text-3xl text-center font-semibold mb-11">
        원하는 이사 서비스를 요청하고 <br /> 견적을 받아보세요
      </h1>

      {/* Desktop layout (1024px+) */}
      <div className="hidden lg:block">
        <div className="flex gap-6 mb-8 justify-center">
          <div className="flex-3">
            <Image
              src={assets.images.landingMd01}
              alt="가정이사"
              width={450}
              height={600}
              priority
              sizes="(min-width: 1024px) 450px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex-8 grid grid-rows-2 gap-6">
            <div>
              <Image
                src={assets.images.landingMd02}
                alt="가정이사"
                width={900}
                height={290}
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <Image
                src={assets.images.landingMd03}
                alt="기업, 사무실 이사"
                width={900}
                height={290}
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Tablet/Mobile layout (<1024px) */}
      <div className="block lg:hidden">
        <div className="flex flex-col gap-6 mb-8">
          <div>
            <Image
              src={assets.images.landingSm01}
              alt="가정이사"
              width={374}
              height={200}
              priority
              sizes="(max-width: 1023px) 100vw, 374px"
              className="object-cover"
            />
          </div>
          <div>
            <Image
              src={assets.images.landingSm02}
              alt="가정이사"
              width={374}
              height={200}
              sizes="(max-width: 1023px) 100vw, 374px"
              className="object-cover"
            />
          </div>
          <div>
            <Image
              src={assets.images.landingSm03}
              alt="기업, 사무실 이사"
              width={374}
              height={200}
              sizes="(max-width: 1023px) 100vw, 374px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <AuthSection />
    </main>
  );
}
