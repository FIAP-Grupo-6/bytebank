interface AmountProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(value);
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
      {formatCurrency(value)}
    </div>
  );
}