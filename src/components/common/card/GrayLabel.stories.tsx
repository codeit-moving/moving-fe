import type { Meta, StoryObj } from "@storybook/react";
import GrayLabel from "./GrayLabel";

const meta = {
  title: "Components/Common/GrayLabel",
  component: GrayLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GrayLabel>;

export default meta;
type Story = StoryObj<typeof GrayLabel>;

export const Default: Story = {
  args: {
    children: "라벨 텍스트",
  },
};

export const Border: Story = {
  args: {
    children: "라벨 텍스트",
    variant: "border",
  },
};

export const Solid: Story = {
  args: {
    children: "라벨 텍스트",
    variant: "solid",
  },
};

export const Fixed: Story = {
  args: {
    children: "라벨 텍스트",
    size: "fixed",
  },
};

export const Responsive: Story = {
  args: {
    children: "라벨 텍스트",
    size: "responsive",
  },
};

// 모든 variants 조합을 보여주는 예시
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <GrayLabel variant="border" size="fixed">
          Border Fixed
        </GrayLabel>
        <GrayLabel variant="border" size="responsive">
          Border Responsive
        </GrayLabel>
      </div>
      <div className="flex gap-2">
        <GrayLabel variant="solid" size="fixed">
          Solid Fixed
        </GrayLabel>
        <GrayLabel variant="solid" size="responsive">
          Solid Responsive
        </GrayLabel>
      </div>
    </div>
  ),
};
