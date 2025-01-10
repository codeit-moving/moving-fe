import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// 기본 Input 스토리
export const Default: Story = {
  args: {
    name: "default-input",
    placeholder: "Enter text here...",
    type: "text",
    className: "",
  },
};

// 로그인 및 회원가입 Input
export const AuthInput: Story = {
  args: {
    name: "auth-input",
    placeholder: "Enter your info",
    type: "text",
    className: "",
    isAuth: true, // "auth" 클래스는 흰색 배경으로 설정됨
  },
};

// 비밀번호 Input(type=password)
export const PasswordInput: Story = {
  args: {
    name: "password-input",
    placeholder: "Enter your password",
    type: "password",
    className: "",
    isAuth: true,
  },
};

// input 내부에 value가 있을 때
export const ValueInput: Story = {
  args: {
    name: "value-input",
    placeholder: "Enter your name",
    type: "text",
    className: "",
    value: "안녕하시렵니까",
  },
};

// 작은 크기의 Input 필드
export const ErrorMessageInput: Story = {
  args: {
    name: "none-auth-input",
    placeholder: "Enter anything",
    type: "text",
    className: "",
    error: "4040404040404040440404",
  },
};
