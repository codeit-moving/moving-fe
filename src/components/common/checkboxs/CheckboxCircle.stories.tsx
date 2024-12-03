import type { Meta, StoryObj } from "@storybook/react";
import CheckboxCircle from "./CheckboxCircle";

const meta: Meta<typeof CheckboxCircle> = {
  title: "Components/CheckboxCircle",
  component: CheckboxCircle,
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
} satisfies Meta<typeof CheckboxCircle>;

export default meta;
type Story = StoryObj<typeof CheckboxCircle>;

function printCheckboxState(state: boolean): void {
  console.log("체크 박스(원형) 상태 변경", state);
}

export const NoProps: Story = {
  args: {},
};

export const StateClassNameProps: Story = {
  args: {
    state: true,
    onStateChange: printCheckboxState,
    className: "!w-7 !h-7",
  },
};

export const disableProps: Story = {
  args: {
    state: false,
    onStateChange: printCheckboxState,
    className: "!w-20 !h-20 !pc:w-20 !pc:h-20",
    disabled: true,
  },
};
