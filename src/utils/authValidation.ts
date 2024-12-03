import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "이름은 2자 이상이어야 합니다.")
      .regex(/^[가-힣a-zA-Z\s]+$/, "이름은 한글 또는 영어만 입력해주세요."),
    email: z.string().email("이메일 형식이 아닙니다."),
    phoneNumber: z
      .string()
      .regex(/^01[0-9]\d{7,8}$/, "올바른 전화번호 형식이 아닙니다."),
    password: z.string().min(8, "비밀번호가 올바르지 않습니다."),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export const loginSchema = z.object({
  email: z.string().email("이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호가 올바르지 않습니다."),
});

export const infoEditSchema = z
  .object({
    name: z
      .string()
      .min(2, "이름은 2자 이상이어야 합니다.")
      .regex(/^[가-힣a-zA-Z\s]+$/, "이름은 한글 또는 영어만 입력해주세요."),
    email: z.string().email("이메일 형식이 아닙니다"),
    phoneNumber: z
      .string()
      .regex(/^01[0-9]\d{7,8}$/, "올바른 전화번호 형식이 아닙니다."),
    currentPassword: z.string().optional().nullable(),
    newPassword: z.string().optional().nullable(),
    newPasswordConfirm: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.currentPassword && data.currentPassword.length < 8) {
        return false;
      }
      return true;
    },
    {
      message: "비밀번호가 올바르지 않습니다.",
      path: ["currentPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length < 8) {
        return false;
      }
      return true;
    },
    {
      message: "비밀번호가 올바르지 않습니다.",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPasswordConfirm) {
        return data.newPassword === data.newPasswordConfirm;
      }
      return true;
    },
    {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["newPasswordConfirm"],
    }
  );

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type InfoEditFormData = z.infer<typeof infoEditSchema>;
