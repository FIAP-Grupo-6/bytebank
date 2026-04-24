import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../components/ui/button";
import { Mail, ArrowRight, Check } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],

  args: {
    children: "Button",
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "outline", "ghost", "link"],
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },

    full: {
      control: "boolean",
    },

    asChild: {
      table: { disable: true },
    },

    iconLeft: { control: false },
    iconRight: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
};

export const WithLeftIcon: Story = {
  args: {
    iconLeft: Mail,
    children: "Send Email",
  },
};

export const WithRightIcon: Story = {
  args: {
    iconRight: ArrowRight,
    children: "Continue",
  },
};

export const WithBothIcons: Story = {
  args: {
    iconLeft: Check,
    iconRight: ArrowRight,
    children: "Confirm",
  },
};