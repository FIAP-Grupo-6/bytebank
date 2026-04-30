'use client';

import { useTransactionFormViewModel } from '@/domain/Transaction/useCases/TransactionFormViewModel';
import Modal from '@/components/shared/modal';
import { useEffect, useState } from 'react';
import { Transaction, TransactionType } from '@/types/transaction';
import { Input } from '@/components/ui/input';
import { ArrowLeftRight, Banknote, CreditCard, Download, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Category, categoryMap } from '@/types/category.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import { format, parseISO } from 'date-fns';

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
  { value: 'deposito', label: 'Depósito', icon: Banknote },
  { value: 'pagamento', label: 'Pagamento', icon: CreditCard },
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

  useEffect(() => {
    if (isOpen && !transaction) {
      vm.reset();
      setSubmitError(null);
    }
  }, [isOpen, transaction]);

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
    if (!vm.category) {
      setSubmitError('Categoria é obrigatório');
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
              min={0}
              value={vm.value}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (value < 0) return;

                vm.setValue(e.target.value === '' ? 0 : value);
              }}
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
            <Popover>
              <PopoverTrigger asChild>
                <Input
                  id="date-input"
                  type="text"
                  value={vm.date ? format(parseISO(vm.date), 'dd/MM/yyyy') : ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                      if (value === '') {
                        vm.setDate('');
                      } else {
                        const [day, month, year] = value.split('/');
                        vm.setDate(`${year}-${month}-${day}`);
                      }
                    }
                  }}
                  placeholder="DD/MM/AAAA"
                  required
                  aria-required="true"
                  autoComplete="off"
                  aria-invalid={!vm.date && !!submitError}
                  aria-describedby={!vm.date && !!submitError ? 'date-error' : undefined}
                  className="cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={vm.date ? parseISO(vm.date) : undefined}
                  onSelect={(date) => vm.setDate(date ? date.toISOString().split('T')[0] : '')}
                />
              </PopoverContent>
            </Popover>
            {!vm.date && !!submitError && (
              <p id="date-error" role="alert" className="text-red-500 text-sm mt-1">
                Data é obrigatória
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="category-input" className="text-micro text-muted-foreground mb-2 block">
            Categoria <span aria-label="obrigatório">*</span>
          </label>
          <Select value={vm.category} onValueChange={(value: Category) => vm.setCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categoryMap).map(([value, item]) => (
                <SelectItem key={value} value={value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
