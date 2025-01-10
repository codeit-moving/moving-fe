import type { Meta, StoryObj } from "@storybook/react";
import ProgressBarRating from "./ProgressBarRating";

const meta: Meta<typeof ProgressBarRating> = {
  title: "Components/progressbar/ProgressBarRating",
  component: ProgressBarRating,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark-gray",
      values: [
        { name: "dark-gray", value: "#333333" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProgressBarRating>;

export default meta;
type Story = StoryObj<typeof ProgressBarRating>;

export const sample1: Story = {
  args: {
    maxValue: 178,
    currentValue: 170,
  },
};

export const sample2: Story = {
  args: {
    maxValue: 178,
    currentValue: 8,
  },
};
