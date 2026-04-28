import { ReactNode } from 'react';
import Text from '../ui/text';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  emptyMessage?: string;
}

export default function List<T extends { id: number | string }>({
  items,
  renderItem,
  emptyMessage = 'Nenhum item encontrado',
}: ListProps<T>) {
  return (
    <section
      className="bg-card border border-border rounded-xl overflow-hidden"
      aria-label="Lista de transações"
    >
      {items.length > 0 ? (
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id}>{renderItem(item)}</li>
          ))}
        </ul>
      ) : (
        <div role="status" aria-live="polite">
          <Text className="py-6 text-center text-sm text-muted-foreground">{emptyMessage}</Text>
        </div>
      )}
    </section>
  );
}
