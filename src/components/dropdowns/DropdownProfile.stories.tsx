import type { Meta, StoryObj } from "@storybook/react";
import DropdownProfile from "./DropdownProfile";

const meta: Meta<typeof DropdownProfile> = {
  title: "Components/dropdows/DropdownProfile",
  component: DropdownProfile,
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
} satisfies Meta<typeof DropdownProfile>;

export default meta;
type Story = StoryObj<typeof DropdownProfile>;

function printDropdownProfileClick(href: string): void {
  console.log("화면 이동 :", href);
}

export const customer: Story = {
  args: {
    onSelect: printDropdownProfileClick,
    isMover: false,
    name: "이진우",
  },
};

export const mover: Story = {
  args: {
    onSelect: printDropdownProfileClick,
    isMover: true,
    profileImageUrl:
      "https://cdn.pixabay.com/photo/2023/06/14/23/12/sunset-8064078_1280.jpg",
    name: "이진우",
  },
};
