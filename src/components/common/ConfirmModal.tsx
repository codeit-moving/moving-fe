"use client";

import assets from "@/variables/images";
import Button from "@/components/common/Button";
import Image from "next/image";

interface ConfirmModalProps {
  onClose?: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function ConfirmModal({
  onClose,
  title = "지정 견적 요청하기",
  description = "일반 견적 요청을 먼저 진행해 주세요.",
  buttonText = "일반 견적 요청하기",
}: ConfirmModalProps) {
  const styles = {
    container: `bg-white w-full h-[208px] rounded-[24px] px-[16px] py-[24px]
    pc:w-[608px] pc:h-[278px] pc:px-[24px] pc:py-[32px]`,
    titleText: `text-2lg font-bold text-black-400 mb-[30px]
    pc:mb-[40px] pc:text-2xl pc:font-semibold`,
    description: "text-2lg font-medium text-black-300 mb-[24px] pc:mb-[40px]",
  };
  return (
    <div className={styles.container}>
      <p className={styles.titleText}>{title}</p>
      <p className={styles.description}>{description}</p>
      <Button
        onClick={onClose}
        children={buttonText}
        variant="primary"
        width="100%"
        height="54px"
        className=""
      />
    </div>
  );
}
