import { useState, useCallback } from 'react';
import { Transaction, TransactionFormData } from '../transaction.types';
import { transactionService } from '../transaction.service';

export function useTransactionFormViewModel(initialTransaction?: Transaction) {
  const [type, setType] = useState<TransactionFormData['type']>(
    initialTransaction?.type || 'expense'
  );
  const [description, setDescription] = useState(initialTransaction?.description || '');
  const [amount, setAmount] = useState(initialTransaction?.amount.toString() || '');
  const [date, setDate] = useState(initialTransaction?.date || '');
  const [category, setCategory] = useState<TransactionFormData['category']>(
    initialTransaction?.category || 'other'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (onSuccess?: () => void) => {
      setIsLoading(true);
      setError(null);
      try {
        const formData: TransactionFormData = {
          type,
          description,
          amount,
          date,
          category,
        };

        if (initialTransaction?.id) {
          await transactionService.updateTransaction(initialTransaction.id, formData);
        } else {
          await transactionService.createTransaction(formData);
        }

        onSuccess?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao salvar');
      } finally {
        setIsLoading(false);
      }
    },
    [type, description, amount, date, category, initialTransaction?.id]
  );

  const reset = useCallback(() => {
    setType(initialTransaction?.type || 'expense');
    setDescription(initialTransaction?.description || '');
    setAmount(initialTransaction?.amount.toString() || '');
    setDate(initialTransaction?.date || '');
    setCategory(initialTransaction?.category || 'other');
    setError(null);
  }, [initialTransaction]);

  return {
    type,
    setType,
    description,
    setDescription,
    amount,
    setAmount,
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
