import Image from "next/image";
import assets from "@/variables/images";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

const EmptyReview = ({ tab }: { tab?: number }) => {
  const router = useRouter();
  const message =
    tab === undefined
      ? "아직 해당 기사님의 리뷰가 없어요"
      : tab === 0
      ? "아직 작성할 수 있는 리뷰가 없어요"
      : "아직 등록된 리뷰가 없어요!";
  const handleButtonClick = () => {
    router.push("/me/review?tab=0");
  };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-6 pc:gap-8">
      <Image
        className="w-[110px] h-[82px] pc:w-[184px] pc:h-[136px]"
        width={110}
        height={82}
        src={assets.icons.empty}
        alt="empty-review"
      />
      <p className="text-lg font-normal text-grayscale-400 text-center w-full pc:text-2xl">
        {message}
      </p>
      {tab === 1 && (
        <Button onClick={handleButtonClick}>리뷰 작성하려 가기</Button>
      )}
    </div>
  );
};

export default EmptyReview;
