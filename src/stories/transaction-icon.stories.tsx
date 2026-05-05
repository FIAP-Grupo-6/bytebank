import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TransactionIcon } from "../components/shared/transaction-icon";

const meta: Meta<typeof TransactionIcon> = {
  title: "Shared/TransactionIcon",
  component: TransactionIcon,
  tags: ["autodocs"],

  args: {
    type: "deposito",
    size: 16,
  },

  argTypes: {
    type: {
      control: "select",
      options: ["deposito", "pagamento", "transferencia", "saque"],
      description: "Tipo da transação que define o ícone exibido",
    },

    size: {
      control: "number",
      description: "Tamanho do ícone interno",
      table: {
        defaultValue: { summary: "16" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TransactionIcon>;

export const Deposito: Story = {
  args: {
    type: "deposito",
  },
};

export const Pagamento: Story = {
  args: {
    type: "pagamento",
  },
};

export const Transferencia: Story = {
  args: {
    type: "transferencia",
  },
};

export const Saque: Story = {
  args: {
    type: "saque",
  },
};

export const LargerIcon: Story = {
  args: {
    type: "deposito",
    size: 24,
  },
};