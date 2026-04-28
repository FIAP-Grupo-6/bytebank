export type TransactionType = 'deposito' | 'pagamento' | 'transferencia' | 'saque';

export interface Transaction {
  id: number;
  description: string;
  date: string;
  category: string;
  value: number;
  type: TransactionType;
}
