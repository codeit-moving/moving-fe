import { Meta, StoryObj } from "@storybook/react";
import ChatField from "./ChatField";

const meta: Meta<typeof ChatField> = {
  title: "Components/ChatField",
  component: ChatField,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChatField>;

export default meta;
type Story = StoryObj<typeof ChatField>;

// 기본 Input 스토리
export const DefaultSmall: Story = {
  args: {
    radius: "24px",
    value: "Hello, world!",
    variant: "default",
    type: "admin",
  },
};

export const DefaultLarge: Story = {
  args: {
    radius: "30px",
    value: "Hello, world!Hello, world!Hello, world!",
    variant: "default",
    type: "custom",
  },
};

export const PrimarySmall: Story = {
  args: {
    radius: "24px",
    value: "Hello, world!",
    variant: "primary",
    type: "admin",
  },
};

export const PrimaryLarge: Story = {
  args: {
    radius: "30px",
    value: "Hello, world!Hello, world!Hello, world!",
    variant: "primary",
    type: "custom",
  },
};

export const SecondarySmall: Story = {
  args: {
    radius: "24px",
    value: "Hello, world!",
    variant: "secondary",
    type: "admin",
  },
};

export const SecondaryLarge: Story = {
  args: {
    radius: "30px",
    value: "Hello, world!Hello, world!Hello, world!",
    variant: "secondary",
    type: "custom",
  },
};
