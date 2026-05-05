import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import List from '@/components/shared/list';
import TransactionListItem from '@/components/shared/transaction-list-item';
import { Transaction } from '@/types/transaction';

interface ListProps<T extends { id: number | string }> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

const meta: Meta<ListProps<Transaction>> = {
  title: 'Shared/List',
  component: List as React.ComponentType<ListProps<Transaction>>,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ListProps<Transaction>>;

const mockTransactions: Transaction[] = [
  {
    id: 1,
    description: 'Depósito em dinheiro',
    date: '2024-05-04',
    value: 500,
    type: 'deposito',
    category: 'salary',
  },
  {
    id: 2,
    description: 'Compra no supermercado',
    date: '2024-05-03',
    value: 150.50,
    type: 'pagamento',
    category: 'food',
  },
  {
    id: 3,
    description: 'Transferência para João',
    date: '2024-05-02',
    value: 200,
    type: 'transferencia',
    category: 'transport',
  },
  {
    id: 4,
    description: 'Saque no caixa eletrônico',
    date: '2024-05-01',
    value: 100,
    type: 'saque',
    category: 'other',
  },
];

export const Default: Story = {
  args: {
    items: mockTransactions,
    renderItem: (transaction: Transaction) => (
      <TransactionListItem
        description={transaction.description}
        date={transaction.date}
        value={transaction.value}
        type={transaction.type}
        category={transaction.category}
        onEdit={() => alert(`Editar: ${transaction.description}`)}
        onDelete={() => alert(`Deletar: ${transaction.description}`)}
      />
    ),
  },
};

export const Empty: Story = {
  args: {
    items: [],
    renderItem: () => null,
    emptyMessage: 'Nenhuma transação encontrada',
  },
};

export const EmptyWithCustomMessage: Story = {
  args: {
    items: [],
    renderItem: () => null,
    emptyMessage: 'Você ainda não tem transações. Comece adicionando uma!',
  },
};

export const Single: Story = {
  args: {
    items: [mockTransactions[0]],
    renderItem: (transaction: Transaction) => (
      <TransactionListItem
        description={transaction.description}
        date={transaction.date}
        value={transaction.value}
        type={transaction.type}
        category={transaction.category}
      />
    ),
  },
};
