import { Category } from '@/types/category.ts';

export type TransactionType = 'deposito' | 'pagamento' | 'transferencia' | 'saque';

export interface TransactionFormData {
  type: TransactionType;
  description: string;
  value: number;
  date: string;
  category: string | Category;
}
