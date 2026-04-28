import { useState } from 'react';
import { transactionViewModel } from '@/domain/Transaction';

interface DeleteConfirm {
  id: number;
  description: string;
}

export function useDeleteTransaction(onSuccess: () => Promise<void>) {
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirm | null>(null);

  const handleDeleteClick = (id: number, description: string) => {
    setDeleteConfirm({ id, description });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;

    await transactionViewModel.delete(deleteConfirm.id);
    setDeleteConfirm(null);
    await onSuccess();
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  return {
    deleteConfirm,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
  };
}
