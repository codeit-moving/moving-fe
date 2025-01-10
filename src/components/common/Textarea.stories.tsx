import Textarea from "./Textarea";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    name: "default",
    placeholder: "최소 10자 이상 입력해주세요",
  },
};

export const Scrolled: Story = {
  args: {
    name: "scrolled",
    value:
      "text area는 최소 10자 이상 입력해야 버튼이 활성화됩니다. 또한 input 내용이 길어지면 내부 스크롤이 나타납니다. text area는 최소 10자 이상 입력해야 버튼이 활성화됩니다. 또한 input 내용이 길어지면 내부 스크롤이 나타납",
  },
};

export const Error: Story = {
  args: {
    name: "error",
    value: "후기",
    error: "최소 10자 이상 입력해주세요",
  },
};
