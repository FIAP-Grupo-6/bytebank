import { Pencil, Trash2 } from 'lucide-react';
import { ButtonCircle } from '@/components/ui/button-circle';
import Text from '../ui/text';
import Title from '../ui/title';
import { Badge } from '../ui/badge';
import { Amount } from '../ui/amount';
import { TransactionIcon } from './transaction-icon';
import { Category, categoryMap } from '@/types/category';
import { formatDate } from '@/utils/formatters';
import { TransactionType } from '@/types/transaction';

interface TransactionListItemProps {
  description: string;
  date: string;
  value: number;
  type: TransactionType;
  category?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TransactionListItem({
  description,
  date,
  value,
  type,
  category,
  onEdit,
  onDelete,
}: TransactionListItemProps) {
  const formattedDate = formatDate(date);
  const configCategory =
    (category && categoryMap[category as Category]) || categoryMap['other'];

  return (
    <article
      className="
        flex flex-col lg:flex-row
        lg:items-center lg:justify-between
        gap-2 lg:gap-6
        py-3 px-4
        hover:bg-surface-hover transition-colors
      "
    >
      <div className="flex items-start gap-4">
        <TransactionIcon type={type} />

        <div className="space-y-1">
          <Title as="h2" size="h5">
            {description}
          </Title>

          <Text>
            <time dateTime={date}>{formattedDate}</time>
          </Text>
        </div>
      </div>

      <div className="flex flex-col ml-14 lg:flex-row lg:items-center gap-2 lg:gap-4 lg:ml-auto">
        {category && (
          <Badge type={configCategory?.badge} className="w-fit">
            {configCategory?.label}
          </Badge>
        )}

        <Amount value={value} />

        {(onEdit || onDelete) && (
          <div className="flex items-center justify-end gap-2 lg:ml-2">
            {onEdit && (
              <ButtonCircle
                variant="secondary"
                size="sm"
                icon={Pencil}
                onClick={onEdit}
                aria-label={`Editar transação ${description}`}
              />
            )}

            {onDelete && (
              <ButtonCircle
                variant="secondary"
                className="hover:bg-destructive hover:text-destructive-foreground"
                size="sm"
                icon={Trash2}
                onClick={onDelete}
                aria-label={`Excluir transação ${description}`}
              />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
