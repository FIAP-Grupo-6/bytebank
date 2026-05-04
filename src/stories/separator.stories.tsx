import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Separator } from "../components/ui/separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],

  args: {
    orientation: "horizontal",
    decorative: true,
  },

  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Define a orientação do separator",
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },

    decorative: {
      control: "boolean",
      description:
        "Define se o separator é apenas decorativo (ignorado por leitores de tela)",
      table: {
        defaultValue: { summary: "true" },
      },
    },

    className: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: {},
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="flex h-20 items-center gap-4">
      <span>Item 1</span>
      <Separator {...args} />
      <span>Item 2</span>
    </div>
  ),
};