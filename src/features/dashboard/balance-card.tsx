import { Card, CardContent } from '@/components/ui/card';

export function BalanceCard() {
  const balance = 1234567.1;
  const formatted = balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Card>
      <CardContent className="px-4 py-2 md:p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Saldo atual</p>
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{formatted}</p>
        <p className="text-xs text-muted-foreground mt-2">Atualizado agora</p>
      </CardContent>
    </Card>
  );
}
