import { Transaction } from '@/types/transaction';

/**
 * TransactionService
 *
 * Handles all transaction-related API calls
 */
export class TransactionService {
  private baseUrl = process.env.NEXT_PUBLIC_TRANSACTION_API_URL || 'http://localhost:3001';

  /**
   * Fetch all transactions
   */
  async getAll(): Promise<Transaction[]> {
    const response = await fetch(`${this.baseUrl}/transactions`);
    if (!response.ok) {
      throw new Error('Falha ao buscar transações');
    }
    const data = await response.json();
    return data;
  }

  /**
   * Fetch a transaction by ID
   */
  async getById(id: number): Promise<Transaction> {
    const response = await fetch(`${this.baseUrl}/transactions/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar transação');
    }
    return response.json();
  }

  /**
   * Create a new transaction
   */
  async create(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const response = await fetch(`${this.baseUrl}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) {
      throw new Error('Falha ao criar transação');
    }
    return response.json();
  }

  /**
   * Update a transaction
   */
  async update(id: number, transaction: Partial<Transaction>): Promise<Transaction> {
    const response = await fetch(`${this.baseUrl}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) {
      throw new Error('Falha ao atualizar transação');
    }
    return response.json();
  }

  /**
   * Delete a transaction
   */
  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Falha ao deletar transação');
    }
  }
}

export const transactionService = new TransactionService();
