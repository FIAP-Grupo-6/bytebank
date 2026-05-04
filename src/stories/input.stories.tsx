import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "../components/ui/input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],

  args: {
    placeholder: "Digite algo...",
    disabled: false,
    type: "text",
  },

  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "file"],
      description: "Define o tipo do input",
      table: {
        defaultValue: { summary: "text" },
      },
    },

    placeholder: {
      control: "text",
      description: "Texto exibido quando o campo está vazio",
    },

    disabled: {
      control: "boolean",
      description: "Desabilita o input",
      table: {
        defaultValue: { summary: "false" },
      },
    },

    value: {
      control: "text",
      description: "Valor controlado do input",
    },

    onChange: {
      action: "changed",
      description: "Callback disparado ao alterar o valor",
    },

    className: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Input desabilitado",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Digite sua senha",
  },
};

export const WithValue: Story = {
  args: {
    value: "Valor preenchido",
  },
};