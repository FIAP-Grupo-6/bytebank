import React from "react";
import { Button } from '@/components/shared/button';
import Title from "../ui/title";
import Text from "../ui/text";

interface MessageConfirmProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function MessageConfirm({
  isOpen,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isDestructive = false,
  onConfirm,
  onCancel,
}: MessageConfirmProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4">
        <Title type="h3">{title}</Title>
        <Text className="mb-6 mt-3">{description}</Text>

        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            label={cancelText}
            size="sm"
            onClick={onCancel}
          />

          <Button
            variant={isDestructive ? "destructive" : "primary"}
            label={confirmText}
            size="sm"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
}
