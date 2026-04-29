import { Card, CardContent } from '@/components/ui/card';
import Text from '@/components/ui/text';
import Title from '@/components/ui/title';
import { formatCurrency } from '@/utils/formatters';

export function BalanceCard({ value }: { value: number }) {
  return (
    <Card>
      <CardContent className="px-4 py-2 md:p-4">
        <Text className="text-sm mb-4">Saldo atual</Text>
        <Title as='h2'>{formatCurrency(value, { showSign: false }).formatted}</Title>
        <Text className="text-xs mt-2">Atualizado agora</Text>
      </CardContent>
    </Card>
  );
}
