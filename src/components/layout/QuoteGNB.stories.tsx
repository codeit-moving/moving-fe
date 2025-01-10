import type { Meta, StoryObj } from "@storybook/react";
import { QuoteGNB } from "./QuoteGNB";

const meta = {
  title: "Components/Navigation/QuoteGNB",
  component: QuoteGNB,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    initialTab: {
      control: "number",
      description: "초기 선택될 탭의 인덱스",
    },
    onTabChange: {
      description: "탭 변경 시 호출되는 콜백 함수",
    },
    tabs: {
      description: "탭 목록",
    },
  },
} satisfies Meta<typeof QuoteGNB>;

export default meta;
type Story = StoryObj<typeof meta>;

export const QuoteTabs: Story = {
  args: {
    initialTab: 0,
    tabs: [
      { id: 0, label: "대기중인 견적" },
      { id: 1, label: "받았던 견적" },
    ],
  },
};

export const ReviewTabs: Story = {
  args: {
    initialTab: 0,
    tabs: [
      { id: 0, label: "작성 가능한 리뷰" },
      { id: 1, label: "작성한 리뷰" },
    ],
  },
};

export const ThreeTabs: Story = {
  args: {
    initialTab: 0,
    tabs: [
      { id: 0, label: "전체" },
      { id: 1, label: "진행중" },
      { id: 2, label: "완료" },
    ],
  },
};

export const WithCallback: Story = {
  args: {
    initialTab: 0,
    tabs: [
      { id: 0, label: "첫 번째 탭" },
      { id: 1, label: "두 번째 탭" },
    ],
    onTabChange: (tabId) => {
      console.log(`Selected tab: ${tabId}`);
    },
  },
};

export const CustomInitialTab: Story = {
  args: {
    initialTab: 1,
    tabs: [
      { id: 0, label: "첫 번째 탭" },
      { id: 1, label: "두 번째 탭" },
    ],
  },
};
