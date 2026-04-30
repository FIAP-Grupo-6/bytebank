import { Category } from "./category";

export type TransactionType = 'deposito' | 'pagamento' | 'transferencia' | 'saque';

export interface Transaction {
  id: number;
  description: string;
  date: string;
  category: Category;
  value: number;
  type: TransactionType;
}
