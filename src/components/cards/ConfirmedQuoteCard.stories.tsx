import type { Meta, StoryObj } from "@storybook/react";
import ConfirmedQuoteCard from "./ConfirmedQuoteCard";

const meta = {
  title: "Cards/ConfirmedQuoteCard",
  component: ConfirmedQuoteCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmedQuoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = {
  id: 11,
  service: 0,
  isDesignated: true,
  name: "김고객",
  cost: 190000,
  movingDate: "2024-11-30T10:00:00.000Z",
  pickupAddress: "서울특별시 강남구 역삼동 123-456",
  dropOffAddress: "서울특별시 서초구 서초동 789-012",
  requestDate: "2024-11-26T08:00:00.000Z",
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};
