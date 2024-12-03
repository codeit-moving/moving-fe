import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "범용적으로 사용할 수 있는 Button 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outlined", "gray"],
      description: "버튼의 스타일을 결정합니다",
      defaultValue: "primary",
    },
    width: {
      control: "text",
      description: "버튼의 너비 (px, rem, % 등)",
      defaultValue: "auto",
    },
    height: {
      control: "text",
      description: "버튼의 높이 (px, rem, % 등)",
      defaultValue: "auto",
    },
    radius: {
      control: "text",
      description: "버튼의 모서리 둥글기",
      defaultValue: "16px",
    },
    disabled: {
      control: "boolean",
      description: "버튼의 비활성화 상태를 설정합니다",
      defaultValue: false,
    },
    withIcon: {
      control: "boolean",
      description: "우측에 아이콘을 표시합니다",
      defaultValue: false,
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "버튼",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary 버튼",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined 버튼",
  },
};

export const Gray: Story = {
  args: {
    variant: "gray",
    children: "Gray 버튼",
  },
};

export const WithIcon: Story = {
  args: {
    children: "글쓰기",
    withIcon: true,
  },
};

export const DisabledPrimary: Story = {
  args: {
    variant: "primary",
    children: "비활성화 버튼",
    disabled: true,
  },
};

export const DisabledOutlined: Story = {
  args: {
    variant: "outlined",
    children: "비활성화 버튼",
    disabled: true,
  },
};

export const CustomSize: Story = {
  args: {
    children: "커스텀 사이즈",
    width: "200px",
    height: "60px",
    radius: "8px",
  },
};
