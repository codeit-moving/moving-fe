import type { Meta, StoryObj } from "@storybook/react";
import DropdownSortMovingRequest from "./DropdownSortMovingRequest";

const meta: Meta<typeof DropdownSortMovingRequest> = {
  title: "Components/dropdows/DropdownSortMovingRequest",
  component: DropdownSortMovingRequest,
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
} satisfies Meta<typeof DropdownSortMovingRequest>;

export default meta;
type Story = StoryObj<typeof DropdownSortMovingRequest>;

function printDropdownSortMovingRequestCode(serviceCode: number): void {
  console.log("정렬 코드 :", serviceCode);
}

export const base: Story = {
  args: {
    onSelect: printDropdownSortMovingRequestCode,
  },
};
