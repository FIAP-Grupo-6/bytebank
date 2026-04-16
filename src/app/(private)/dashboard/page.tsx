import { Button } from '@/components/shared/button';
import { BalanceCard } from '@/features/dashboard/balance-card';
import { Extract } from '@/features/dashboard/extract';
import { SummaryCard } from '@/features/dashboard/summary-card';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground capitalize">Abril 2026</p>
          <h1 className="text-2xl font-bold">Bem-vindo, Usuário</h1>
        </div>
        <Button className="hidden md:inline-flex" label="Nova transação" icon={Plus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceCard />
        <SummaryCard />
      </div>
     

      <Extract />
      

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
