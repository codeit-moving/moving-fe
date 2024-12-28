import Image from "next/image";
import Button from "../common/Button";
import assets from "@/variables/images";

const styles = {
  container: `bg-white w-fit h-[208px] rounded-[24px] px-[16px] py-[24px] min-w-[293spx]
  pc:w-[608px] pc:h-[278px] pc:px-[24px] pc:py-[32px]`,
  title: `relative flex justify-between`,
  titleText: `text-2lg font-bold text-black-400 mb-[30px]
  pc:mb-[40px] pc:text-2xl pc:font-semibold`,
  close: "absolute top-0 right-0 cursor-pointer pc:w-[36px] pc:h-[36px]",
  description: "text-2lg font-medium text-black-300 mb-[24px] pc:mb-[40px]",
};

export interface AlertModalProps {
  onClose: () => void;
  onButtonClick?: () => void;
  buttonText?: string;
  title?: string;
  msg: string;
}

export const AlertModal = ({
  onClose,
  title = "오류가 발생했습니다.",
  buttonText = "확인",
  onButtonClick,
  msg,
}: AlertModalProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.titleText}>{title}</p>
        <Image
          src={assets.icons.x}
          alt="close"
          width={24}
          height={24}
          className={styles.close}
          onClick={onClose}
        />
      </div>
      <p className={styles.description}>{msg}</p>
      <Button
        onClick={onButtonClick || onClose}
        children={buttonText}
        variant="primary"
        width="100%"
        height="54px"
        className=""
      />
    </div>
  );
};

export default AlertModal;
