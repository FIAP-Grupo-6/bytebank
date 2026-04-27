import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Title from "../components/ui/title";

const meta: Meta<typeof Title> = {
  title: "UI/Title",
  component: Title,
  tags: ["autodocs"],

  args: {
    children: "Título de exemplo",
    as: "h1",
    size: "h1",
  },

  argTypes: {
    children: { control: "text" },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    size: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Title size="h1">Heading 1</Title>
      <Title size="h2">Heading 2</Title>
      <Title size="h3">Heading 3</Title>
      <Title size="h4">Heading 4</Title>
      <Title size="h5">Heading 5</Title>
      <Title size="h6">Heading 6</Title>
    </div>
  ),
};

export const Semantic: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Title as="h1" size="h3">h1 visual h3</Title>
      <Title as="h2" size="h4">h2 visual h4</Title>
      <Title as="h3" size="h2">h3 visual h2</Title>
    </div>
  ),
};