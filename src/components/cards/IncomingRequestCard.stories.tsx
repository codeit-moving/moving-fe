import type { Meta, StoryObj } from "@storybook/react";
import IncomingRequestCard from "./IncomingRequestCard";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Cards/IncomingRequestCard",
  component: IncomingRequestCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IncomingRequestCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = {
  id: 100,
  requestDate: "2024-03-17T12:00:00.000Z",
  service: 0, // 가정이사
  isDesignated: true,
  name: "김일반",
  movingDate: "2024-11-30T12:00:00.000Z",
  pickupAddress: "서울특별시 강남구 역삼동 123-456",
  dropOffAddress: "서울특별시 서초구 서초동 789-012",
  isCompleted: false,
};

// 스토리북 액션 생성
const handlePrimaryClick = action("견적 보내기 클릭");
const handleOutlinedClick = action("반려 클릭");

export const Default: Story = {
  args: {
    data: mockData,
    onPrimaryClick: handlePrimaryClick,
    onOutlinedClick: handleOutlinedClick,
  },
};

export const WithDesignatedService: Story = {
  args: {
    data: {
      ...mockData,
      isDesignated: true,
    },
    onPrimaryClick: handlePrimaryClick,
    onOutlinedClick: handleOutlinedClick,
  },
};

export const WithOfficeMoving: Story = {
  args: {
    data: {
      ...mockData,
      service: 1, // 사무실 이사
      isDesignated: false,
    },
    onPrimaryClick: handlePrimaryClick,
    onOutlinedClick: handleOutlinedClick,
  },
};

export const WithLongAddress: Story = {
  args: {
    data: {
      ...mockData,
      pickupAddress: "서울특별시 강남구 역삼동 123-456 강남파이낸스센터 63층",
      dropOffAddress:
        "서울특별시 서초구 서초동 789-012 강남역 최고 오피스텔 1동 1004호",
    },
    onPrimaryClick: handlePrimaryClick,
    onOutlinedClick: handleOutlinedClick,
  },
};
