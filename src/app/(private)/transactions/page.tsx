'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Title from '@/components/ui/title';
import List from '@/components/ui/list';
import ListItem from '@/components/shared/list-item';
import SearchInput from '@/components/ui/search-input';
import FilterButtons from '@/components/shared/filter-buttons';
import MessageConfirm from '@/components/shared/message-confirm';
import Text from '@/components/ui/text';
import { useTransactionFilters, FilterType } from '@/hooks/useTransactionFilters';
import { useAsync } from '@/hooks/useAsync';
import { useDeleteTransaction } from '@/hooks/useDeleteTransaction';
import { transactionViewModel } from '@/domain/Transaction';
import { useState } from 'react';
import { TransactionFormModal } from '@/views/TransactionFormModal.tsx';
import { Transaction } from '@/types/transaction.ts';

export default function Transactions() {
  const {
    data: transactions,
    loading,
    error,
    execute: refetchTransactions,
  } = useAsync(transactionViewModel.getAll);
  const { search, setSearch, filter, setFilter, filteredTransactions } = useTransactionFilters({
    transactions: transactions || [],
  });
  const { deleteConfirm, deleting, handleDeleteClick, handleConfirmDelete, handleCancelDelete } =
    useDeleteTransaction(async () => {
      await refetchTransactions();
    });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | undefined>(undefined);

  const filters = [
    { label: 'Todos', value: 'todos' },
    { label: 'Depósitos', value: 'deposito' },
    { label: 'Pagamentos', value: 'pagamento' },
    { label: 'Transferências', value: 'transferencia' },
    { label: 'Saques', value: 'saque' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <TransactionFormModal
        transaction={transaction}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={(_) => {
          refetchTransactions();
        }}
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Title>Transações</Title>

          <Button
            className="gap-2"
            onClick={() => {
              setTransaction(undefined);
              setIsModalOpen(true);
            }}
          >
            <Plus size={16} />
            Adicionar transação
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4">
            <Text>Erro ao carregar transações: {error.message}</Text>
          </div>
        )}

        {loading && (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <Text>Carregando transações...</Text>
          </div>
        )}

        {!loading && !error && (
          <>
            <SearchInput value={search} onChange={setSearch} placeholder="Buscar transações..." />

            <FilterButtons
              filters={filters}
              selectedValue={filter}
              onChange={(value) => setFilter(value as FilterType)}
            />

            <List
              items={filteredTransactions}
              renderItem={(transaction) => (
                <ListItem
                  description={transaction.description}
                  date={transaction.date}
                  category={transaction.category}
                  value={transaction.value}
                  type={transaction.type}
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
          </>
        )}

        {deleteConfirm && (
          <MessageConfirm
            isOpen={!!deleteConfirm}
            title="Deletar transação?"
            description={`Tem certeza que deseja deletar a transação "${deleteConfirm.description}"?`}
            confirmText="Deletar"
            cancelText="Cancelar"
            isDestructive
            loading={deleting}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
}
