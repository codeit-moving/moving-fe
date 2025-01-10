import type { Meta, StoryObj } from "@storybook/react";
import TextWithGrayLabel from "./TextWithGrayLabel";

const meta = {
  title: "Common/TextWithGrayLabel",
  component: TextWithGrayLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextWithGrayLabel>;

export default meta;
type Story = StoryObj<typeof TextWithGrayLabel>;

export const Default: Story = {
  args: {
    label: "라벨",
    text: "텍스트",
  },
};

export const WithBorderVariant: Story = {
  args: {
    label: "라벨",
    text: "텍스트",
    variant: "border",
  },
};

export const FixedSize: Story = {
  args: {
    label: "라벨",
    text: "텍스트",
    size: "fixed",
  },
};

export const LongText: Story = {
  args: {
    label: "라벨",
    text: "이것은 매우 긴 텍스트입니다. truncate가 적용되어 있어 길이가 넘어가면 ...으로 표시됩니다.",
  },
};
