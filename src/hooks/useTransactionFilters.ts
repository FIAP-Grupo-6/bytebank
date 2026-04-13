import { useState, useMemo } from "react";
import { Transaction } from "@/types/transaction";

export type FilterType = "todos" | "deposito" | "pagamento" | "transferencia" | "saque";

interface UseTransactionFiltersProps {
  transactions: Transaction[];
}

export function useTransactionFilters({ transactions }: UseTransactionFiltersProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("todos");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = `${t.description} ${t.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter = filter === "todos" ? true : t.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  return {
    search,
    setSearch,
    filter,
    setFilter,
    filteredTransactions,
  };
}
