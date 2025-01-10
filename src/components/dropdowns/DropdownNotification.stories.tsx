import type { Meta, StoryObj } from "@storybook/react";
import DropdownNotification from "./DropdownNotification";

const meta: Meta<typeof DropdownNotification> = {
  title: "Components/dropdows/DropdownNotification",
  component: DropdownNotification,
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
} satisfies Meta<typeof DropdownNotification>;

export default meta;
type Story = StoryObj<typeof DropdownNotification>;

function printDropdownNotificationClick(id: number): void {
  console.log("선택 알림 id :", id);
}

export const customer: Story = {
  args: {
    onSelect: printDropdownNotificationClick,
  },
};
