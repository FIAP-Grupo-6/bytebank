'use client';

import { useTransactionFormViewModel } from '@/domain/Transaction/useCases/TransactionFormViewModel';
import Modal from '@/components/shared/modal';
import { useState } from 'react';
import { Transaction } from '@/types/transaction.ts';
import { Button } from '@/components/shared/button.tsx';
import { Input } from '@/components/ui/input.tsx';

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
  onSaved?: (savedTransaction: Transaction) => void | Promise<void>;
}

const TRANSACTION_TYPES = [
  { value: 'deposito', label: 'Entrada', icon: '📥' },
  { value: 'pagamento', label: 'Saída', icon: '📤' },
  { value: 'transferencia', label: 'Transferência', icon: '🔄' },
];

export function TransactionFormModal({ isOpen, onClose, transaction, onSaved }: TransactionFormModalProps) {
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
    if (!vm.value || vm.value <= 0) {
      setSubmitError('Valor deve ser maior que 0');
      return;
    }
    if (!vm.date) {
      setSubmitError('Data é obrigatória');
      return;
    }

    await vm.handleSubmit((savedTransaction) => {
      vm.reset();
      onSaved?.(savedTransaction)
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
          <Input
            type="text"
            value={vm.description}
            onChange={(e) => vm.setDescription(e.target.value)}
            placeholder="Ex: Almoço com a equipe"
          />
        </div>

        {/* Amount + Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-micro text-muted-foreground mb-2 block">Valor (R$)</label>
            <Input
              type="number"
              step="0.01"
              min="0.01"
              value={vm.value}
              onChange={(e) => vm.setValue(e.target.value === '' ? 0 : Number(e.target.value))}
              placeholder="0,00"
            />
          </div>
          <div>
            <label className="text-micro text-muted-foreground mb-2 block">Data</label>
            <Input type="date" value={vm.date} onChange={(e) => vm.setDate(e.target.value)} />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-micro text-muted-foreground mb-2 block">Categoria</label>
          <Input
            type="text"
            value={vm.category}
            onChange={(e) => vm.setCategory(e.target.value)}
            placeholder="Ex: Salário, Alimentação, Transporte..."
          />
        </div>

        {/* Error message */}
        {(submitError || vm.error) && (
          <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
            {submitError || vm.error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            shape="default"
            label="Cancelar"
            variant="secondary"
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground border border-border hover:bg-muted transition-colors min-h-[44px]"
          ></Button>
          <Button
            shape="default"
            label={
              vm.isLoading ? 'Salvando...' : vm.isEdit ? 'Salvar Alterações' : 'Salvar Transação'
            }
            type="submit"
            disabled={vm.isLoading}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors min-h-[44px]"
          ></Button>
        </div>
      </form>
    </Modal>
  );
}
