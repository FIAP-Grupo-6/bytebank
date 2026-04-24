import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../components/ui/button";
import { Mail, ArrowRight, Check } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],

  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    full: false,
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "ghost", "link"],
      description: "Define o estilo visual do botão",
      table: {
        defaultValue: { summary: "primary" },
      },
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Define o tamanho do botão",
      table: {
        defaultValue: { summary: "md" },
      },
    },

    full: {
      control: "boolean",
      description: "Faz o botão ocupar 100% da largura",
      table: {
        defaultValue: { summary: "false" },
      },
    },

    iconLeft: { 
      control: "select",
      options: ["mail", "arrow", "check"],
      mapping: {
        mail: Mail,
        arrow: ArrowRight,
        check: Check,
      },
      description: "Ícone exibido à esquerda"
    },

    iconRight: { 
      control: "select",
      options: ["mail", "arrow", "check"],
      mapping: {
        mail: Mail,
        arrow: ArrowRight,
        check: Check,
      },
      description: "Ícone exibido à direita",
    },

    asChild: {
      table: { disable: true },
    },
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