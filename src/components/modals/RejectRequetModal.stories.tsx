import { Meta, StoryObj } from "@storybook/react";
import QuoteModal from "./RejectRequetModal";

const meta: Meta<typeof QuoteModal> = {
  title: "Components/RejectRequetModal",
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
