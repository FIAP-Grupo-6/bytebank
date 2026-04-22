import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function SummaryCard({
  hasTransactions,
  income,
  expense,
}: {
  hasTransactions: boolean;
  income: number;
  expense: number;
}) {
  const total = income + expense || 1;
  const incomePercentage = (income / total) * 100;
  const expensePercentage = (expense / total) * 100;

  return (
    <Card>
      <CardContent className="px-4 py-2 md:p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Resumo mensal</p>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <ArrowUpRight className="w-3 h-3 text-success shrink-0" />
              Receitas
            </div>
            <p className="text-base sm:text-lg lg:text-xl font-semibold truncate">
              {formatCurrency(income).formatted}
            </p>
          </div>
          <div className="min-w-0 sm:text-right">
            <div className="flex items-center sm:justify-end gap-1 text-xs text-muted-foreground mb-1">
              <ArrowDownRight className="w-3 h-3 text-destructive shrink-0" />
              Despesas
            </div>
            <p className="text-base sm:text-lg lg:text-xl font-semibold truncate">
              {formatCurrency(expense).formatted}
            </p>
          </div>
        </div>
        {hasTransactions && (
          <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
            <div className="bg-primary rounded-full" style={{ width: `${incomePercentage}%` }} />
            <div
              className="bg-destructive rounded-full"
              style={{ width: `${expensePercentage}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
