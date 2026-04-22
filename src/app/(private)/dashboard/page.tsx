import { Button } from '@/components/shared/button';
import { getDashboardData } from '@/domain/Dashboard/useCases/get-dashboard-data';
import { BalanceCard } from '@/features/dashboard/balance-card';
import { Extract } from '@/features/dashboard/extract';
import { SummaryCard } from '@/features/dashboard/summary-card';
import { Plus } from 'lucide-react';
import Title from "@/components/ui/title";
import Text from "@/components/ui/text";

export default async function Dashboard() {
  const { balance, income, expense, recentTransactions } = await getDashboardData()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <Text>Abril 2026</Text>
          <Title>Bem-vindo, Usuário</Title>
        </div>
        <Button className="hidden md:inline-flex" label="Nova transação" icon={Plus} />
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

      <Button
        className="fixed bottom-6 right-6 md:hidden shadow-lg"
        icon={Plus}
        shape="circle"
        size="md"
        aria-label="Nova transação"
      /> 
    </div>
  );
}
