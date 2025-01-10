import type { Meta, StoryObj } from "@storybook/react";
import QuoteDetails from "./QuoteDetails";

const meta = {
  title: "Common/Card/QuoteDetails",
  component: QuoteDetails,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof QuoteDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = {
  id: 100,
  requestDate: "2024-03-17T12:00:00.000Z",
  service: 0,
  isDesignated: true,
  name: "김일반",
  movingDate: "2024-11-30T12:00:00.000Z",
  pickupAddress: "서울특별시 강남구 역삼동 123-456",
  dropOffAddress: "서울특별시 서초구 서초동 789-012",
  isCompleted: false,
  isRejected: false,
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};
