import type { Meta, StoryObj } from "@storybook/react";
import RejectedRequestCard from "./RejectedRequestCard";

const meta: Meta<typeof RejectedRequestCard> = {
  title: "Cards/RejectedRequestCard",
  component: RejectedRequestCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RejectedRequestCard>;

const mockData = {
  id: 4,
  service: 0,
  name: "김다나",
  movingDate: "2024-11-30T12:00:00.000Z",
  pickupAddress: "서울특별시 강남구 역삼동 123-456",
  dropOffAddress: "서울특별시 서초구 서초동 789-012",
  requestDate: "2024-09-30T12:00:00.000Z",
  isDesignated: true,
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};
