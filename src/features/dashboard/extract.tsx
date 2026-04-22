import Link from 'next/link';
import { Transaction } from '@/types/transaction';
import { TransactionListItem } from './transaction-list-item';

export function Extract({ transactions }: { transactions: Transaction[] }) {
  const hasTransactions = transactions.length > 0

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Extrato</h2>
        {hasTransactions && (
          <Link href="/transactions" className="text-sm text-primary hover:underline">
            Ver completo
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {hasTransactions ? (
          transactions.map((transaction) => (
            <TransactionListItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <span className="text-center text-sm text-muted-foreground">Nenhum item encontrado</span>
        )}
      </div>
    </div>
  );
}
