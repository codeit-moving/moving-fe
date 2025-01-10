import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "./DatePicker";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component:
          "날짜와 시간을 선택할 수 있는 DatePicker 컴포넌트입니다. ISO 8601 형식으로 값을 반환합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onChange: {
      action: "date changed",
      description:
        "날짜/시간이 선택되었을 때 호출되는 함수. ISO 8601 문자열을 반환합니다.",
    },
    initialDate: {
      control: "date",
      description: "초기 선택 날짜",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    onChange: (isoString) => {
      console.log("Selected DateTime:", isoString);
    },
  },
};

export const WithInitialDate: Story = {
  args: {
    initialDate: new Date("2024-03-20T15:30:00"),
    onChange: (isoString) => {
      console.log("Selected DateTime:", isoString);
    },
  },
};
