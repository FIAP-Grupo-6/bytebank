import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TransactionListItem from '@/components/shared/transaction-list-item';

const meta: Meta<typeof TransactionListItem> = {
  title: 'Shared/TransactionListItem',
  component: TransactionListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['deposito', 'pagamento', 'transferencia', 'saque'],
    },
    category: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TransactionListItem>;

export const Deposit: Story = {
  args: {
    description: 'Depósito em dinheiro',
    date: '2024-05-04',
    value: 500,
    type: 'deposito',
    category: 'salary',
  },
};

export const Payment: Story = {
  args: {
    description: 'Compra no supermercado',
    date: '2024-05-03',
    value: 150.50,
    type: 'pagamento',
    category: 'food',
  },
};

export const Transfer: Story = {
  args: {
    description: 'Transferência para João',
    date: '2024-05-02',
    value: 200,
    type: 'transferencia',
    category: 'transport',
  },
};

export const Withdraw: Story = {
  args: {
    description: 'Saque no caixa eletrônico',
    date: '2024-05-01',
    value: 100,
    type: 'saque',
    category: 'other',
  },
};

export const WithActions: Story = {
  args: {
    description: 'Compra online',
    date: '2024-04-30',
    value: 299.90,
    type: 'pagamento',
    category: 'leisure',
    onEdit: () => alert('Editar clicado'),
    onDelete: () => alert('Deletar clicado'),
  },
};

export const WithoutCategory: Story = {
  args: {
    description: 'Transação sem categoria',
    date: '2024-04-29',
    value: 50,
    type: 'deposito',
  },
};

export const WithoutActions: Story = {
  args: {
    description: 'Transação somente leitura',
    date: '2024-04-28',
    value: -75.25,
    type: 'pagamento',
    category: 'health',
  },
};
