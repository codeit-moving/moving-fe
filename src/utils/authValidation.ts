import { z } from "zod";

// 문자열 길이 제한
const LIMITS = {
  NAME: {
    MIN: 1,
    MAX: 5,
  },
  NICKNAME: {
    MIN: 1,
    MAX: 12,
  },
  PASSWORD: {
    MIN: 5,
  },
  PHONE: {
    MIN: 10,
    MAX: 12,
  },
  INTRODUCTION: {
    MIN: 1,
    MAX: 50,
  },
  DESCRIPTION: {
    MIN: 15,
    MAX: 200,
  },
} as const;

// 정규식 패턴
const REGEX = {
  name: new RegExp(`^[가-힣]{${LIMITS.NAME.MIN},${LIMITS.NAME.MAX}}$`),
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{5,}$/,
  phone: /^010-\d{4}-\d{4}$/,
  nickname: new RegExp(
    `^[가-힣]{${LIMITS.NICKNAME.MIN},${LIMITS.NICKNAME.MAX}}$`
  ),
} as const;

// 에러 메시지
const ERROR_MESSAGES = {
  name: `이름은 ${LIMITS.NAME.MIN}~${LIMITS.NAME.MAX}자의 한글만 입력 가능합니다.`,
  email: "올바른 이메일 형식이 아닙니다.",
  phone: "전화번호는 010-XXXX-XXXX 형식으로 입력해주세요.",
  password: `비밀번호는 특수문자, 숫자, 영문자를 포함하여 ${LIMITS.PASSWORD.MIN}자 이상이어야 합니다.`,
  passwordConfirm: "비밀번호가 일치하지 않습니다.",
  nickname: `별명은 ${LIMITS.NICKNAME.MIN}~${LIMITS.NICKNAME.MAX}자의 한글만 입력 가능합니다.`,
  introduction: {
    min: "한줄소개를 입력해주세요.",
    max: `한줄소개는 ${LIMITS.INTRODUCTION.MAX}자 이내로 입력해주세요.`,
  },
  description: {
    min: `상세설명은 ${LIMITS.DESCRIPTION.MIN}자 이상 입력해주세요.`,
    max: `상세설명은 ${LIMITS.DESCRIPTION.MAX}자 이내로 입력해주세요.`,
  },
} as const;

export const signUpSchema = z
  .object({
    name: z.string().regex(REGEX.name, ERROR_MESSAGES.name),
    email: z.string().email(ERROR_MESSAGES.email),
    phoneNumber: z.string().regex(REGEX.phone, ERROR_MESSAGES.phone),
    password: z.string().regex(REGEX.password, ERROR_MESSAGES.password),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: ERROR_MESSAGES.passwordConfirm,
    path: ["passwordConfirm"],
  });

export const loginSchema = z.object({
  email: z.string().email(ERROR_MESSAGES.email),
  password: z.string().regex(REGEX.password, ERROR_MESSAGES.password),
});

export const infoEditSchema = z
  .object({
    name: z.string().regex(REGEX.name, ERROR_MESSAGES.name),
    email: z.string().email(ERROR_MESSAGES.email),
    phoneNumber: z.string().regex(REGEX.phone, ERROR_MESSAGES.phone),
    currentPassword: z.string().optional().nullable(),
    newPassword: z.string().optional().nullable(),
    newPasswordConfirm: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.newPassword) {
        return REGEX.password.test(data.newPassword);
      }
      return true;
    },
    {
      message: ERROR_MESSAGES.password,
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
      message: ERROR_MESSAGES.passwordConfirm,
      path: ["newPasswordConfirm"],
    }
  );

export const profileSchema = (isUser: boolean) =>
  z.object({
    nickname: isUser
      ? z.string().optional()
      : z.string().regex(REGEX.nickname, ERROR_MESSAGES.nickname),
    career: isUser
      ? z.string().optional()
      : z
          .string()
          .regex(/^[0-9]+$/, "숫자만 입력해주세요.")
          .optional(),
    introduction: isUser
      ? z.string().optional()
      : z
          .string()
          .min(LIMITS.INTRODUCTION.MIN, ERROR_MESSAGES.introduction.min)
          .max(LIMITS.INTRODUCTION.MAX, ERROR_MESSAGES.introduction.max),
    description: isUser
      ? z.string().optional()
      : z
          .string()
          .min(LIMITS.DESCRIPTION.MIN, ERROR_MESSAGES.description.min)
          .max(LIMITS.DESCRIPTION.MAX, ERROR_MESSAGES.description.max),
    services: z
      .array(z.number())
      .min(1, "서비스를 최소 하나 이상 선택해주세요."),
    regions: z.array(z.number()).min(1, "지역을 최소 하나 이상 선택해주세요."),
    imageUrl: z.string().optional(),
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type InfoEditFormData = z.infer<typeof infoEditSchema>;
export type ProfileFormData = z.infer<ReturnType<typeof profileSchema>>;
