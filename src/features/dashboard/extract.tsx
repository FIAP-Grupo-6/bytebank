import Link from 'next/link';
import { Transaction } from '@/types/transaction';
import List from "@/components/shared/list";
import TransactionListItem from "@/components/shared/transaction-list-item";

export function Extract({ transactions }: { transactions: Transaction[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Extrato</h2>
        <Link href="/transactions" className="text-sm text-primary hover:underline">
          Ver completo
        </Link>
      </div>

      <List
        items={transactions}
        renderItem={(transaction) => (
          <TransactionListItem
            description={transaction.description}
            date={transaction.date}
            value={transaction.value}
            type={transaction.type}
          />
        )}
      />
    </div>
  );
}
