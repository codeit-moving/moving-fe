"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import NiceModal from "@ebay/nice-modal-react";
import { useModal } from "@ebay/nice-modal-react";
import { useState } from "react";

interface ConfirmModalProps {
  id?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onConfirm?: (password: string) => Promise<void>;
  onCancel?: () => void;
}

export default NiceModal.create(
  ({
    id,
    title = "비밀번호 확인",
    description = "정보 수정을 위해 현재 비밀번호를 입력해주세요.",
    buttonText = "확인",
    onConfirm,
    onCancel,
  }: ConfirmModalProps) => {
    const modal = useModal();
    const [password, setPassword] = useState("");

    const styles = {
      container: `bg-white w-[375px] h-auto rounded-[24px] px-[16px] py-[24px]
    tablet:w-[500px] pc:w-[608px] pc:px-[24px] pc:py-[32px]`,
      titleText: `text-2lg font-bold text-black-400 mb-[30px]
    pc:mb-[40px] pc:text-2xl pc:font-semibold`,
      description: "text-2lg font-medium text-black-300 mb-[24px] pc:mb-[40px]",
    };

    return (
      <div className="bg-[#141414] bg-opacity-50 fixed inset-0 flex flex-col items-center justify-center">
        <div className={styles.container} id={id}>
          <p className={styles.titleText}>{title}</p>
          <p className={styles.description}>{description}</p>
          <Input
            name="password"
            type="password"
            isAuth={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />
          <div className="flex gap-4 mt-4">
            <Button
              onClick={() => {
                if (onCancel) onCancel();
                modal.remove();
              }}
              children="취소"
              variant="outlined"
              width="100%"
              height="54px"
            />
            <Button
              onClick={async () => {
                if (onConfirm) await onConfirm(password);
              }}
              children={buttonText}
              variant="primary"
              width="100%"
              height="54px"
            />
          </div>
        </div>
      </div>
    );
  }
);
