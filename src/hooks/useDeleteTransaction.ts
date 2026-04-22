import { useState } from "react";
import { transactionViewModel } from "@/domain/Transaction";

interface DeleteConfirm {
  id: number;
  description: string;
}

export function useDeleteTransaction(onSuccess: () => Promise<void>) {
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirm | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = (id: number, description: string) => {
    setDeleteConfirm({ id, description });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      setDeleting(true);
      await transactionViewModel.delete(deleteConfirm.id);
      setDeleteConfirm(null);
      await onSuccess();
    } catch (err) {
      console.error("Erro ao deletar transação:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  return {
    deleteConfirm,
    deleting,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
  };
}
