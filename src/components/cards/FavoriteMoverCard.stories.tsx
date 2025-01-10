import type { Meta, StoryObj } from "@storybook/react";
import FavoriteMoverCard from "./FavoriteMoverCard";

const meta: Meta<typeof FavoriteMoverCard> = {
  title: "Cards/FavoriteMoverCard",
  component: FavoriteMoverCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof FavoriteMoverCard>;

const mockData = {
  id: 11,
  imageUrl: "",
  nickname: "김기사",
  career: 4,
  introduction: "열심히하는 기사입니다",
  services: [0, 1],
  regions: [82031, 8202],
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
  reviewCount: 7,
  confirmCount: 11,
  favoriteCount: 3,
  isFavorite: true,
  isDesignated: true,
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const WithClassName: Story = {
  args: {
    data: mockData,
    className: "max-w-[400px]",
  },
};
