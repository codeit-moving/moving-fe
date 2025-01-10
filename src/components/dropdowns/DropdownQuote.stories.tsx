import type { Meta, StoryObj } from "@storybook/react";
import DropdownQuote from "./DropdownQuote";

const meta: Meta<typeof DropdownQuote> = {
  title: "Components/dropdows/DropdownQuote",
  component: DropdownQuote,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark-gray",
      values: [
        { name: "dark-gray", value: "#333333" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownQuote>;

export default meta;
type Story = StoryObj<typeof DropdownQuote>;

function printDropdownQuoteCode(quoteFilterCode: number): void {
  console.log("선택 코드(all : 0 , confirmed : 1) :", quoteFilterCode);
}

export const base: Story = {
  args: {
    onSelect: printDropdownQuoteCode,
  },
};
