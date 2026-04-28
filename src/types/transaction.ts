import { Category } from "./category";

export interface Transaction {
  id: number;
  description: string;
  date: string;
  category: string;
  value: number;
  type: "deposito" | "pagamento" | "transferencia" | "saque";
}
