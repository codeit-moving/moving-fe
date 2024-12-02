import type { Meta, StoryObj } from "@storybook/react";
import ServiceChip from "./ServiceChip";

const meta = {
  title: "Components/Common/ServiceChip",
  component: ServiceChip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ServiceChip>;

export default meta;
type Story = StoryObj<typeof ServiceChip>;

export const Default: Story = {
  args: {
    variant: "smallMove",
    size: "responsive",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ServiceChip variant="smallMove" size="responsive" />
      <ServiceChip variant="homeMove" size="responsive" />
      <ServiceChip variant="officeMove" size="responsive" />
      <ServiceChip variant="designatedQuote" size="responsive" />
      <ServiceChip variant="pendingConfirm" size="responsive" />
    </div>
  ),
};

export const FixedSize: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ServiceChip variant="smallMove" size="fixed" />
      <ServiceChip variant="homeMove" size="fixed" />
      <ServiceChip variant="officeMove" size="fixed" />
      <ServiceChip variant="designatedQuote" size="fixed" />
      <ServiceChip variant="pendingConfirm" size="fixed" />
    </div>
  ),
};
