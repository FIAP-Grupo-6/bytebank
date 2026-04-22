import { Transaction } from "@/types/transaction"
import { formatCurrency } from "@/utils/formatters"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export function TransactionListItem({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.value > 0

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-card border">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          {isIncome ? (
            <ArrowUpRight className="w-4 h-4 text-success" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-destructive" />
          )}
        </div>

        <div>
          <p className="text-sm font-medium">{transaction.description}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      <p className={isIncome ? 'text-success' : 'text-destructive'}>
        {formatCurrency(transaction.value).formatted}
      </p>
    </div>
  )
}