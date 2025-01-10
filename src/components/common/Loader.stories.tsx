import type { Meta, StoryObj } from "@storybook/react";
import Loader from "./Loader";

const meta = {
  title: "Common/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    msg: "로딩중",
  },
};

export const CustomMessage: Story = {
  args: {
    msg: "데이터를 불러오는 중",
  },
};
