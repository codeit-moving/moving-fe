interface AddressChipProps {
  text: "도로명" | "지번";
}

export default function AddressChip({ text }: AddressChipProps) {
  const styles = {
    container: `
        whitespace-nowrap h-fit w-[54px] text-center
        bg-pr-blue-50 rounded-[16px] text-pr-blue-300
        px-[6px] py-[2px] text-xs
        pc:px-[8.5px] pc:py-[2px] pc:text-md
    `,
  };
  return <span className={styles.container}>{text}</span>;
}
