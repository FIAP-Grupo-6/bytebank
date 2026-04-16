import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full bg-background border border-border rounded-md
          pl-10 pr-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-ring
        "
      />
    </div>
  );
}
