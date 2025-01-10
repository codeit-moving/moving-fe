import FilterModal from "@/components/modals/FilterModal";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FilterModal> = {
  title: "Components/FilterModal",
  component: FilterModal,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FilterModal>;

// 기본 이사 유형 필터
export const Default: Story = {
  args: {
    serviceCounts: {
      houseMove: 30,
      officeMove: 40,
      smallMove: 30,
    },
    serviceFilters: [true, false, false, false],
    designateCounts: {
      total: 100,
      designated: 30,
    },
    designateFilters: [true, false, false, false],
  },
};

// 이사 건수가 없는 경우
export const NoMoves: Story = {
  args: {
    serviceCounts: {
      houseMove: 0,
      officeMove: 0,
      smallMove: 0,
    },
    serviceFilters: [true, false, false, false],
    designateCounts: {
      total: 0,
      designated: 0,
    },
    designateFilters: [true, false, false, false],
  },
};
