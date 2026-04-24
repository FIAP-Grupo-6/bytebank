import { Button } from '@/components/ui/button';
import { ButtonCircle } from '@/components/ui/button-circle'
import { getDashboardData } from '@/domain/Dashboard/useCases/get-dashboard-data';
import { BalanceCard } from '@/features/dashboard/balance-card';
import { Extract } from '@/features/dashboard/extract';
import { SummaryCard } from '@/features/dashboard/summary-card';
import { Plus } from 'lucide-react';
import Title from '@/components/ui/title';

export default async function Dashboard() {
  const { balance, income, expense, recentTransactions } = await getDashboardData()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Title>Bem-vindo, Usuário</Title>
        <Button className="hidden md:inline-flex" iconLeft={Plus}>Nova transação</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceCard value={balance} />
        <SummaryCard
          hasTransactions={recentTransactions.length > 0}
          income={income}
          expense={expense}
        />
      </div>

      <Extract transactions={recentTransactions} />

      <ButtonCircle
        className="fixed bottom-6 right-6 md:hidden shadow-lg"
        icon={Plus}
        size="md"
        aria-label="Nova transação"
      /> 
    </div>
  );
}
