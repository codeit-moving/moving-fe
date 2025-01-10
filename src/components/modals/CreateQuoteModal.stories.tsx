import { Meta, StoryObj } from "@storybook/react";
import QuoteModal from "./CreateQuoteModal";

const meta: Meta<typeof QuoteModal> = {
  title: "Components/CreateQuoteModal",
  component: QuoteModal,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuoteModal>;

export const QuoteRequest: Story = {
  args: {
    serviceType: 1,
    isDesignatedQuote: true,
    onClose: () => {
      console.log("close");
    },
    onSubmit: () => {
      console.log("submit");
    },
  },
};

export const QuoteRejected: Story = {
  args: {
    ...QuoteRequest.args,
  },
};
