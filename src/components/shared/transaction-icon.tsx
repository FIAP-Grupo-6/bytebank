import {
  Banknote,
  CreditCard,
  ArrowLeftRight,
  Download,
} from "lucide-react";

type TransactionType =
  | "deposito"
  | "pagamento"
  | "transferencia"
  | "saque";

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

export function TransactionIcon({
  type,
  size = 16,
  className = "",
}: TransactionIconProps) {
  const Icon = iconMap[type];

  if (!Icon) return null;

  return (
    <div
      className={`p-2 rounded-lg bg-muted text-muted-foreground ${className}`}
    >
      <Icon size={size} />
    </div>
  );
}