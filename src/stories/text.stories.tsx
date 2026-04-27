import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Text from "../components/ui/text";

const meta: Meta<typeof Text> = {
  title: "UI/Text",
  component: Text,
  tags: ["autodocs"],

  args: {
    children: "Texto de exemplo",
  },

  argTypes: {
    children: { control: "text" },
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};