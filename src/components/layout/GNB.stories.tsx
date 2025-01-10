import type { Meta, StoryObj } from "@storybook/react";
import GNB from "./GNB";

const meta = {
  title: "Layout/GNB",
  component: GNB,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GNB>;

export default meta;
type Story = StoryObj<typeof GNB>;

export const Mobile: Story = {
  args: {
    userType: "USER",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
};

export const Tablet: Story = {
  args: {
    userType: "USER",
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

export const PC: Story = {
  args: {
    userType: "USER",
  },
  parameters: {
    viewport: {
      defaultViewport: "pc",
    },
  },
};
