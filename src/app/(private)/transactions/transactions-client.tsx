'use client';

import { useRouter } from 'next/navigation';
import Title from '@/components/ui/title';
import List from '@/components/shared/list';
import SearchInput from '@/components/ui/search-input';
import FilterButtons from '@/components/shared/filter-buttons';
import MessageConfirm from '@/components/shared/message-confirm';
import Text from '@/components/ui/text';
import { useMemo, useState } from 'react';
import { useDeleteTransaction } from '@/hooks/useDeleteTransaction';
import TransactionListItem from '@/components/shared/transaction-list-item';
import { NewTransactionButton } from '@/components/shared/new-transaction-button';
import { TransactionFormModal } from '@/views/TransactionFormModal.tsx';
import { Transaction } from '@/types/transaction.ts';

interface Props {
  initialTransactions: any[];
}

type FilterType = 'todos' | 'deposito' | 'pagamento' | 'transferencia' | 'saque';

export default function TransactionsClient({ initialTransactions }: Props) {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('todos');

  const { deleteConfirm, handleDeleteClick, handleConfirmDelete, handleCancelDelete } =
    useDeleteTransaction(async () => {
      router.refresh();
    });

  const filters = [
    { label: 'Todos', value: 'todos' },
    { label: 'Depósitos', value: 'deposito' },
    { label: 'Pagamentos', value: 'pagamento' },
    { label: 'Transferências', value: 'transferencia' },
    { label: 'Saques', value: 'saque' },
  ];

  const filteredTransactions = useMemo(() => {
    return initialTransactions
      .filter((t) => t.description.toLowerCase().includes(search.toLowerCase()))
      .filter((t) => (filter === 'todos' ? true : t.type === filter));
  }, [initialTransactions, search, filter]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | undefined>(undefined);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TransactionFormModal
        transaction={transaction}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={(_) => {
          setIsModalOpen(false);
          router.refresh();
        }}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Title size="h2">Transações</Title>
          <NewTransactionButton
            onClick={() => {
              setTransaction(undefined);
              setIsModalOpen(true);
            }}
          />
        </div>

        <SearchInput value={search} onChange={setSearch} placeholder="Buscar transações..." />

        <FilterButtons
          filters={filters}
          selectedValue={filter}
          onChange={(value) => setFilter(value as FilterType)}
        />

        <List
          items={filteredTransactions}
          renderItem={(transaction) => (
            <TransactionListItem
              description={transaction.description}
              date={transaction.date}
              value={transaction.value}
              type={transaction.type}
              category={transaction.category}
              onEdit={() => {
                setTransaction(transaction);
                setIsModalOpen(true);
              }}
              onDelete={() => handleDeleteClick(transaction.id, transaction.description)}
            />
          )}
        />

        <div className="text-center">
          <Text>{filteredTransactions.length} transações encontradas</Text>
        </div>

        {deleteConfirm && (
          <MessageConfirm
            isOpen={!!deleteConfirm}
            title="Deletar transação?"
            description={`Tem certeza que deseja deletar a transação "${deleteConfirm.description}"?`}
            confirmText="Deletar"
            cancelText="Cancelar"
            isDestructive
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
}
