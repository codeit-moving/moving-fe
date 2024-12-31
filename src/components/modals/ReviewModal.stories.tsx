import type { Meta, StoryObj } from "@storybook/react";
import ReviewModal from "./ReviewModal";

interface ReviewMoverData {
  id: number;
  service: number;
  isDesignated: boolean;
  imageUrl: string | null;
  nickname: string;
  movingDate: string;
  cost: number;
}

const mockData: ReviewMoverData = {
  id: 1,
  service: 0,
  isDesignated: true,
  imageUrl: "https://picsum.photos/200",
  nickname: "이사왕",
  movingDate: "2024-03-15",
  cost: 350000,
};

const meta: Meta<typeof ReviewModal> = {
  title: "Components/Modals/ReviewModal",
  component: ReviewModal,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "rgba(0, 0, 0, 0.5)" }],
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-white rounded-[16px] w-full max-w-[500px]">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReviewModal>;

export const Default: Story = {
  args: {
    onClose: () => console.log("Modal closed"),
    onSubmit: () => console.log("Review submitted"),
    data: mockData,
  },
};

export const NoImage: Story = {
  args: {
    ...Default.args,
    data: {
      ...mockData,
      imageUrl: null,
    },
  },
};
