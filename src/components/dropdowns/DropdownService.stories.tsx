import type { Meta, StoryObj } from "@storybook/react";
import DropdownService from "./DropdownService";

const meta: Meta<typeof DropdownService> = {
  title: "Components/dropdows/DropdownService",
  component: DropdownService,
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
} satisfies Meta<typeof DropdownService>;

export default meta;
type Story = StoryObj<typeof DropdownService>;

function printDropdownServiceCode(value: number | null): void {
  console.log("서비스 코드 :", value);
}

export const base: Story = {
  args: {
    onChange: printDropdownServiceCode,
    value: null,
    disabled: false,
  },
};
