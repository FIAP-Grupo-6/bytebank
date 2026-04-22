import { Transaction, TransactionFormData } from './transaction.types';

export class TransactionService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

  async createTransaction(data: TransactionFormData): Promise<Transaction> {
    const response = await fetch(`${this.baseUrl}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create transaction');
    return response.json();
  }

  async updateTransaction(id: string, data: TransactionFormData): Promise<Transaction> {
    const response = await fetch(`${this.baseUrl}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update transaction');
    return response.json();
  }

  async getTransaction(id: string): Promise<Transaction> {
    const response = await fetch(`${this.baseUrl}/transactions/${id}`);
    if (!response.ok) throw new Error('Failed to fetch transaction');
    return response.json();
  }
}

export const transactionService = new TransactionService();
