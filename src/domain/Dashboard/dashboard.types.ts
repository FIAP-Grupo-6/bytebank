import { Transaction } from '@/types/transaction';

export type DashboardData = {
  balance: number;
  income: number;
  expense: number;
  recentTransactions: Transaction[];
};