import { Meta, StoryObj } from "@storybook/react";
import SearchInput from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof SearchInput>;

// 기본 Input 스토리
export const Default: Story = {
  args: {
    name: "default-input-small",
    placeholder: "Enter text here...",
  },
};
