import { Meta, StoryObj } from "@storybook/react";
import SignUpComponent from "./SignUpComponent";

const meta = {
  title: "components/SignUpComponent",
  component: SignUpComponent,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SignUpComponent>;

export default meta;

type Story = StoryObj<typeof SignUpComponent>;

export const UserSignUp: Story = {
  args: {
    isUser: true,
  },
};

export const MoverSignUp: Story = {
  args: {
    isUser: false,
  },
};
