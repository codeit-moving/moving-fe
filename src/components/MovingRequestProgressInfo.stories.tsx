import type { Meta, StoryObj } from "@storybook/react";
import MovingRequestProgressInfo from "./MovingRequestProgressInfo";

const meta: Meta<typeof MovingRequestProgressInfo> = {
  title: "Components/progressbar/MovingRequestProgressInfo",
  component: MovingRequestProgressInfo,
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
} satisfies Meta<typeof MovingRequestProgressInfo>;

export default meta;
type Story = StoryObj<typeof MovingRequestProgressInfo>;

export const sample1: Story = {
  args: {
    maxValue: 4,
    currentValue: 1,
  },
};

export const sample2: Story = {
  args: {
    maxValue: 4,
    currentValue: 4,
  },
};
