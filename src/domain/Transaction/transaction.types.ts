export type TransactionType = 'income' | 'expense' | 'transfer';
export type TransactionCategory = 'salary' | 'food' | 'transport' | 'entertainment' | 'other';

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
  category: TransactionCategory;
}

export interface TransactionFormData {
  type: TransactionType;
  description: string;
  amount: string;
  date: string;
  category: TransactionCategory;
}
