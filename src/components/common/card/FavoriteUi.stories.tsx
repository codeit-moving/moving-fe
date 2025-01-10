import type { Meta, StoryObj } from "@storybook/react";
import FavoriteUi from "./FavoriteUi";

const meta = {
  title: "Common/Card/FavoriteUi",
  component: FavoriteUi,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FavoriteUi>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    favoriteCount: 0,
    isFavorite: false,
  },
};

export const Favorite: Story = {
  args: {
    favoriteCount: 42,
    isFavorite: true,
  },
};

export const HighCount: Story = {
  args: {
    favoriteCount: 999,
    isFavorite: true,
  },
};
