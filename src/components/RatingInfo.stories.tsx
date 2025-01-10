import type { Meta, StoryObj } from "@storybook/react";
import RatingInfo from "./RatingInfo";

const meta: Meta<typeof RatingInfo> = {
  title: "Components/progressbar/RatingInfo",
  component: RatingInfo,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [
        { name: "dark-gray", value: "#333333" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RatingInfo>;

export default meta;
type Story = StoryObj<typeof RatingInfo>;

export const sample: Story = {
  args: {
    rating: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 8,
      "5": 170,
      totalCount: 178,
      totalSum: 882,
      average: 4.9,
    },
  },
};
