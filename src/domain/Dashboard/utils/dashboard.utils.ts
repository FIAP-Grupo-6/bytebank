import { Transaction } from '@/types/transaction';

export function calculateDashboardMetrics(transactions: Transaction[]) {
  let balance = 0;
  let income = 0;
  let expense = 0;

  for (const t of transactions) {
    if (t.type === 'deposito') {
      balance += t.value;
      income += t.value;
    } else {
      balance -= t.value;
      expense += t.value;
    }
  }

  return { balance, income, expense };
}

export function getRecentTransactions(transactions: Transaction[], limit = 10) {
  return transactions
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
