import type { Meta, StoryObj } from "@storybook/react";
import ShareButtons from "./ShareButtons";

const meta = {
  title: "Components/Common/ShareButtons",
  component: ShareButtons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ShareButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMoverInfo = {
  favoriteCount: 3,
  reviewCount: 5,
  description:
    "안녕하세요. 이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
  nickname: "김코드",
};

const mockQuoteInfo = {
  movingDate: "2024-11-30T12:00:00.000Z",
  pickupAddress: "서울특별시 강남구 역삼동 123-456",
  dropOffAddress: "서울특별시 서초구 서초동 789-012",
  cost: 100000,
};

export const MoverShare: Story = {
  args: {
    variant: "mover",
    moverInfo: mockMoverInfo,
  },
};

export const QuoteShare: Story = {
  args: {
    variant: "quote",
    quoteInfo: mockQuoteInfo,
  },
};
