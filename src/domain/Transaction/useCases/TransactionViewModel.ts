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
  async fetchAllTransactions(): Promise<Transaction[]> {
    return await transactionService.getTransactions();
  }

  /**
   * Fetch a transaction by ID
   */
  async fetchTransactionById(id: number): Promise<Transaction> {
    return await transactionService.getTransactionById(id);
  }

  /**
   * Create a new transaction
   */
  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    return await transactionService.createTransaction(transaction);
  }

  /**
   * Update a transaction
   */
  async updateTransaction(id: number, transaction: Partial<Transaction>): Promise<Transaction> {
    return await transactionService.updateTransaction(id, transaction);
  }

  /**
   * Delete a transaction
   */
  async deleteTransaction(id: number): Promise<void> {
    return await transactionService.deleteTransaction(id);
  }
}

export const transactionViewModel = new TransactionViewModel();
