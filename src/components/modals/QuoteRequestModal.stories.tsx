import { Meta, StoryObj } from "@storybook/react";
import QuoteRequestModal from "./QuoteRequestModal";

const meta: Meta<typeof QuoteRequestModal> = {
  title: "Components/QuoteRequestModal",
  component: QuoteRequestModal,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuoteRequestModal>;

export const Default: Story = {};
