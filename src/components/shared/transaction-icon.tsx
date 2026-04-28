import { Banknote, CreditCard, ArrowLeftRight, Download } from 'lucide-react';
import { TransactionType } from '@/types/transaction';

interface TransactionIconProps {
  type: TransactionType;
  size?: number;
}

const iconMap = {
  deposito: Banknote,
  pagamento: CreditCard,
  transferencia: ArrowLeftRight,
  saque: Download,
};

export function TransactionIcon({ type, size = 16 }: TransactionIconProps) {
  const Icon = iconMap[type];

  if (!Icon) return null;

  return (
    <div className="inline-flex items-center justify-center p-0 rounded-full bg-muted text-muted-foreground size-10 self-center">
      <Icon size={size} />
    </div>
  );
}
