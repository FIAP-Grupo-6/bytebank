import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

export function BalanceCard({ value }: { value: number }) {
  return (
    <Card>
      <CardContent className="px-4 py-2 md:p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Saldo atual</p>
        <p className="text-xl sm:text-2xl lg:text-5xl font-bold">
          {formatCurrency(value).formatted}
        </p>
        <p className="text-xs text-muted-foreground mt-2">Atualizado agora</p>
      </CardContent>
    </Card>
  );
}
