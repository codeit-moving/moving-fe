"use client";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { profileSchema, ProfileFormData } from "@/utils/authValidation";
import { useRouter } from "next/navigation";
import Textarea from "@/components/common/Textarea";
import CheckboxChip from "@/components/common/checkboxs/CheckboxChip";
import Image from "next/image";
import assets from "@/variables/images";
import { REGION_CODES, REGION_TEXTS } from "@/variables/regions";
import { SERVICE_CODES, SERVICE_TEXTS } from "@/variables/service";
import toast from "react-hot-toast";
import { editCustomerProfile } from "@/api/customer";
import { useSignUpStore } from "@/store/signupStore";
import { customerSignup, moverSignup } from "@/api/auth";
import { editMoverProfile } from "@/api/mover";
import { useQueryClient } from "@tanstack/react-query";
import { moverKey } from "@/api/queryKeys";
import { customerProfile } from "@/api/customer";
import { moverProfile } from "@/api/mover";

interface ProfileProps {
  isOAuth: boolean;
  isUser: boolean;
  isEdit: boolean;
  userData?: {
    user: {
      customer?: {
        id: number;
        services: number[];
        regions: number[];
        imageUrl: string;
      };
      mover?: {
        id: number;
        nickname: string;
        career: string;
        introduction: string;
        description: string;
        services: number[];
        regions: number[];
        imageUrl: string;
      };
    };
  };
}

