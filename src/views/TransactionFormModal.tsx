'use client';

import { useTransactionFormViewModel } from '@/domain/Transaction/useCases/TransactionFormViewModel';
import Modal from '@/components/shared/modal';
import { useState } from 'react';
import { Transaction, TransactionType } from '@/types/transaction';
import { Input } from '@/components/ui/input';
import { ArrowLeftRight, Banknote, CreditCard, Download, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
  onSaved?: (savedTransaction: Transaction) => void | Promise<void>;
}

const TRANSACTION_TYPES: Array<{
  value: TransactionType;
  label: string;
  icon: LucideIcon;
}> = [
  { value: 'deposito', label: 'Entrada', icon: Banknote },
  { value: 'pagamento', label: 'Saída', icon: CreditCard },
  { value: 'transferencia', label: 'Transferência', icon: ArrowLeftRight },
  { value: 'saque', label: 'Saque', icon: Download },
];

export function TransactionFormModal({
  isOpen,
  onClose,
  transaction,
  onSaved,
}: TransactionFormModalProps) {
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
    if (!vm.value) {
      setSubmitError('Valor é obrigatório');
      return;
    }
    if (!vm.date) {
      setSubmitError('Data é obrigatória');
      return;
    }

    await vm.handleSubmit((savedTransaction) => {
      vm.reset();
      onSaved?.(savedTransaction);
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
        <fieldset>
          <legend className="text-micro text-muted-foreground mb-2 block">
            Tipo <span aria-label="obrigatório">*</span>
          </legend>
          <div className="grid grid-cols-4 gap-2">
            {TRANSACTION_TYPES.map((t) => {
              const Icon = t.icon;
              return (
                <label key={t.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={t.value}
                    checked={vm.type === t.value}
                    onChange={(e) => vm.setType(e.target.value as TransactionType)}
                    className="sr-only"
                    aria-label={t.label}
                    required
                  />
                  <div
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg text-xs font-medium transition-colors ${
                      vm.type === t.value
                        ? 'bg-primary/15 text-primary border border-primary/30'
                        : 'bg-muted text-muted-foreground border border-transparent hover:bg-surface-hover'
                    }`}
                  >
                    <Icon size={20} aria-hidden="true" className="stroke-2" />
                    {t.label}
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="description-input"
            className="text-micro text-muted-foreground mb-2 block"
          >
            Descrição <span aria-label="obrigatório">*</span>
          </label>
          <Input
            id="description-input"
            type="text"
            value={vm.description}
            onChange={(e) => vm.setDescription(e.target.value)}
            placeholder="Ex: Almoço com a equipe"
            required
            aria-required="true"
            aria-invalid={!vm.description.trim() && !!submitError}
            aria-describedby={
              !vm.description.trim() && !!submitError ? 'description-error' : undefined
            }
          />
          {!vm.description.trim() && !!submitError && (
            <p id="description-error" role="alert" className="text-red-500 text-sm mt-1">
              Descrição é obrigatória
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="value-input" className="text-micro text-muted-foreground mb-2 block">
              Valor (R$) <span aria-label="obrigatório">*</span>
            </label>
            <Input
              id="value-input"
              type="number"
              step="0.01"
              value={vm.value}
              onChange={(e) => vm.setValue(e.target.value === '' ? 0 : Number(e.target.value))}
              placeholder="0,00"
              required
              aria-required="true"
              aria-invalid={!vm.value && !!submitError}
              aria-describedby={!vm.value || !!submitError ? 'value-error' : undefined}
            />
            {!vm.value && !!submitError && (
              <p id="value-error" role="alert" className="text-red-500 text-sm mt-1">
                Valor é obrigatório
              </p>
            )}
          </div>
          <div>
            <label htmlFor="date-input" className="text-micro text-muted-foreground mb-2 block">
              Data <span aria-label="obrigatório">*</span>
            </label>
            <Input
              id="date-input"
              type="date"
              value={vm.date}
              onChange={(e) => vm.setDate(e.target.value)}
              required
              aria-required="true"
              aria-invalid={!vm.date && !!submitError}
              aria-describedby={!vm.date && !!submitError ? 'date-error' : undefined}
            />
            {!vm.date && !!submitError && (
              <p id="date-error" role="alert" className="text-red-500 text-sm mt-1">
                Data é obrigatória
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="category-input" className="text-micro text-muted-foreground mb-2 block">
            Categoria
          </label>
          <Input
            id="category-input"
            type="text"
            value={vm.category}
            onChange={(e) => vm.setCategory(e.target.value)}
            placeholder="Ex: Salário, Alimentação, Transporte..."
          />
        </div>

        {/* Error message */}
        {(submitError || vm.error) && (
          <div
            role="alert"
            aria-live="assertive"
            className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm"
          >
            {submitError || vm.error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground border border-border hover:bg-muted transition-colors min-h-[44px]"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={vm.isLoading}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors min-h-[44px] text-white"
          >
            {vm.isLoading ? 'Salvando...' : vm.isEdit ? 'Salvar Alterações' : 'Salvar Transação'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
