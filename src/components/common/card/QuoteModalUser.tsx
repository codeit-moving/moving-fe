import { formatDateWithDay } from "@/utils/utilFunctions";

interface QuoteModalMoverProps {
  customerName: string;
  moveDate: string;
  startAddress: string;
  endAddress: string;
}

const styles = {
  container: `flex flex-col gap-[8px] pt-[10px] pb-[20px] border-b-[1px] border-solid border-line-200 mb-[20px]
  pc:py-[24px] pc:px-[18px] pc:border-[1px] pc:rounded-[8px] pc:mb-[32px] `,
  customerName: `text-lg font-semibold text-black-300
  pc:text-2xl`,
  moveContainer: `flex flex-row gap-[8px] items-center
  pc:gap-[12px]`,
  chips: `bg-bg-400 py-[2px] px-[4px] rounded-[4px] w-fit h-fit text-md font-medium text-grayscale-400 
    pc:font-regular pc:text-2lg whitespace-nowrap`,
  textFont: `text-md font-medium text-black-300
  pc:text-2lg overflow-hidden whitespace-nowrap text-ellipsis`,
  locationContainer: `flex flex-col gap-[8px]
  pc:gap-[16px]`,
  locationWrapper: `flex flex-row gap-[8px] items-center
  pc:gap-[12px]`,
  divider: `text-xl font-medium text-line-200
  pc:text-2xl`,
};

export default function QuoteModalMover({
  customerName,
  moveDate,
  startAddress,
  endAddress,
}: QuoteModalMoverProps) {
  return (
    <div className={styles.container}>
      <p className={styles.customerName}>{customerName} 고객님</p>
      <div className={styles.moveContainer}>
        <p className={styles.chips}>이사일</p>
        <p className={styles.textFont}>{formatDateWithDay(moveDate)}</p>
      </div>
      <div className={styles.locationContainer}>
        <div className={styles.locationWrapper}>
          <p className={styles.chips}>출발</p>
          <p className={styles.textFont}>{startAddress}</p>
        </div>
        <div className={styles.locationWrapper}>
          <p className={styles.chips}>도착</p>
          <p className={styles.textFont}>{endAddress}</p>
        </div>
      </div>
    </div>
  );
}
