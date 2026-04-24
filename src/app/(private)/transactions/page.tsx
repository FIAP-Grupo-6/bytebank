import { transactionViewModel } from "@/domain/Transaction";
import TransactionsClient from "./transactions-client";

export default async function Transactions() {
  const transactions = await transactionViewModel.getAll();

  return <TransactionsClient initialTransactions={transactions} />;
}