"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Title from "@/components/shared/title";
import ListItem from "@/components/shared/list-item";
import SearchInput from "@/components/shared/search-input";
import FilterButtons from "@/components/shared/filter-buttons";
import MessageConfirm from "@/components/shared/message-confirm";
import { useTransactionFilters, FilterType } from "@/hooks/useTransactionFilters";
import { useAsync } from "@/hooks/useAsync";
import { transactionViewModel } from "@/domain/Transaction";

export default function Transactions() {
  const { data: transactions, loading, error, execute: refetchTransactions } = useAsync(transactionViewModel.fetchAllTransactions);
  
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; description: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filters = [
    { label: "Todos", value: "todos" },
    { label: "Depósitos", value: "deposito" },
    { label: "Pagamentos", value: "pagamento" },
    { label: "Transferências", value: "transferencia" },
    { label: "Saques", value: "saque" },
  ];

  const { search, setSearch, filter, setFilter, filteredTransactions } = useTransactionFilters({ transactions: transactions || [] });

  const handleDeleteClick = (id: number, description: string) => {
    setDeleteConfirm({ id, description });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      setDeleting(true);
      await transactionViewModel.deleteTransaction(deleteConfirm.id);
      setDeleteConfirm(null);
      await refetchTransactions();
    } catch (err) {
      console.error("Erro ao deletar transação:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
          <Title>Transações</Title>

          <Button className="gap-2">
            <Plus size={16} />
            Adicionar transação
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4">
            <p className="text-sm">Erro ao carregar transações: {error.message}</p>
          </div>
        )}

        {loading && (
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-center text-muted-foreground">Carregando transações...</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Buscar transações..."
            />

            <FilterButtons
              filters={filters}
              selectedValue={filter}
              onChange={(value) => setFilter(value as FilterType)}
            />

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="divide-y divide-border">
                {filteredTransactions.map((t) => (
                  <ListItem
                    key={t.id}
                    description={t.description}
                    date={t.date}
                    category={t.category}
                    value={t.value}
                    type={t.type}
                    onEdit={() => console.log("Editar", t.id)}
                    onDelete={() => handleDeleteClick(t.id, t.description)}
                  />
                ))}

                {filteredTransactions.length === 0 && (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    Nenhuma transação encontrada
                  </div>
                )}
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {filteredTransactions.length} transações encontradas
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
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </div>
    </div>
  );
}