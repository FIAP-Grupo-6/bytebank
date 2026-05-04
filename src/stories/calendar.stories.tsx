import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar } from "../components/ui/calendar";

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],

  args: {
    mode: "single",
    showOutsideDays: true,
    captionLayout: "label",
    buttonVariant: "ghost",
  },

  argTypes: {
    showOutsideDays: {
      control: "boolean",
      description: "Exibe os dias do mês anterior e próximo no calendário",
      table: {
        defaultValue: { summary: "true" },
      },
    },

    captionLayout: {
      control: "select",
      options: ["label", "dropdown"],
      description:
        "Define o layout do cabeçalho do calendário (label simples ou com dropdown)",
      table: {
        defaultValue: { summary: "label" },
      },
    },

    buttonVariant: {
      control: "select",
      options: ["default", "ghost", "outline", "secondary"],
      description: "Define o estilo dos botões de navegação do calendário",
      table: {
        defaultValue: { summary: "ghost" },
      },
    },

    selected: {
      control: false,
      description: "Data selecionada no calendário",
    },

    onSelect: {
      action: "selected",
      description: "Callback disparado ao selecionar uma data",
    },

    className: { table: { disable: true } },
    classNames: { table: { disable: true } },
    components: { table: { disable: true } },
    formatters: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {},
};