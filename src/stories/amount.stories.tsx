import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Amount } from "../components/ui/amount";

const meta: Meta<typeof Amount> = {
  title: "UI/Amount",
  component: Amount,
  tags: ["autodocs"],

  args: {
    value: 100,
  },

  argTypes: {
    value: {
      control: "number",
    },
    className: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Amount>;

export const Default: Story = {};

export const Values: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Amount value={1000} />
      <Amount value={0} />
      <Amount value={-1000} />
    </div>
  ),
};