const styles = {
  container: `relative flex flex-col items-center w-full`,
  form: `flex flex-col gap-[0px] w-full mt-[16px] mb-[32px] pt-[20px] border-t-[1px] border-solid border-line-200`,
  formItem: `flex flex-col gap-[8px] border-b-[1px] border-solid border-line-100 pb-[20px] w-full mb-[20px]`,
  formLabel: `text-lg text-black-400 font-semibold pc:text-xl`,
  buttonContainer: `flex flex-col gap-[8px] mt-[24px] pc:flex-row-reverse pc:gap-[32px] w-full`,
  title: `w-full text-2lg font-bold text-black-400 pc:text-3xl pc:font-semibold`,
  errorMessage: `text-pr-red-200 text-sm font-regular mt-2 pc:mt-8`,
  serviceText: `mt-2 text-xs text-grayscale-400 pc:text-lg`,
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
  label: string | React.ReactNode;
  name: keyof ProfileFormData;
  type?: string;
  placeholder: string;
  register: any;
  error?: string;
  disabled?: boolean;
  className?: string;
}) => (
  <div className={styles.formItem}>
    <label htmlFor={name} className={styles.formLabel}>
      {label} <span className="text-pr-blue-300 text-lg font-semibold">*</span>
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

export default function Profile({
  isUser,
  isEdit,
  userData,
  isOAuth,
}: ProfileProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const defaultValues = isUser
    ? {
        services: userData?.user?.customer?.services ?? [],
        regions: userData?.user?.customer?.regions ?? [],
        imageUrl: userData?.user?.customer?.imageUrl ?? "",
      }
    : {
        nickname: userData?.user?.mover?.nickname ?? "",
        career: userData?.user?.mover?.career
          ? String(userData?.user?.mover?.career)
          : "",
        introduction: userData?.user?.mover?.introduction ?? "",
        description: userData?.user?.mover?.description ?? "",
        services: userData?.user?.mover?.services ?? [],
        regions: userData?.user?.mover?.regions ?? [],
        imageUrl: userData?.user?.mover?.imageUrl ?? "",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    setError,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema(isUser)),
    mode: "onChange",
    defaultValues,
  });

  const values = watch();
  const [previewImage, setPreviewImage] = React.useState<string>(
    isUser
      ? userData?.user?.customer?.imageUrl || assets.images.imagePlaceholder
      : userData?.user?.mover?.imageUrl || assets.images.imagePlaceholder
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getErrorMessage = (fieldName: keyof ProfileFormData) => {
    const value = values[fieldName];
    return Array.isArray(value)
      ? errors[fieldName]?.message
      : typeof value === "string"
      ? value.trim()
        ? errors[fieldName]?.message
        : undefined
      : errors[fieldName]?.message;
  };

  const validateForm = (data: ProfileFormData) => {
    if (isUser && (data.regions.length < 1 || data.regions.length > 3)) {
      setError("regions", {
        type: "manual",
        message: "1개 이상 3개 이하로 선택해주세요.",
      });
      return false;
    }
    if (!isUser && (data.regions.length === 0 || data.regions.length > 5)) {
      setError("regions", {
        type: "manual",
        message: "1개 이상 5개 이하로 선택해주세요.",
      });
      return false;
    }
    if (previewImage === assets.images.imagePlaceholder) {
      setError("imageUrl", {
        type: "manual",
        message: "이미지를 선택해주세요.",
      });
      return false;
    }
    return true;
  };

  const createFormData = (values: ProfileFormData) => {
    const formData = new FormData();
    formData.append("services", JSON.stringify(values.services));
    formData.append("regions", JSON.stringify(values.regions));

    if (fileInputRef.current?.files?.[0]) {
      formData.append("imageUrl", fileInputRef.current.files[0]);
    }

    if (!isUser) {
      if (values.nickname) formData.append("nickname", values.nickname);
      if (values.career) formData.append("career", values.career);
      if (values.introduction)
        formData.append("introduction", values.introduction);
      if (values.description)
        formData.append("description", values.description);
    }

    if (!isEdit && !isOAuth) {
      const signUpState = useSignUpStore.getState();
      formData.append("email", signUpState.userEmail);
      formData.append("password", signUpState.userPassword);
      formData.append("name", signUpState.userName);
      formData.append("phoneNumber", signUpState.userPhone);
      formData.append("isOAuth", "false");
    }

    return formData;
  };

  const handleSuccess = (isEdit: boolean) => {
    const message = isEdit
      ? "프로필 수정이 완료되었습니다."
      : "프로필 등록이 완료되었습니다.";
    const icon = isEdit ? "👏" : "🎉";

    toast.success(message, {
      position: "top-center",
      icon,
    });

    reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!validateForm(data)) return;

    try {
      const formData = createFormData(values);

      if (isEdit) {
        if (isUser) {
          await editCustomerProfile(formData);
          router.push("/find-mover");
        } else {
          await editMoverProfile(formData);
          await queryClient.invalidateQueries({
            queryKey: moverKey.myPage(),
          });
          router.push("/mover/my-page");
        }
      } else {
        if (isUser && !isOAuth) {
          await customerSignup(formData);
          router.push("/auth/login");
        } else if (!isUser && !isOAuth) {
          await moverSignup(formData);
          router.push("/mover/auth/login");
        } else if (isUser && isOAuth) {
          await customerProfile(formData);
          router.push("/find-mover");
        } else if (!isUser && isOAuth) {
          await moverProfile(formData);
          router.push("/find-mover");
        }
      }

      handleSuccess(isEdit);
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

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 선택할 수 있습니다.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setValue("imageUrl", reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const isRequiredFieldsFilled = () => {
    return values.description?.trim() !== "";
  };

  const isFormValid = !hasErrors && (!isUser ? isRequiredFieldsFilled() : true);

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        {!isUser && "기사님 "}
        {isEdit ? "프로필 수정" : "프로필 등록"}
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`${
            isUser
              ? "pc:flex pc:flex-col pc:gap-[0px]"
              : "pc:flex pc:flex-row pc:gap-[72px]"
          }`}
        >
          <div className="pc:flex pc:flex-col pc:w-full">
            {!isUser && (
              <FormField
                label="별명"
                name="nickname"
                placeholder="사이트에 노출될 이름을 입력해 주세요"
                register={register}
                error={getErrorMessage("nickname")}
              />
            )}
            <div className={styles.formItem}>
              <label className={styles.formLabel} htmlFor="profileImage">
                프로필 이미지{" "}
                <span className="text-pr-blue-300 text-lg font-semibold">
                  *
                </span>
              </label>
              <div className="relative w-[100px] h-[100px] border-solid border-[2px] border-gray-100 rounded-[8px]">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Image
                  src={previewImage}
                  alt="profile"
                  fill
                  onClick={handleProfileImageClick}
                  className="cursor-pointer rounded-md"
                />
                {isEdit && (
                  <Image
                    src={assets.icons.pencil}
                    className="absolute cursor-pointer left-[70px] top-[3px] bg-white border-gray-300 border-solid border-[1.5px] rounded-md p-[3px]"
                    width={22}
                    height={22}
                    alt="pencil"
                  />
                )}
              </div>
              {errors.imageUrl && (
                <p className={styles.errorMessage}>{errors.imageUrl.message}</p>
              )}
            </div>
            {!isUser && (
              <>
                <FormField
                  label="경력"
                  name="career"
                  placeholder="기사님의 경력을 입력해 주세요"
                  register={register}
                  error={getErrorMessage("career")}
                />
                <FormField
                  label="소개"
                  name="introduction"
                  placeholder="한 줄 소개를 입력해 주세요"
                  register={register}
                  error={getErrorMessage("introduction")}
                />
                <div
                  className={`${styles.formItem} border-none pc:pb-[0px] pc:mb-[0px] hidden pc:flex`}
                >
                  <label className={styles.formLabel} htmlFor="description">
                    상세 설명{" "}
                    <span className="text-pr-blue-300 text-lg font-semibold">
                      *
                    </span>
                  </label>
                  <Textarea
                    {...register("description")}
                    placeholder="상세 내용을 입력해 주세요"
                    error={getErrorMessage("description")}
                    value={values.description}
                    onChange={(value) => {
                      setValue("description", value, { shouldValidate: true });
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pc:flex pc:flex-col pc:w-full">
            <div
              className={`${styles.formItem} ${errors.services && "gap-[2px]"}`}
            >
              <label className={styles.formLabel} htmlFor="services">
                {isUser ? "이용 서비스" : "제공 서비스"}{" "}
                <span className="text-pr-blue-300 text-lg font-semibold">
                  *
                </span>
                {isUser && (
                  <p className={styles.serviceText}>
                    *이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
                  </p>
                )}
              </label>
              <div className="flex flex-row flex-wrap gap-[6px] mt-2 pc:mt-8">
                {Object.values(SERVICE_CODES).map((code) => (
                  <CheckboxChip
                    key={code}
                    text={SERVICE_TEXTS[code]}
                    state={values.services.includes(code)}
                    onStateChange={(checked: boolean) => {
                      let newServices: number[];
                      if (code === 99) {
                        newServices = checked
                          ? Object.values(SERVICE_CODES)
                          : [];
                      } else {
                        newServices = checked
                          ? [...values.services, code]
                          : values.services.filter(
                              (service) => service !== code
                            );
                        if (newServices.length == 4) {
                          if (!newServices.includes(99)) {
                            newServices.push(99);
                          }
                        }
                        if (
                          newServices.includes(99) &&
                          newServices.length < 5
                        ) {
                          newServices = newServices.filter(
                            (service) => service !== 99
                          );
                        }
                      }
                      setValue("services", newServices, {
                        shouldValidate: true,
                      });
                    }}
                  />
                ))}
              </div>
              {errors.services && (
                <p className={styles.errorMessage}>{errors.services.message}</p>
              )}
            </div>
            <div
              className={`${styles.formItem} ${
                errors.regions && "gap-[2px]"
              } pc:border-none`}
            >
              <label className={styles.formLabel} htmlFor="services">
                {isUser ? "내가 사는 지역" : "서비스 가능 지역"}{" "}
                <span className="text-pr-blue-300 text-lg font-semibold">
                  *
                </span>
                {isUser && (
                  <p className={styles.serviceText}>
                    *내가 사는 지역은 언제든 수정 가능해요!
                  </p>
                )}
              </label>
              <div className="flex flex-row flex-wrap gap-[8px] w-[277px] mt-2 pc:mt-8 pc:w-[416px]">
                {Object.values(REGION_CODES)
                  .filter((code) => code !== 82)
                  .map((code) => (
                    <CheckboxChip
                      key={code}
                      text={REGION_TEXTS[code]}
                      state={values.regions.includes(code)}
                      onStateChange={(checked: boolean) => {
                        let newRegions: number[];
                        newRegions = checked
                          ? [...values.regions, code]
                          : values.regions.filter((region) => region !== code);
                        setValue("regions", newRegions, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  ))}
              </div>
              {errors.regions && (
                <p className={styles.errorMessage}>{errors.regions.message}</p>
              )}
            </div>
          </div>
        </div>
        {!isUser && (
          <div
            className={`${styles.formItem} border-none pb-[0px] mb-[0px] pc:hidden`}
          >
            <label className={styles.formLabel} htmlFor="description">
              상세 설명{" "}
              <span className="text-pr-blue-300 text-lg font-semibold">*</span>
            </label>
            <Textarea
              {...register("description")}
              placeholder="상세 내용을 입력해 주세요"
              error={getErrorMessage("description")}
              value={values.description}
              onChange={(value) => {
                setValue("description", value, { shouldValidate: true });
              }}
            />
          </div>
        )}
        <div className={styles.buttonContainer}>
          <Button
            children={isEdit ? "수정하기" : "시작하기"}
            type="submit"
            variant="primary"
            className="flex-1 text-center"
            disabled={!isFormValid}
          />
          {isEdit && (
            <Button
              children="취소"
              variant="outlined"
              className="flex-1 text-center"
              onClick={() => {
                isUser ? router.back() : router.push("/mover/my-page");
              }}
            />
          )}
        </div>
      </form>
    </div>
  );
}
