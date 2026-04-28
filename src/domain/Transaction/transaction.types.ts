import { Category } from '@/types/category';
import { TransactionType } from '@/types/transaction';

export interface TransactionFormData {
  type: TransactionType;
  description: string;
  value: number;
  date: string;
  category: string | Category;
}
