import { Transaction } from '@/types/transaction';

export function calculateDashboardMetrics(transactions: Transaction[]) {
  let balance = 0;
  let income = 0;
  let expense = 0;

  for (const t of transactions) {
    balance += t.value;

    if (t.value > 0) {
      income += t.value;
    } else {
      expense += Math.abs(t.value);
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
