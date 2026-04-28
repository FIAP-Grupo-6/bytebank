import { getDashboardData } from '@/domain/Dashboard/useCases/get-dashboard-data';
import DashboardClient from './dashboard-client';

export default async function Dashboard() {
  const { balance, income, expense, recentTransactions } = await getDashboardData();

  return (
    <DashboardClient
      balance={balance}
      income={income}
      expense={expense}
      recentTransactions={recentTransactions}
    />
  );
}
