import AddressChip from "./AddressChip";

interface AddressFieldProps {
  onClick: () => void;
  zipCode: string;
  roadAddress: string;
  streetAddress: string;
  selected?: boolean;
  className?: string;
}

export default function AddressField({
  onClick,
  zipCode,
  roadAddress,
  streetAddress,
  selected = false,
  className,
}: AddressFieldProps) {
  const styles = {
    container: `
        rounded-[16px] px-[16px] py-[20px] text-left border-[1px] border-solid  w-full cursor-pointer h-[196px]
        pc:h-[158px] 
        ${className}
        ${
          selected
            ? "bg-pr-blue-50 border-pr-blue-200"
            : "bg-white border-line-100"
        }
    `,
    zipCode: `
        pc:text-lg
        text-md 
        font-semibold text-black-400 
    `,
    address: `
        pc:text-lg
        text-black-400 word-break:break-word text-md
    `,
    addressWrapper: `
        flex flex-col gap-[16px] mt-[16px]
    `,
    addressRow: `
        flex flex-row gap-[8px]
    `,
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <p className={styles.zipCode}>{zipCode}</p>
      <div className={styles.addressWrapper}>
        <div className={styles.addressRow}>
          <AddressChip text="도로명" />
          <p className={styles.address}>{roadAddress}</p>
        </div>
        <div className={styles.addressRow}>
          <AddressChip text="지번" />
          <p className={styles.address}>{streetAddress}</p>
        </div>
      </div>
    </div>
  );
}
