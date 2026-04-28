import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface NewTransactionButtonProps {
  onClick: () => void;
}

export function NewTransactionButton({ onClick }: NewTransactionButtonProps) {
  return (
    <Button className="hidden md:inline-flex text-white" iconLeft={Plus} onClick={onClick}>
      Nova transação
    </Button>
  );
}
