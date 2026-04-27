import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "../components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],

  args: {
    children: "Badge",
    type: "default",
  },

  argTypes: {
    type: {
      control: "select",
      options: [
        "default",
        "yellow",
        "blue",
        "green",
        "purple",
        "pink",
        "red",
        "teal",
      ],
    },
    children: {
      control: "text",
    },
    className: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge type="default">Default</Badge>
      <Badge type="yellow">Yellow</Badge>
      <Badge type="blue">Blue</Badge>
      <Badge type="green">Green</Badge>
      <Badge type="purple">Purple</Badge>
      <Badge type="pink">Pink</Badge>
      <Badge type="red">Red</Badge>
      <Badge type="teal">Teal</Badge>
    </div>
  ),
};