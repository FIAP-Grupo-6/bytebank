import { Banknote, CreditCard, ArrowLeftRight, Download } from 'lucide-react';
import { TransactionType } from '../types';

interface TransactionIconProps {
  type: TransactionType;
  size?: number;
  className?: string;
}

const iconMap = {
  deposito: Banknote,
  pagamento: CreditCard,
  transferencia: ArrowLeftRight,
  saque: Download,
};

export function TransactionIcon({ type, size = 16, className = '' }: TransactionIconProps) {
  const Icon = iconMap[type];

  if (!Icon) return null;

  return (
    <div className="inline-flex items-center justify-center p-0 rounded-full bg-muted text-muted-foreground size-10 self-center">
      <Icon size={size} />
    </div>
  );
}
