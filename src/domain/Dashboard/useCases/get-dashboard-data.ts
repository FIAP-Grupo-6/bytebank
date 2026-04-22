
import { transactionService } from '@/domain/Transaction';
import {
  calculateDashboardMetrics,
  getRecentTransactions,
} from '../utils/dashboard.utils';
import { DashboardData } from '../types/dashboard.types';

export async function getDashboardData(): Promise<DashboardData> {
  const transactions = await transactionService.getAll();

  const metrics = calculateDashboardMetrics(transactions);
  const recentTransactions = getRecentTransactions(transactions);

  return {
    ...metrics,
    recentTransactions,
  };
}