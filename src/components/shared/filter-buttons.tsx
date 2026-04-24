import React from "react";
import { Button } from "./button";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterButtonsProps {
  filters: FilterOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function FilterButtons({
  filters,
  selectedValue,
  onChange,
}: FilterButtonsProps) {
  return (
    <div
      className="flex gap-2 flex-wrap"
      role="group"
      aria-label="Filtrar transações"
    >
      {filters.map((f) => {
        const isSelected = selectedValue === f.value;

        return (
          <Button
            key={f.value}
            variant="secondary"
            label={f.label}
            size="sm"
            onClick={() => onChange(f.value)}
            aria-pressed={isSelected}
            className={`
              px-3 py-1.5 text-sm rounded-md transition-colors border
              ${
                isSelected
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-muted text-foreground border-border hover:bg-surface-hover"
              }
            `}
          />
        );
      })}
    </div>
  );
}