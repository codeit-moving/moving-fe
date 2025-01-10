import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./Pagination";

const meta = {
  title: "Components/Common/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page: number) => console.log(`페이지 ${page}로 이동`),
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page: number) => console.log(`페이지 ${page}로 이동`),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    onPageChange: (page: number) => console.log(`페이지 ${page}로 이동`),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page: number) => console.log(`페이지 ${page}로 이동`),
  },
};
