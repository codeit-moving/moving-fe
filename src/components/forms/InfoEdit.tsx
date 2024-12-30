"use client";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { infoEditSchema, InfoEditFormData } from "@/utils/authValidation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { editUserInfo } from "@/api/user";
import { UserInfo } from "@/types/auth";
import NiceModal from "@ebay/nice-modal-react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { passwordCheck } from "@/api/auth";
import { useQueryClient } from "@tanstack/react-query";
import { moverKey } from "@/api/queryKeys";

interface InfoEditProps {
  isUser: boolean;
  userData: {
    user: {
      name: string;
      email: string;
      phoneNumber: string;
      isOAuth: boolean;
      id: number;
    };
  };
}

const styles = {
  container: `relative flex flex-col items-center w-full`,
  pcContainer: `pc:flex pc:flex-col pc:items-center pc:w-full`,
  pcForm: `pc:flex pc:flex-row pc:gap-[72px]`,
  form: `flex flex-col gap-[16px] w-full mt-[16px] mb-[32px] pt-[20px] border-t-[1px] border-solid border-line-200`,
  formItem: `flex flex-col gap-[8px] border-b-[1px] border-solid border-line-100 pb-[20px] w-full mb-[20px]
  pc:mb-[32px] pc:pb-[32px]`,
  formLabel: `text-lg text-black-400 font-semibold pc:text-xl`,
  buttonContainer: `flex flex-col gap-[8px] mt-[24px] pc:flex-row-reverse pc:gap-[32px] w-full`,
  button: `flex-1 text-center`,
  title: `w-full text-2lg font-bold text-black-400`,
};

const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  disabled = false,
  className = "",
}: {
  label: string;
  name: keyof InfoEditFormData;
  type?: string;
  placeholder: string;
  register: any;
  error?: string;
  disabled?: boolean;
  className?: string;
}) => (
  <div className={styles.formItem}>
    <label htmlFor={name} className={styles.formLabel}>
      {label}
    </label>
    <Input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
      className={className}
    />
  </div>
);

NiceModal.register("confirm-modal", ConfirmModal);

export default function InfoEdit({ isUser, userData }: InfoEditProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm<InfoEditFormData>({
    resolver: zodResolver(infoEditSchema),
    mode: "onChange",
    defaultValues: {
      name: userData.user.name,
      email: userData.user.email,
      phoneNumber: userData.user.phoneNumber,
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  React.useEffect(() => {
    if (!isAuthenticated && !modalShown) {
      setModalShown(true);
      const showPasswordConfirm = async () => {
        try {
          await NiceModal.show("confirm-modal", {
            title: "비밀번호 확인",
            description: "정보 수정을 위해 현재 비밀번호를 입력해주세요.",
            buttonText: "확인",
            onConfirm: async (password: string) => {
              try {
                await passwordCheck(password);
                setIsAuthenticated(true);
                NiceModal.remove("confirm-modal");
              } catch (error) {
                toast.error("비밀번호가 일치하지 않습니다.", {
                  position: "top-center",
                });
                return false; // 모달 유지
              }
            },
            onCancel: () => {
              router.back();
            },
          });
        } catch (error) {
          console.error("Modal error:", error);
          router.back();
        }
      };

      showPasswordConfirm();
    }
  }, [isAuthenticated, modalShown]);

  if (!isAuthenticated) {
    return null;
  }

  const values = watch();

  const getErrorMessage = (fieldName: keyof InfoEditFormData) => {
    return values[fieldName]?.trim() ? errors[fieldName]?.message : undefined;
  };

  const onSubmit = async (data: InfoEditFormData) => {
    const userInfo: UserInfo = {
      name: data.name,
      phoneNumber: data.phoneNumber,
    };

    if (data.newPassword && data.currentPassword) {
      userInfo.currentPassword = data.currentPassword;
      userInfo.newPassword = data.newPassword;
    }
    try {
      await editUserInfo(userInfo);

      isUser
        ? router.push("/find-mover")
        : await queryClient.invalidateQueries({
            queryKey: moverKey.myPage(),
          });
      router.push("/mover/my-page");

      toast.success("기본정보 수정이 완료되었습니다.", {
        position: "top-center",
        icon: "👏",
      });
      reset();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.data?.message ||
        error.response?.data?.message ||
        "정보 수정에 실패했습니다.";

      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  const isSubmitDisabled = () => {
    const isPasswordChangeValid =
      values.newPassword || values.newPasswordConfirm
        ? values.newPassword && values.newPasswordConfirm
        : true;

    return !isPasswordChangeValid || (hasErrors && isDirty);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>기본정보 수정</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.pcForm}>
          <div className={styles.pcContainer}>
            <FormField
              label="이름"
              name="name"
              placeholder="성함을 입력해 주세요"
              register={register}
              error={getErrorMessage("name")}
            />
            <FormField
              label="이메일"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              register={register}
              error={getErrorMessage("email")}
              disabled={true}
              className="cursor-not-allowed text-grayscale-300"
            />
            <FormField
              label="전화번호"
              name="phoneNumber"
              placeholder="휴대폰 번호를 입력해주세요."
              register={register}
              error={getErrorMessage("phoneNumber")}
            />
          </div>
          <div className={styles.pcContainer}>
            <FormField
              label="현재 비밀번호"
              name="currentPassword"
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
              register={register}
              error={getErrorMessage("currentPassword")}
            />
            <FormField
              label="새 비밀번호"
              name="newPassword"
              type="password"
              placeholder="새 비밀번호를 입력해주세요"
              register={register}
              error={getErrorMessage("newPassword")}
            />
            <FormField
              label="새 비밀번호 확인"
              name="newPasswordConfirm"
              type="password"
              placeholder="새 비밀번호를 다시 입력해주세요"
              register={register}
              error={getErrorMessage("newPasswordConfirm")}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            children="수정하기"
            type="submit"
            variant="primary"
            className={styles.button}
            disabled={isSubmitDisabled()}
          />
          <Button
            children="취소"
            variant="outlined"
            className={styles.button}
            onClick={() => {
              isUser ? router.back() : router.push("/mover/my-page");
            }}
          />
        </div>
      </form>
    </div>
  );
}
