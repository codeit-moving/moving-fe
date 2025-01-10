import type { Meta, StoryObj } from "@storybook/react";
import MyReviewCard from "./MyReviewCard";
import type { MyReviewCardData } from "@/components/cards/MyReviewCard";

const meta = {
  title: "Cards/MyReviewCard",
  component: MyReviewCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MyReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData: MyReviewCardData = {
  id: 21,
  service: 2,
  isDesignated: true,
  imageUrl: "",
  nickname: "김코드",
  movingDate: "2024-11-27T10:00:00.000Z",
  cost: 210000,
  rating: 4,
  content:
    "처음 견적 받아봤는데, 엄청 친절하시고 꼼꼼하세요! 귀찮게 이것저것 물어봤는데 잘 알려주셨습니다. 원룸 이사는 믿고 맡기세요! :) 곧 이사 앞두고 있는 지인분께 추천드릴 예정입니다!",
  createdAt: "2024-11-28T11:20:30.000Z",
  reviewImageUrl: [],
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};
