import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./button";
import Text from "../ui/text";
import Title from "../ui/title";
import { Badge } from "../ui/badge";
import { Amount } from "../ui/amount";
import { TransactionIcon } from "./transaction-icon";
import { Category, categoryMap } from "@/types/category";
import { formatDate } from "@/utils/formatters"

interface TransactionListItemProps {
  description: string;
  date: string;
  value: number;
  type: "deposito" | "pagamento" | "transferencia" | "saque";
  category?: Category;
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
  const configCategory = category ? categoryMap[category] : categoryMap["other"];

  return (
    <div
      className="
        flex items-center justify-between
        py-3 px-4
        hover:bg-surface-hover transition-colors cursor-pointer
      "
    >
      <div className="flex items-center gap-3">
        <TransactionIcon type={type} />

        <div className="space-y-1">
          <Title type="h5">{description}</Title>
          <Text>{formattedDate}</Text>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {category && (
          <Badge type={configCategory.badge}>
            {configCategory.label}
          </Badge> 
        )}

        <Amount value={value} />

        <div className="flex items-center gap-1 ml-2">
           {onEdit && (
            <Button
              variant="secondary"
              shape="default"
              size="sm"
              icon={Pencil}
              onClick={onEdit}
              iconClassName="size-4"
            />
          )}

          {onDelete && ( 
            <Button
              variant="secondary"
              shape="default"
              size="sm"
              icon={Trash2}
              onClick={onDelete}
              iconClassName="size-4"
            />
          )}
        </div>
      </div>
    </div>
  );
}
