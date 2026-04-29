'use client';

import { useEffect, useRef, useId } from "react";
import { Button } from '@/components/ui/button';
import Title from "../ui/title";
import Text from "../ui/text";
import Modal from "./modal";

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
  const titleId = useId();
  const descriptionId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      cancelRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <Title id={titleId} size="h3">
          {title}
        </Title>

        <Text id={descriptionId} className="mb-6 mt-3">
          {description}
        </Text>

        <div className="flex gap-3 justify-end">
          <Button
            ref={cancelRef}
            variant="secondary"
            size="sm"
            onClick={onCancel}
          >
            {cancelText}
          </Button>

          <Button
            variant={isDestructive ? "destructive" : "primary"}
            size="sm"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}