import { transactionService } from '@/domain/Transaction/transaction.service';
import { Transaction } from '@/types/transaction';

/**
 * TransactionViewModel
 *
 * Manages the business logic for transaction-related operations
 * Follows the MVVM pattern to separate logic from presentation
 */
export class TransactionViewModel {
  /**
   * Fetch all transactions
   */
  async getAll(): Promise<Transaction[]> {
    const transactions = await transactionService.getAll();
    return transactions.sort((a, b) => b.date.localeCompare(a.date));
  }

  /**
   * Fetch a transaction by ID
   */
  async getById(id: number): Promise<Transaction> {
    return await transactionService.getById(id);
  }

  /**
   * Create a new transaction
   */
  async create(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    return await transactionService.create(transaction);
  }

  /**
   * Update a transaction
   */
  async update(id: number, transaction: Partial<Transaction>): Promise<Transaction> {
    return await transactionService.update(id, transaction);
  }

  /**
   * Delete a transaction
   */
  async delete(id: number): Promise<void> {
    return await transactionService.delete(id);
  }
}

export const transactionViewModel = new TransactionViewModel();
