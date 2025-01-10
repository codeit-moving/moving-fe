import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/checkboxs/Checkbox",
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

function printCheckboxState(state: boolean): void {
  console.log("체크 박스(둥근 사각형) 상태 변경", state);
}

export const NoProps: Story = {
  args: {},
};

export const StateClassNameProps: Story = {
  args: {
    state: true,
    onStateChange: printCheckboxState,
    className: "!w-4 !h-4",
  },
};

export const disableProps: Story = {
  args: {
    state: false,
    onStateChange: printCheckboxState,
    className: "!w-15 !h-15",
    disabled: true,
  },
};
