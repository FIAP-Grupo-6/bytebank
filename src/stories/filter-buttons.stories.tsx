import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FilterButtons from '@/components/shared/filter-buttons';
import { useState } from 'react';

const meta: Meta<typeof FilterButtons> = {
  title: 'Shared/FilterButtons',
  component: FilterButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FilterButtons>;

const transactionFilters = [
  { label: 'Todos', value: 'todos' },
  { label: 'Depósitos', value: 'deposito' },
  { label: 'Pagamentos', value: 'pagamento' },
  { label: 'Transferências', value: 'transferencia' },
  { label: 'Saques', value: 'saque' },
];

function FilterButtonsDemo() {
  const [selected, setSelected] = useState('todos');

  return (
    <FilterButtons
      filters={transactionFilters}
      selectedValue={selected}
      onChange={setSelected}
    />
  );
}

export const Default: Story = {
  render: () => <FilterButtonsDemo />,
};

export const Simple: Story = {
  args: {
    filters: [
      { label: 'Ativo', value: 'active' },
      { label: 'Inativo', value: 'inactive' },
    ],
    selectedValue: 'active',
    onChange: () => {},
  },
};

export const ManyOptions: Story = {
  args: {
    filters: [
      { label: 'Janeiro', value: 'jan' },
      { label: 'Fevereiro', value: 'fev' },
      { label: 'Março', value: 'mar' },
      { label: 'Abril', value: 'abr' },
      { label: 'Maio', value: 'mai' },
      { label: 'Junho', value: 'jun' },
    ],
    selectedValue: 'jan',
    onChange: () => {},
  },
};
