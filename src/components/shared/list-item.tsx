import React from "react";
import { Pencil, Trash2 } from "lucide-react";

interface ListItemProps {
  description: string;
  date: string;
  category: string;
  value: number;
  type: "deposito" | "pagamento" | "transferencia" | "saque";
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ListItem({
  description,
  date,
  category,
  value,
  onEdit,
  onDelete,
}: ListItemProps) {
  const formattedDate = new Date(date).toLocaleDateString("pt-BR");
  const formattedCurrency = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div
      className="
        flex items-center justify-between
        py-3 px-4
        hover:bg-surface-hover transition-colors cursor-pointer
      "
    >
      <div className="space-y-1">
        <p className="text-sm font-medium">{description}</p>
        <div className="text-xs text-muted-foreground">{formattedDate}</div>
      </div>

      <div className="flex items-center gap-3">
        <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
          {category}
        </span>

        <div
          className={`text-sm font-semibold ${
            value < 0 ? "text-destructive" : "text-success"
          }`}
        >
          {formattedCurrency}
        </div>

        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={onEdit}
            className="
              p-2 rounded-md
              text-muted-foreground
              hover:text-foreground hover:bg-surface-hover
              transition-colors
            "
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={onDelete}
            className="
              p-2 rounded-md
              text-muted-foreground
              hover:text-destructive hover:bg-destructive/10
              transition-colors
            "
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
