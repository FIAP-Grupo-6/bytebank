'use client';

import { useTransactionFormViewModel } from '@/domain/Transaction/useCases/TransactionFormViewModel';
import { Transaction } from '@/domain/Transaction/transaction.types';
import Modal from '@/components/shared/modal';
import { useState } from 'react';

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
}

const TRANSACTION_TYPES = [
  { value: 'income', label: 'Entrada', icon: '📥' },
  { value: 'expense', label: 'Saída', icon: '📤' },
  { value: 'transfer', label: 'Transferência', icon: '🔄' },
];

const CATEGORIES = ['salary', 'food', 'transport', 'entertainment', 'other'];

export function TransactionFormModal({ isOpen, onClose, transaction }: TransactionFormModalProps) {
  const vm = useTransactionFormViewModel(transaction);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validações
    if (!vm.description.trim()) {
      setSubmitError('Descrição é obrigatória');
      return;
    }
    if (!vm.amount || parseFloat(vm.amount) <= 0) {
      setSubmitError('Valor deve ser maior que 0');
      return;
    }
    if (!vm.date) {
      setSubmitError('Data é obrigatória');
      return;
    }

    await vm.handleSubmit(() => {
      vm.reset();
      onClose();
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={vm.isEdit ? 'Editar Transação' : 'Nova Transação'}
    >
      <form onSubmit={handleFormSubmit} className="space-y-5">
        {/* Type selector */}
        <div>
          <label className="text-micro text-muted-foreground mb-2 block">Tipo</label>
          <div className="grid grid-cols-3 gap-2">
            {TRANSACTION_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => vm.setType(t.value as any)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-lg text-xs font-medium transition-colors ${
                  vm.type === t.value
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'bg-muted text-muted-foreground border border-transparent hover:bg-surface-hover'
                }`}
              >
                <span className="text-lg">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-micro text-muted-foreground mb-2 block">Descrição</label>
          <input
            type="text"
            value={vm.description}
            onChange={(e) => vm.setDescription(e.target.value)}
            placeholder="Ex: Almoço com a equipe"
            className="w-full bg-transparent border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground min-h-[44px] focus:outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/20 transition-all"
          />
        </div>

        {/* Amount + Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-micro text-muted-foreground mb-2 block">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={vm.amount}
              onChange={(e) => vm.setAmount(e.target.value)}
              placeholder="0,00"
              className="w-full bg-transparent border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground min-h-[44px] focus:outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/20 transition-all"
            />
          </div>
          <div>
            <label className="text-micro text-muted-foreground mb-2 block">Data</label>
            <input
              type="date"
              value={vm.date}
              onChange={(e) => vm.setDate(e.target.value)}
              className="w-full bg-transparent border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground min-h-[44px] focus:outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/20 transition-all [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-micro text-muted-foreground mb-2 block">Categoria</label>
          <select
            value={vm.category}
            onChange={(e) => vm.setCategory(e.target.value as any)}
            className="w-full bg-transparent border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground min-h-[44px] focus:outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/20 transition-all"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-card">
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Error message */}
        {(submitError || vm.error) && (
          <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
            {submitError || vm.error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground border border-border hover:bg-muted transition-colors min-h-[44px]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={vm.isLoading}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors min-h-[44px]"
          >
            {vm.isLoading ? 'Salvando...' : vm.isEdit ? 'Salvar Alterações' : 'Salvar Transação'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
