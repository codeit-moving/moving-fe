import type { Meta, StoryObj } from "@storybook/react";
import ProgressBarMovingRequest from "./ProgressBarMovingRequest";

const meta: Meta<typeof ProgressBarMovingRequest> = {
  title: "Components/progressbar/ProgressBarMovingRequest",
  component: ProgressBarMovingRequest,
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
} satisfies Meta<typeof ProgressBarMovingRequest>;

export default meta;
type Story = StoryObj<typeof ProgressBarMovingRequest>;

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
