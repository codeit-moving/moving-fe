import type { Meta, StoryObj } from "@storybook/react";
import CheckboxChip from "./CheckboxChip";

const meta: Meta<typeof CheckboxChip> = {
  title: "Components/checkboxs/CheckboxChip",
  component: CheckboxChip,
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
} satisfies Meta<typeof CheckboxChip>;

export default meta;
type Story = StoryObj<typeof CheckboxChip>;

function printCheckboxChipState(state: boolean): void {
  console.log("체크 박스(칩) 상태 변경", state);
}

export const textProps: Story = {
  args: { text: "서울" },
};

export const StateClassNameProps: Story = {
  args: {
    text: "소형이사",
    state: true,
    onStateChange: printCheckboxChipState,
  },
};
