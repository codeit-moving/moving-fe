import type { Meta, StoryObj } from "@storybook/react";
import PendingRequestCard from "./PendingRequestCard";

const meta = {
  title: "Components/Cards/PendingRequestCard",
  component: PendingRequestCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PendingRequestCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = {
  id: 6,
  service: 0,
  isDesignated: true,
  imageUrl: "",
  nickname: "김코드",
  career: 1,
  ratings: {
    "1": 0,
    "2": 0,
    "3": 1,
    "4": 0,
    "5": 1,
    average: 4,
  },
  reviewCount: 7,
  confirmCount: 12,
  favoriteCount: 22,
  isFavorite: false,
  movingDate: "2024-11-30T10:00:00.000Z",
  pickupAddress: "서울특별시 강남구 역삼동 123-456",
  dropOffAddress: "서울특별시 서초구 서초동 789-012",
  cost: 200000,
  requestDate: "2024-11-26T08:00:00.000Z",
};

export const Default: Story = {
  args: {
    data: mockData,
    size: "responsive",
  },
};
