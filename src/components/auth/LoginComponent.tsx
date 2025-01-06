"use client";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import SnsComponent from "@/components/auth/SnsComponent";
import FormHeader from "@/components/auth/FormHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/utils/authValidation";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@/api/auth";
import { useUserStore } from "@/store/userStore";
import { getUserInfo } from "@/api/user";

interface SignUpComponentProps {
  isUser: boolean;
}

interface FormFieldProps {
  register: any;
  error?: string;
  label: string;
  type: string;
  placeholder: string;
  name: string;
  auth: boolean;
}

const styles = {
  container: `flex flex-col items-center w-full tablet:px-0`,
  logo: `pc:w-[140px] pc:h-[80px] mb-[10px]`,
  linkDescription: `text-xs text-black-100 pc:text-xl pc:text-black-200`,
  link: `text-pr-blue-300 underline font-semibold`,
  form: `flex flex-col gap-[16px] w-full mt-[40px] mb-[16px]`,
  formItem: `flex flex-col gap-[8px]`,
  formLabel: `text-md text-black-400 pc:text-xl`,
  button: `mt-[16px]`,
  snsContainer: `flex flex-col items-center gap-[24px] mt-[40px]`,
};

const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  auth,
}: FormFieldProps) => (
  <div className={styles.formItem}>
    <label htmlFor={name} className={styles.formLabel}>
      {label}
    </label>
    <Input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      error={error}
      isAuth={auth}
    />
  </div>
);

export default function SignUpComponent({ isUser }: SignUpComponentProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    const validationResult = loginSchema.safeParse(data);
    if (!validationResult.success) {
      throw new Error("유효성 검사 실패");
    }
    try {
      await login(data);

      const userInfo = await getUserInfo();
      const userRole = userInfo.user.mover
        ? "MOVER"
        : userInfo.user.customer
        ? "USER"
        : null;

      useUserStore.getState().setUserData({
        email: userInfo.user.email,
        name: userInfo.user.name,
        phoneNumber: userInfo.user.phoneNumber,
        role: userRole,
        isOAuth: false,
      });
      reset();
      isUser ? router.push("/find-mover") : router.push("/mover/request");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.data?.message ||
        error.response?.data?.message ||
        "로그인에 실패했습니다.";

      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  return (
    <div className={styles.container}>
      <FormHeader isUser={isUser} signUp={false} />
      <form className={styles.form}>
        <FormField
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          register={register}
          error={errors.email?.message}
          auth={true}
        />
        <FormField
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          register={register}
          error={errors.password?.message}
          auth={true}
        />
        <Button
          children="로그인"
          type="submit"
          variant="primary"
          className={styles.button}
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit(onSubmit)}
        />
      </form>

      <p className={styles.linkDescription}>
        아직 무빙 회원이 아니신가요?{" "}
        {isUser ? (
          <a href="/auth/register" className={styles.link}>
            이메일로 회원가입하기
          </a>
        ) : (
          <a href="/mover/auth/register" className={styles.link}>
            이메일로 회원가입하기
          </a>
        )}
      </p>
      <div className={styles.snsContainer}>
        <SnsComponent isUser={isUser} />
      </div>
    </div>
  );
}
