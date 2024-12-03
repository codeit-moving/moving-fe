"use client";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import SnsComponent from "@/components/auth/SnsComponent";
import FormHeader from "@/components/auth/FormHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { signUpSchema, SignUpFormData } from "@/utils/authValidation";

interface SignUpComponentProps {
  isUser: boolean;
}

const styles = {
  container: `flex flex-col items-center w-full px-[24px]
  tablet:px-0`,
  logo: `pc:w-[140px] pc:h-[80px] mb-[10px]`,
  linkDescription: `text-xs text-black-100 pc:text-xl pc:text-black-200`,
  link: `text-pr-blue-300 underline font-semibold`,
  form: `flex flex-col gap-[16px] w-full mt-[40px] mb-[16px]`,
  formItem: `flex flex-col gap-[8px]`,
  formLabel: `text-md text-black-400 pc:text-xl`,
  button: `mt-[16px]`,
  snsContainer: `flex flex-col items-center gap-[24px] mt-[40px]`,
};

export default function SignUpComponent({ isUser }: SignUpComponentProps) {
  const [isConfirmTouched, setIsConfirmTouched] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const password = watch("password");

  React.useEffect(() => {
    if (password && isConfirmTouched) {
      trigger("passwordConfirm");
    }
  }, [password, trigger, isConfirmTouched]);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const validationResult = signUpSchema.safeParse(data);
      if (!validationResult.success) {
        throw new Error("유효성 검사 실패");
      }

      // API 호출 로직
      console.log("폼 제출:", data);

      // 성공 시 폼 초기화
      reset();
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <div className={styles.container}>
      <FormHeader isUser={isUser} signUp={true} />
      <form className={styles.form}>
        <div className={styles.formItem}>
          <label htmlFor="name" className={styles.formLabel}>
            이름
          </label>
          <Input
            {...register("name")}
            type="text"
            placeholder="성함을 입력해 주세요"
            isAuth={true}
            error={errors.name?.message}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="email" className={styles.formLabel}>
            이메일
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="이메일을 입력해주세요."
            isAuth={true}
            error={errors.email?.message}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="phoneNumber" className={styles.formLabel}>
            전화번호
          </label>
          <Input
            {...register("phoneNumber")}
            type="text"
            placeholder="휴대폰 번호를 입력해주세요."
            isAuth={true}
            error={errors.phoneNumber?.message}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="password" className={styles.formLabel}>
            비밀번호
          </label>
          <Input
            {...register("password")}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            isAuth={true}
            error={errors.password?.message}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="passwordConfirm" className={styles.formLabel}>
            비밀번호 확인
          </label>
          <Input
            {...register("passwordConfirm")}
            type="password"
            placeholder="비밀번호를 다시 한번 입력해주세요."
            isAuth={true}
            error={
              isConfirmTouched ? errors.passwordConfirm?.message : undefined
            }
            onFocus={() => setIsConfirmTouched(true)}
          />
        </div>

        <Button
          children="시작하기"
          type="submit"
          variant="primary"
          className={styles.button}
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit(onSubmit)}
        />
      </form>

      <p className={styles.linkDescription}>
        이미 무빙 회원이신가요?{" "}
        {isUser ? (
          <a href="/auth/login" className={styles.link}>
            로그인
          </a>
        ) : (
          <a href="/mover/auth/login" className={styles.link}>
            로그인
          </a>
        )}
      </p>
      <div className={styles.snsContainer}>
        <SnsComponent />
      </div>
    </div>
  );
}
