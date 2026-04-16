import React from "react";

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
    <div className="flex gap-2 flex-wrap">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`
            px-3 py-1.5 text-sm rounded-md transition-colors border
            ${
              selectedValue === f.value
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-muted text-muted-foreground border-border hover:bg-surface-hover"
            }
          `}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
