import type { Meta, StoryObj } from "@storybook/react";
import MoverInfo from "./MoverInfo";

const meta = {
  title: "Components/Common/MoverInfo",
  component: MoverInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MoverInfo>;

export default meta;
type Story = StoryObj<typeof MoverInfo>;

const mockMoverData = {
  id: 1,
  nickname: "홍길동",
  career: 5,
  introduction: "안전하고 신속한 이사를 약속드립니다.",
  imageUrl: "https://picsum.photos/200",
  services: [1, 2],
  regions: [1, 2],
  ratings: {
    1: 0,
    2: 0,
    3: 2,
    4: 5,
    5: 10,
    average: 4.5,
  },
  reviewCount: 17,
  confirmCount: 50,
  favoriteCount: 25,
  isFavorite: false,
  isDesignated: true,
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
