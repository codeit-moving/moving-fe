import type { Meta, StoryObj } from "@storybook/react";
import StarRatingDisplay from "./StarRatingDisplay";

const meta = {
  title: "Common/StarRatingDisplay",
  component: StarRatingDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StarRatingDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    average: 3.5,
    size: "responsive",
  },
};

export const FullStars: Story = {
  args: {
    average: 5,
    size: "responsive",
  },
};

export const LowRating: Story = {
  args: {
    average: 1.5,
    size: "responsive",
  },
};

export const Fixed: Story = {
  args: {
    average: 4,
    size: "fixed",
  },
};
