"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import AlertModal, { type AlertModalProps } from "../modals/AlertModal";
import BackDrop from "../modals/BackDrop";
import { useEffect } from "react";

const AlertModal_ = NiceModal.create(
  ({
    msg = "unknown error",
    title,
    buttonText,
    onButtonClick,
  }: AlertModalProps) => {
    const modal = useModal();
    return (
      <BackDrop>
        <AlertModal
          onClose={() => modal.remove()}
          msg={msg}
          title={title}
          buttonText={buttonText}
          onButtonClick={onButtonClick}
        />
      </BackDrop>
    );
  }
);

export default function NiceModalRegistry() {
  useEffect(() => {
    NiceModal.register("AlertModal", AlertModal_);
  }, []);

  return null;
}
