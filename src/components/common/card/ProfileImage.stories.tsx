import type { Meta, StoryObj } from "@storybook/react";
import ProfileImage from "./ProfileImage";

const meta = {
  title: "Common/ProfileImage",
  component: ProfileImage,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "프로필 이미지 컴포넌트 - 기본 46px, 반응형 54px, Large 80px",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileImage>;

export default meta;
type Story = StoryObj<typeof ProfileImage>;

const mockImageUrl = "https://picsum.photos/200";

export const Default: Story = {
  args: {
    imgUrl: mockImageUrl,
    size: "responsive",
    isLarge: false,
  },
};

export const Fixed: Story = {
  args: {
    imgUrl: mockImageUrl,
    size: "fixed",
    isLarge: false,
  },
};

export const Large: Story = {
  args: {
    imgUrl: mockImageUrl,
    size: "responsive",
    isLarge: true,
  },
};

export const WithoutImage: Story = {
  args: {
    imgUrl: null,
    size: "responsive",
    isLarge: false,
  },
};

export const CustomClassName: Story = {
  args: {
    imgUrl: mockImageUrl,
    className: "w-20 h-20",
  },
};
