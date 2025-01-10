import type { Meta, StoryObj } from "@storybook/react";
import MoverInfoCard from "./MoverInfoCard";

const meta = {
  title: "Components/Cards/MoverInfoCard",
  component: MoverInfoCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MoverInfoCard>;

export default meta;
type Story = StoryObj<typeof MoverInfoCard>;

const mockMoverData = {
  id: 1,
  nickname: "김코드",
  career: 5,
  introduction: "안전하고 신속한 이사를 약속드립니다.",
  imageUrl: "https://picsum.photos/200",
  services: [1, 2],
  regions: [1, 2],
  rating: {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 8,
    "5": 170,
    totalCount: 178,
    totalSum: 882,
    average: 4.9,
  },
  reviewCount: 17,
  confirmCount: 50,
  favoriteCount: 25,
  isFavorite: Math.random() > 0.5,
  isDesignated: Math.random() > 0.5,
  isConfirmed: Math.random() > 0.5,
};

export const Default: Story = {
  args: {
    data: mockMoverData,
    size: "responsive",
  },
};

export const Fixed: Story = {
  args: {
    data: mockMoverData,
    size: "fixed",
  },
};
