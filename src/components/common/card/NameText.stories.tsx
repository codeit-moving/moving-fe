import type { Meta, StoryObj } from "@storybook/react";
import NameText from "./NameText";

const meta = {
  title: "Common/Card/NameText",
  component: NameText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NameText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MoverResponsive: Story = {
  args: {
    text: "홍길동",
    type: "mover",
    size: "responsive",
  },
};

export const MoverFixed: Story = {
  args: {
    text: "홍길동",
    type: "mover",
    size: "fixed",
  },
};

export const CustomerResponsive: Story = {
  args: {
    text: "김철수",
    type: "customer",
    size: "responsive",
  },
};

export const CustomerFixed: Story = {
  args: {
    text: "김철수",
    type: "customer",
    size: "fixed",
  },
};
