import cn from "@/config/cn";
import { getServiceText } from "@/utils/utilFunctions";
import { formatDate, formatDateWithDayTime } from "@/utils/utilFunctions";

const styles = {
  container: `flex flex-col justify-center gap-2.5 
     px-[20px] py-[16px] w-full 
     bg-bg-100 border-solid border-[1px] rounded-[16px] border-line-100 
     tablet:px-[32px] tablet:py-[24px]     
     pc:gap-4 pc:px-[40px] pc:py-[32px]`,
  wrapper: "flex flex-row justify-center h-6 text-md pc:h-[26px] pc:text-2lg",
  title: "w-[105px] text-grayscale-300 pc:w-[122px]",
  value: "w-full text-black-400 text-ellipsis",
};

interface QuoteDetailInfoItemProps {
  keyText: string;
  value: string;
}

function QuoteDetailInfoItem({ keyText, value }: QuoteDetailInfoItemProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{keyText}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

interface QuoteDetailInfoProps {
  data: {
    requestDate: string;
    service: number;
    movingDate: string;
    pickupAddress: string;
    dropOffAddress: string;
  };
  className?: string;
}

export default function QuoteDetailInfo({
  data,
  className,
}: QuoteDetailInfoProps) {
  const quoteClass = cn(styles.container, className);
  const itemInfos = [
    { keyText: "견적 요청일", value: formatDate(data.requestDate) },
    { keyText: "서비스", value: getServiceText(data.service) },
    { keyText: "이동일", value: formatDateWithDayTime(data.movingDate) },
    { keyText: "출발지", value: data.pickupAddress },
    { keyText: "도착지", value: data.dropOffAddress },
  ];
  const items = itemInfos.map((item, index) => {
    return (
      <QuoteDetailInfoItem
        key={index}
        keyText={item.keyText}
        value={item.value}
      />
    );
  });

  return <div className={quoteClass}>{items}</div>;
}
