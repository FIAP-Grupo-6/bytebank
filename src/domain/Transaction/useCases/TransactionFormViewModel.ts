import { useState, useCallback, useEffect } from 'react';
import { TransactionFormData } from '../transaction.types';
import { transactionService } from '@/domain/Transaction';
import { Transaction } from '@/types/transaction.ts';

export function useTransactionFormViewModel(initialTransaction?: Transaction) {
  const [type, setType] = useState<TransactionFormData['type']>(
    initialTransaction?.type || 'deposito'
  );
  const [description, setDescription] = useState(initialTransaction?.description || '');
  const [value, setValue] = useState(initialTransaction?.value || 0);
  const [date, setDate] = useState(initialTransaction?.date || '');
  const [category, setCategory] = useState<TransactionFormData['category']>(
    initialTransaction?.category || 'other'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setType(initialTransaction?.type || 'deposito');
    setDescription(initialTransaction?.description || '');
    setValue(initialTransaction?.value || 0);
    setDate(initialTransaction?.date || '');
    setCategory(initialTransaction?.category || 'other');
    setError(null);
  }, [initialTransaction]);

  const handleSubmit = useCallback(
    async (onSuccess?: (savedTransaction: Transaction) => void) => {
      setIsLoading(true);
      setError(null);
      try {
        const formData: TransactionFormData = {
          type,
          description,
          value,
          date,
          category,
        };

        const savedTransaction = initialTransaction?.id
          ? await transactionService.update(initialTransaction.id, formData)
          : await transactionService.create(formData);

        onSuccess?.(savedTransaction);
        return savedTransaction;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao salvar');
      } finally {
        setIsLoading(false);
      }
    },
    [type, description, value, date, category, initialTransaction?.id]
  );

  const reset = useCallback(() => {
    setType(initialTransaction?.type || 'deposito');
    setDescription(initialTransaction?.description || '');
    setValue(initialTransaction?.value || 0);
    setDate(initialTransaction?.date || '');
    setCategory(initialTransaction?.category || 'other');
    setError(null);
  }, [initialTransaction]);

  return {
    type,
    setType,
    description,
    setDescription,
    value,
    setValue,
    date,
    setDate,
    category,
    setCategory,
    isLoading,
    error,
    handleSubmit,
    reset,
    isEdit: !!initialTransaction?.id,
  };
}
