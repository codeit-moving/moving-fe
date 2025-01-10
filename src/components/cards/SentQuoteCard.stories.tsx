import type { Meta, StoryObj } from "@storybook/react";
import SentQuoteCard from "./SentQuoteCard";

const meta: Meta<typeof SentQuoteCard> = {
  title: "Components/Cards/SentQuoteCard",
  component: SentQuoteCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultData = {
  id: 100,
  requestDate: "2024-03-17T12:00:00.000Z",
  service: 0,
  isDesignated: true,
  name: "김일반",
  movingDate: "2024-11-30T12:00:00.000Z",
  pickupAddress: "서울특별시 강남구 역삼동 123-456",
  dropOffAddress: "서울특별시 서초구 서초동 789-012",
  isCompleted: false,
  isConfirmed: false,
  cost: 150000,
};

const logButtonClick = () => console.log("Button clicked");

export const Default: Story = {
  args: {
    data: defaultData,
    onButtonClick: logButtonClick,
  },
};

export const Completed: Story = {
  args: {
    data: {
      ...defaultData,
      isCompleted: true,
      isConfirmed: true,
      cost: 180000,
    },
    onButtonClick: logButtonClick,
  },
};

export const Confirmed: Story = {
  args: {
    data: {
      ...defaultData,
      isCompleted: false,
      isConfirmed: true,
      cost: 200000,
    },
    onButtonClick: logButtonClick,
  },
};

export const Designated: Story = {
  args: {
    data: {
      ...defaultData,
      isDesignated: true,
      cost: 220000,
    },
    onButtonClick: logButtonClick,
  },
};

export const NotDesignated: Story = {
  args: {
    data: {
      ...defaultData,
      isDesignated: false,
      cost: 140000,
    },
    onButtonClick: logButtonClick,
  },
};
