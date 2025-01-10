import { Meta, StoryObj } from "@storybook/react";
import LoginComponent from "./LoginComponent";

const meta = {
  title: "components/LoginComponent",
  component: LoginComponent,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginComponent>;

export default meta;

type Story = StoryObj<typeof LoginComponent>;

export const UserLogin: Story = {
  args: {
    isUser: true,
  },
};

export const MoverLogin: Story = {
  args: {
    isUser: false,
  },
};
