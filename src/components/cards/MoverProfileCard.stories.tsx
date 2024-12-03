import type { Meta, StoryObj } from "@storybook/react";
import MoverProfileCard from "./MoverProfileCard";

const meta = {
  title: "Components/Cards/MoverProfileCard",
  component: MoverProfileCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MoverProfileCard>;

export default meta;
type Story = StoryObj<typeof MoverProfileCard>;

const mockData = {
  id: 1,
  email: "example@codeit.com",
  name: "김다나",
  phoneNumber: "01012341234",
  imageUrl: "",
  ratings: {
    "1": 0,
    "2": 0,
    "3": 1,
    "4": 0,
    "5": 1,
    average: 4,
  },
  nickname: "김코드",
  career: 2,
  introduction: "성실 정확 한 줄 평가",
  description: "서울, 경기에서 2년동안 서비스를 무사고로 제공하고 있습니다",
  services: [0, 1],
  regions: [82031, 8202],
  reviewCount: 2,
  confirmCount: 13,
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const WithCustomClassName: Story = {
  args: {
    data: mockData,
    className: "max-w-[800px]",
  },
};
