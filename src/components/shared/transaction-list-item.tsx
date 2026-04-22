import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./button";
import Text from "../ui/text";
import Title from "../ui/title";
import { Badge, BadgeProps } from "../ui/badge";
import { Amount } from "../ui/amount";
import { TransactionIcon } from "./transaction-icon";
import { Category, categoryMap } from "@/types/category";

interface TransactionListItemProps {
  description: string;
  date: string;
  category: Category;
  value: number;
  type: "deposito" | "pagamento" | "transferencia" | "saque";
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TransactionListItem({
  description,
  date,
  category,
  value,
  type,
  onEdit,
  onDelete,
}: TransactionListItemProps) {
  const formattedDate = new Date(date).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
  const configCategory = categoryMap[category] ?? categoryMap["other"];

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
        <Badge type={configCategory.badge}>{configCategory.label}</Badge>

        <Amount value={value} />

        <div className="flex items-center gap-1 ml-2">
          <Button
            variant="secondary"
            shape="default"
            size="sm"
            icon={Pencil}
            onClick={onEdit}
            iconClassName="size-4"
          />

          <Button
            variant="secondary"
            shape="default"
            size="sm"
            icon={Trash2}
            onClick={onDelete}
            iconClassName="size-4"
          />
        </div>
      </div>
    </div>
  );
}
