import { ReactNode } from "react";
import Text from "../ui/text";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  emptyMessage?: string;
}

export default function List<T extends { id: number | string }>({
  items,
  renderItem,
  emptyMessage = "Nenhum item encontrado",
}: ListProps<T>) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="divide-y divide-border">
        {items.map((item) => (
          <div key={item.id}>{renderItem(item)}</div>
        ))}

        {items.length === 0 && (
          <Text className="py-6 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </Text>
        )}
      </div>
    </div>
  );
}
