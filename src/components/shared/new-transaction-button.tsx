import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export function NewTransactionButton() {
  return (
    <Button className="hidden md:inline-flex text-white" iconLeft={Plus}>
      Nova transação
    </Button>
  );
}
