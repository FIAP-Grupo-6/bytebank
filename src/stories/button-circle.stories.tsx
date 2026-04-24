import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ButtonCircle } from "@/components/ui/button-circle"
import { Mail, Heart, Trash } from "lucide-react"

const meta: Meta<typeof ButtonCircle> = {
  title: "UI/ButtonCircle",
  component: ButtonCircle,
  tags: ["autodocs"],

  args: {
    variant: "primary",
    size: "md",
    "aria-label": "icon button",
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "ghost"],
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

    icon: {
      control: "select",
      options: ["mail", "heart", "trash"],
      mapping: {
        mail: Mail,
        heart: Heart,
        trash: Trash,
      },
      description: "Ícone exibido no botão"
    },

    "aria-label": {
      control: "text",
      description: "Texto acessível que descreve a ação do botão",
    },
  },
}

export default meta

type Story = StoryObj<typeof ButtonCircle>

export const Primary: Story = {
  args: {
    icon: Mail,
    "aria-label": "mail button",
  },
}

export const Secondary: Story = {
  args: {
    icon: Heart,
    variant: "secondary",
    "aria-label": "like button",
  },
}

export const Destuctive: Story = {
  args: {
    icon: Trash,
    variant: "destructive",
    "aria-label": "delete button",
  },
}

export const Ghost: Story = {
  args: {
    icon: Trash,
    variant: "ghost",
    "aria-label": "delete button",
  },
}