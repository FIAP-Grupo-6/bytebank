import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const transactions = [
  { id: '1', description: 'Salário', amount: 5000, date: '2026-04-01', category: 'salário' },
  { id: '2', description: 'Aluguel', amount: -1500, date: '2026-04-03', category: 'moradia' },
  { id: '3', description: 'Mercado', amount: -380, date: '2026-04-05', category: 'alimentação' },
  { id: '4', description: 'Freelance', amount: 1200, date: '2026-04-08', category: 'renda extra' },
  { id: '5', description: 'Netflix', amount: -55.9, date: '2026-04-10', category: 'assinatura' },
  { id: '6', description: 'Netflix', amount: -10.9, date: '2026-04-10', category: 'assinatura' },
];

export function Extract() {
  const format = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Extrato</h2>
        <Link href="/transactions" className="text-sm text-primary hover:underline">
          Ver completo
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {transactions.map((transaction) => {
          const isIncome = transaction.amount > 0;
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-xl bg-card border"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                  {isIncome ? (
                    <ArrowUpRight className="w-4 h-4 text-success" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <p
                className={`text-sm font-semibold ${isIncome ? 'text-success' : 'text-destructive'}`}
              >
                {format(transaction.amount)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
