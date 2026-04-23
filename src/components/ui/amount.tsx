import { formatCurrency } from "@/utils/formatters"

interface AmountProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export function Amount({ value, className = "", ...props }: AmountProps) {
  const variant =
    value > 0
      ? "text-success"
      : value < 0
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <div
      className={`text-sm font-semibold ${variant} ${className}`}
      {...props}
    >
      {formatCurrency(value).formatted}
    </div>
  );
}