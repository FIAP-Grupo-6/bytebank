'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Title from '@/components/ui/title';
import { NewTransactionButton } from '@/components/shared/new-transaction-button';
import { ButtonCircle } from '@/components/ui/button-circle';
import { BalanceCard } from '@/features/dashboard/balance-card';
import { Extract } from '@/features/dashboard/extract';
import { SummaryCard } from '@/features/dashboard/summary-card';
import { Transaction } from '@/types/transaction.ts';
import { TransactionFormModal } from '@/views/TransactionFormModal.tsx';
import { useRouter } from 'next/navigation';

interface Props {
  balance: number;
  income: number;
  expense: number;
  recentTransactions: Transaction[];
}

export default function DashboardClient({ balance, income, expense, recentTransactions }: Props) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | undefined>(undefined);

  return (
    <div className="flex flex-col gap-8">
      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={(_) => {
          setIsModalOpen(false);
          router.refresh();
        }}
      />

      <div className="flex items-center justify-between">
        <Title size="h2">Bem-vindo, Usuário</Title>

        <NewTransactionButton
          onClick={() => {
            setTransaction(undefined);
            setIsModalOpen(true);
          }}
        />
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
        onClick={() => {
          setTransaction(undefined);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
}
