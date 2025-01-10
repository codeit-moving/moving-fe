import type { Meta, StoryObj } from "@storybook/react";
import DropdownSortMover from "./DropdownSortMover";

const meta: Meta<typeof DropdownSortMover> = {
  title: "Components/dropdows/DropdownSortMover",
  component: DropdownSortMover,
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
} satisfies Meta<typeof DropdownSortMover>;

export default meta;
type Story = StoryObj<typeof DropdownSortMover>;

function printDropdownSortMoverCode(serviceCode: number): void {
  console.log("정렬 코드 :", serviceCode);
}

export const base: Story = {
  args: {
    onSelect: printDropdownSortMoverCode,
  },
};
