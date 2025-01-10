import type { Meta, StoryObj } from "@storybook/react";
import CheckboxField from "./CheckboxField";

const meta: Meta<typeof CheckboxField> = {
  title: "Components/checkboxs/RequestCheckboxField",
  component: CheckboxField,
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
} satisfies Meta<typeof CheckboxField>;

export default meta;
type Story = StoryObj<typeof CheckboxField>;

function printCheckboxState(state: boolean): void {
  console.log("체크 박스 필드 상태 변경", state);
}

export const stateTrue: Story = {
  args: {
    text: "가정이사 (쓰리룸, 20평대 이상)",
    isSelected: false,
  },
};

export const stateFalse: Story = {
  args: {
    text: "소형이사 (원룸, 투룸, 20평대 미만)",
    isSelected: true,
  },
};
