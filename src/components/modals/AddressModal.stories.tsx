import AddressModal from "./AddressModal";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof AddressModal> = {
  title: "components/AddressModal",
  component: AddressModal,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AddressModal>;

export const StartAddress: Story = {
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <div>
          <button onClick={() => setIsOpen(true)} className={`text-white`}>
            출발지 선택하기
          </button>
          {isOpen && (
            <Story
              args={{
                text: "출발지를 선택해주세요",
                onClose: () => setIsOpen(false),
              }}
            />
          )}
        </div>
      );
    },
  ],
};

export const DestinationAddress: Story = {
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <div>
          <button onClick={() => setIsOpen(true)} className={`text-white`}>
            도착지 선택하기
          </button>
          {isOpen && (
            <Story
              args={{
                text: "도착지를 선택해주세요",
                onClose: () => setIsOpen(false),
              }}
            />
          )}
        </div>
      );
    },
  ],
};
